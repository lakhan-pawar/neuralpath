#!/usr/bin/env python3
"""
Quick test script for JobSpy API
"""
import requests
import json

API_URL = "http://localhost:8000"

def test_health():
    print("Testing health endpoint...")
    response = requests.get(f"{API_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

def test_jobs():
    print("Testing jobs endpoint...")
    params = {
        "query": "AI engineer",
        "location": "Toronto",
        "results_wanted": 5,
        "site": "indeed"
    }
    response = requests.get(f"{API_URL}/jobs", params=params)
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Found {data.get('count', 0)} jobs")
    
    if data.get('jobs'):
        print("\nFirst job:")
        print(json.dumps(data['jobs'][0], indent=2))

if __name__ == "__main__":
    try:
        test_health()
        test_jobs()
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to API. Make sure it's running on http://localhost:8000")
    except Exception as e:
        print(f"Error: {e}")
