# JobSpy API - Quick Start Guide

## 🚀 Fastest Way to Get Real Job Data

### ⚠️ Railway Note

If you tried Railway and it deployed the Next.js website instead of the Python API, see `RAILWAY_FIX.md` for solutions. We recommend using Render.com instead (simpler for monorepo structures).

---

### Option 1: Deploy to Render.com (5 minutes, no CLI) ⭐ RECOMMENDED

1. **Go to https://render.com and sign up**

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository**

4. **Configure the service:**
   - Name: `jobspy-api`
   - Root Directory: `python-jobspy`
   - Runtime: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Instance Type: `Free`

5. **Click "Create Web Service"** and wait 5-10 minutes

6. **Copy your deployment URL** (e.g., `https://jobspy-api.onrender.com`)

7. **Update `.env.local` in your Next.js project:**
   ```
   JOBSPY_API_URL=https://jobspy-api.onrender.com
   ```

8. **Restart your Next.js dev server** and test the Jobs page!

---

### Option 2: Test Locally First (10 minutes)

1. **Install Python 3.9+ if not already installed**

2. **Open terminal in `python-jobspy` directory:**
   ```bash
   cd python-jobspy
   ```

3. **Create virtual environment:**
   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # Mac/Linux
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the server:**
   ```bash
   python main.py
   ```

6. **Test in browser:**
   - Open: http://localhost:8000
   - Try: http://localhost:8000/jobs?query=AI+engineer&location=Toronto&results_wanted=10&site=indeed

7. **Update `.env.local`:**
   ```
   JOBSPY_API_URL=http://localhost:8000
   ```

8. **Restart Next.js dev server** and test!

---

## 🎯 What You Get

- **Real job data** from Indeed, LinkedIn, ZipRecruiter, Glassdoor
- **No API keys needed** - JobSpy scrapes public data
- **Free to use** - both locally and on Render free tier
- **Fast integration** - already coded in your Next.js app

---

## ⚠️ Important Notes

### Render Free Tier
- Spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Perfect for testing and demos
- Upgrade to $7/month for always-on service

### Job Scraping
- First request takes 10-30 seconds (scraping is slow)
- Results are real-time data
- Some sites may block requests occasionally
- Reduce `results_wanted` if getting errors

---

## 🔧 Troubleshooting

### "No jobs found"
- Try different search terms
- Use only one site: `site=indeed`
- Check if API is running: visit `/health` endpoint

### "Connection refused"
- Make sure API is running: `python main.py`
- Check port 8000 is not in use
- Verify `JOBSPY_API_URL` in `.env.local`

### "Module not found"
- Activate virtual environment
- Run: `pip install -r requirements.txt`
- Check Python version: `python --version` (needs 3.9+)

---

## 📚 More Options

See `DEPLOYMENT_GUIDE.md` for:
- Railway deployment
- Fly.io deployment
- Docker deployment
- Vercel serverless functions
- And more!

---

## ✅ Verification

Once deployed, test your API:

```bash
# Health check
curl https://your-api-url.com/health

# Get jobs
curl "https://your-api-url.com/jobs?query=AI+engineer&location=Toronto&results_wanted=5&site=indeed"
```

Or visit in browser:
```
https://your-api-url.com/jobs?query=AI+engineer&location=Toronto&results_wanted=10&site=indeed
```

You should see JSON with real job listings!
