# Railway Deployment Issue - Fix Guide

## Problem

Railway deployed the entire Next.js website instead of just the Python API because it detected the parent directory's `package.json`.

Current deployment: https://imaginative-art-production.up.railway.app (Next.js app)

## Solution Options

### Option 1: Use Render.com Instead (Recommended - 5 minutes)

Render.com is actually easier for this use case because it has better support for monorepo structures.

**Steps:**

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `jobspy-api`
   - **Root Directory**: `python-jobspy`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`
5. Click "Create Web Service"
6. Wait 5-10 minutes for deployment
7. Copy your URL (e.g., `https://jobspy-api.onrender.com`)
8. Update `.env.local`: `JOBSPY_API_URL=https://jobspy-api.onrender.com`

**Advantages:**
- Simpler configuration
- Better monorepo support
- Free tier available
- Automatic HTTPS
- Good logs

---

### Option 2: Fix Railway Deployment (10 minutes)

If you prefer to use Railway, here's how to fix it:

**Method A: Create New Service via Dashboard**

1. Go to https://railway.app/dashboard
2. Open your "imaginative-art" project
3. Click "New Service" → "Empty Service"
4. Name it "jobspy-api"
5. In service settings:
   - **Root Directory**: `python-jobspy`
   - **Build Command**: Leave empty (Nixpacks auto-detects)
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Connect to GitHub repo
7. Deploy
8. Generate domain
9. Copy URL and update `.env.local`

**Method B: Use Railway CLI with New Service**

```bash
cd python-jobspy

# Create new service
railway service create jobspy-api

# Link to new service
railway link

# Set root directory (via dashboard - CLI doesn't support this)
# Go to dashboard and set Root Directory to "python-jobspy"

# Deploy
railway up
```

**Note:** Railway CLI doesn't support setting root directory, so you'll need to do that in the dashboard.

---

### Option 3: Delete Current Service and Redeploy

1. Go to https://railway.app/dashboard
2. Open "imaginative-art" project
3. Delete the current service
4. Create new service with correct configuration (see Method A above)

---

## Recommended Path

**Use Render.com** - It's simpler, has better documentation, and works better with monorepo structures like yours.

Railway is great, but for this specific use case (Python API in a subdirectory of a Next.js project), Render.com is more straightforward.

---

## Current Status

- ✅ Railway account authenticated
- ✅ Railway project created: "imaginative-art"
- ⚠️ Current deployment: Next.js app (wrong)
- ❌ Python API not deployed yet

**Next step:** Follow Option 1 (Render.com) from `QUICKSTART.md`

---

## Files Created

- `railway.toml` - Railway configuration (for future use)
- `nixpacks.toml` - Nixpacks configuration (already existed)
- `Procfile` - Process file (already existed)

These files are ready if you want to use Railway in the future, but Render.com is recommended for now.
