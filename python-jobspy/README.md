# JobSpy API Service

Python FastAPI service that scrapes real job listings from Indeed, LinkedIn, ZipRecruiter, and Glassdoor using the JobSpy library.

## Setup

### Local Development

1. **Install Python 3.9+**

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Run the server:**
```bash
python main.py
```

Server will start at `http://localhost:8000`

### API Endpoints

**GET /jobs**
- Query params:
  - `query` - Job search term (default: "AI engineer")
  - `location` - Location (default: "Canada")
  - `results_wanted` - Number of results per site (default: 20, max: 50)
  - `site` - Comma-separated sites: indeed, linkedin, zip_recruiter, glassdoor

**Example:**
```
http://localhost:8000/jobs?query=AI+engineer&location=Toronto&results_wanted=20&site=indeed,linkedin
```

**GET /health**
- Health check endpoint

**GET /**
- API documentation

### Test the API

```bash
curl "http://localhost:8000/jobs?query=AI+engineer&location=Toronto&results_wanted=10&site=indeed"
```

## Deployment Options

### Option 1: Railway (Recommended - Free Tier)

1. Create account at [railway.app](https://railway.app)
2. Install Railway CLI:
```bash
npm i -g @railway/cli
```
3. Deploy:
```bash
cd python-jobspy
railway login
railway init
railway up
```
4. Get your deployment URL from Railway dashboard

### Option 2: Render (Free Tier)

1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo
4. Settings:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Deploy

### Option 3: Fly.io (Free Tier)

1. Install flyctl: `curl -L https://fly.io/install.sh | sh`
2. Login: `flyctl auth login`
3. Create fly.toml:
```toml
app = "jobspy-api"

[build]
  builder = "paketobuildpacks/builder:base"

[env]
  PORT = "8000"

[[services]]
  http_checks = []
  internal_port = 8000
  processes = ["app"]
  protocol = "tcp"

  [[services.ports]]
    force_https = true
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443
```
4. Deploy: `flyctl launch`

### Option 4: Docker (Any Platform)

Create `Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t jobspy-api .
docker run -p 8000:8000 jobspy-api
```

## Integration with Next.js

Once deployed, update your Next.js app to call this API:

1. Add environment variable in `.env.local`:
```
JOBSPY_API_URL=https://your-deployment-url.com
```

2. The Next.js integration code is already prepared in your project.

## Notes

- JobSpy scrapes public job listings (no API keys needed)
- Rate limiting may apply from job sites
- Results are real-time scraped data
- First request may be slow (scraping takes time)
- Consider caching results in Next.js for better performance

## Troubleshooting

**Slow responses:**
- Reduce `results_wanted` parameter
- Use fewer sites
- Implement caching in Next.js

**No results:**
- Check if job sites are accessible from your deployment region
- Try different search terms
- Verify location format

**Errors:**
- Check logs: `railway logs` or platform-specific command
- Ensure all dependencies are installed
- Verify Python version (3.9+)
