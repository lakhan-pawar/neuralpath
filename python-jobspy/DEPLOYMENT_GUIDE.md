# JobSpy API - Complete Deployment Guide

## Quick Start: Test Locally First

Before deploying, test the API locally:

```bash
cd python-jobspy
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python main.py
```

Visit: http://localhost:8000/jobs?query=AI+engineer&location=Toronto&results_wanted=10&site=indeed

Once working locally, update `.env.local`:
```
JOBSPY_API_URL=http://localhost:8000
```

---

## Option 1: Render.com (Easiest - No CLI Required)

### Step 1: Create Render Account
- Go to https://render.com
- Sign up with GitHub (recommended) or email

### Step 2: Deploy from Dashboard
1. Click "New +" → "Web Service"
2. Choose "Build and deploy from a Git repository"
3. Connect your GitHub account
4. Select your repository
5. Configure:
   - **Name**: `jobspy-api` (or any name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `python-jobspy`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`

6. Click "Create Web Service"

### Step 3: Wait for Deployment
- First deploy takes 5-10 minutes
- Watch the logs for any errors
- Once deployed, you'll get a URL like: `https://jobspy-api.onrender.com`

### Step 4: Update Next.js
Add to `.env.local`:
```
JOBSPY_API_URL=https://jobspy-api.onrender.com
```

### Important Notes:
- Free tier spins down after 15 min of inactivity
- First request after spin-down takes 30-60 seconds
- Consider paid tier ($7/month) for always-on service

---

## Option 2: Railway (CLI Method)

### Prerequisites
```bash
npm i -g @railway/cli
```

### Step 1: Login
```bash
railway login --browserless
```
- Visit the URL shown
- Enter the code
- Complete authentication in browser

### Step 2: Initialize Project
```bash
cd python-jobspy
railway init
```
- Choose "Create new project"
- Name it "jobspy-api"

### Step 3: Deploy
```bash
railway up
```

### Step 4: Get URL
```bash
railway domain
```
Or visit Railway dashboard to see your deployment URL.

### Step 5: Update Next.js
Add to `.env.local`:
```
JOBSPY_API_URL=https://your-app.railway.app
```

---

## Option 3: Vercel (If you're already using Vercel for Next.js)

Vercel doesn't support Python natively, but you can use Vercel Serverless Functions:

### Create `api/jobs.py` in your Next.js root:
```python
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from jobspy import scrape_jobs
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        query_components = parse_qs(urlparse(self.path).query)
        
        query = query_components.get('query', ['AI engineer'])[0]
        location = query_components.get('location', ['Canada'])[0]
        results_wanted = int(query_components.get('results_wanted', [20])[0])
        
        jobs_df = scrape_jobs(
            site_name=["indeed", "linkedin"],
            search_term=query,
            location=location,
            results_wanted=results_wanted,
            hours_old=72
        )
        
        jobs_list = []
        if jobs_df is not None and not jobs_df.empty:
            for _, row in jobs_df.iterrows():
                jobs_list.append({
                    "id": f"{row.get('site')}_{hash(row.get('job_url'))}",
                    "title": row.get('title', ''),
                    "company": row.get('company', ''),
                    "location": row.get('location', ''),
                    "url": row.get('job_url', ''),
                    "source": row.get('site', 'unknown')
                })
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"jobs": jobs_list}).encode())
```

Add to `requirements.txt` in root:
```
python-jobspy
```

---

## Option 4: Fly.io

### Install Fly CLI
```bash
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex
```

### Deploy
```bash
cd python-jobspy
fly auth login
fly launch
```

Follow prompts:
- App name: `jobspy-api`
- Region: Choose closest
- Don't add PostgreSQL or Redis

### Get URL
```bash
fly status
```

---

## Option 5: Docker + Any Cloud

### Create Dockerfile (already in python-jobspy):
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY main.py .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Build and Test Locally
```bash
cd python-jobspy
docker build -t jobspy-api .
docker run -p 8000:8000 jobspy-api
```

### Deploy to:
- **Google Cloud Run**: `gcloud run deploy`
- **AWS ECS**: Use AWS Console
- **Azure Container Apps**: Use Azure Portal
- **DigitalOcean App Platform**: Connect GitHub repo

---

## Troubleshooting

### "No jobs found"
- JobSpy scrapes real sites - they may block requests
- Try different search terms
- Reduce `results_wanted` to 10
- Use only one site at a time: `site=indeed`

### "Slow responses"
- First request takes 10-30 seconds (scraping is slow)
- Implement caching in Next.js
- Reduce number of sites queried

### "Module not found"
- Ensure `requirements.txt` is complete
- Check Python version (needs 3.9+)
- Verify build logs on deployment platform

### "Port binding error"
- Ensure using `$PORT` environment variable
- Render/Railway inject this automatically
- For local: use port 8000

---

## Recommended: Start with Render.com

Render is the easiest option:
1. No CLI installation needed
2. Free tier available
3. Automatic HTTPS
4. Simple GitHub integration
5. Good logs and monitoring

Once you confirm it works, you can migrate to Railway or other platforms if needed.
