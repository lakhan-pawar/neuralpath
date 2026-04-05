from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from jobspy import scrape_jobs
import pandas as pd
from typing import Optional
import uvicorn

app = FastAPI(title="JobSpy API", version="1.0.0")

# Enable CORS for Next.js app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "message": "JobSpy API - Scrape jobs from Indeed, LinkedIn, ZipRecruiter, Glassdoor",
        "endpoints": {
            "/jobs": "GET - Search for jobs",
            "/health": "GET - Health check"
        }
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/jobs")
def search_jobs(
    query: str = Query("AI engineer", description="Job search query"),
    location: str = Query("Canada", description="Job location"),
    results_wanted: int = Query(20, description="Number of results per site", ge=1, le=50),
    site: Optional[str] = Query(None, description="Specific site: indeed, linkedin, zip_recruiter, glassdoor (comma-separated)")
):
    """
    Search for jobs using JobSpy
    
    Example: /jobs?query=AI+engineer&location=Toronto&results_wanted=20&site=indeed,linkedin
    """
    try:
        # Parse sites
        if site:
            sites = [s.strip() for s in site.split(',')]
        else:
            sites = ["indeed", "linkedin", "zip_recruiter"]
        
        print(f"Scraping jobs: query={query}, location={location}, sites={sites}")
        
        # Scrape jobs
        jobs_df = scrape_jobs(
            site_name=sites,
            search_term=query,
            location=location,
            results_wanted=results_wanted,
            hours_old=72,  # Jobs posted in last 72 hours
            country_indeed='canada'  # For Indeed Canada
        )
        
        if jobs_df is None or jobs_df.empty:
            print(f"No jobs found for query: {query}")
            return {
                "jobs": [],
                "count": 0,
                "query": query,
                "location": location,
                "sites": sites
            }
        
        print(f"Found {len(jobs_df)} jobs")
        
        # Convert DataFrame to list of dicts
        jobs_list = []
        for _, row in jobs_df.iterrows():
            job = {
                "id": f"{row.get('site', 'unknown')}_{hash(row.get('job_url', ''))}",
                "title": row.get('title', ''),
                "company": row.get('company', ''),
                "location": row.get('location', ''),
                "remote": 'remote' in str(row.get('location', '')).lower() or row.get('is_remote', False),
                "description": row.get('description', '')[:500] if pd.notna(row.get('description')) else '',
                "url": row.get('job_url', ''),
                "source": row.get('site', 'unknown'),
                "postedAt": row.get('date_posted', ''),
                "salary": {
                    "min": int(row.get('min_amount', 0)) if pd.notna(row.get('min_amount')) else None,
                    "max": int(row.get('max_amount', 0)) if pd.notna(row.get('max_amount')) else None,
                    "currency": row.get('currency', 'CAD')
                } if pd.notna(row.get('min_amount')) or pd.notna(row.get('max_amount')) else None,
                "tags": []
            }
            jobs_list.append(job)
        
        return {
            "jobs": jobs_list,
            "count": len(jobs_list),
            "query": query,
            "location": location,
            "sites": sites
        }
        
    except Exception as e:
        print(f"Error scraping jobs: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            "error": str(e),
            "jobs": [],
            "count": 0,
            "query": query,
            "location": location
        }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
