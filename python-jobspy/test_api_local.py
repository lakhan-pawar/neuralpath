#!/usr/bin/env python3
"""
Simple test script for JobSpy API
Run this to verify the API works before deploying
"""

import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    print("Testing /health endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        print(f"✓ Status: {response.status_code}")
        print(f"✓ Response: {response.json()}")
        return True
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def test_root():
    """Test root endpoint"""
    print("\nTesting / endpoint...")
    try:
        response = requests.get(BASE_URL, timeout=5)
        print(f"✓ Status: {response.status_code}")
        print(f"✓ Response: {json.dumps(response.json(), indent=2)}")
        return True
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

def test_jobs():
    """Test jobs endpoint"""
    print("\nTesting /jobs endpoint...")
    print("This may take 10-30 seconds (scraping real job sites)...")
    try:
        params = {
            "query": "AI engineer",
            "location": "Toronto",
            "results_wanted": 5,
            "site": "indeed"
        }
        response = requests.get(f"{BASE_URL}/jobs", params=params, timeout=60)
        print(f"✓ Status: {response.status_code}")
        data = response.json()
        print(f"✓ Found {data.get('count', 0)} jobs")
        
        if data.get('jobs'):
            print("\nFirst job:")
            job = data['jobs'][0]
            print(f"  Title: {job.get('title')}")
            print(f"  Company: {job.get('company')}")
            print(f"  Location: {job.get('location')}")
            print(f"  Source: {job.get('source')}")
            print(f"  URL: {job.get('url')}")
        
        return True
    except Exception as e:
        print(f"✗ Error: {e}")
        return False

if __name__ == "__main__":
    print("=" * 60)
    print("JobSpy API Test Suite")
    print("=" * 60)
    print("\nMake sure the API is running:")
    print("  cd python-jobspy")
    print("  python main.py")
    print("\nThen run this test in another terminal:")
    print("  python test_api_local.py")
    print("=" * 60)
    
    input("\nPress Enter to start tests...")
    
    results = []
    results.append(("Health Check", test_health()))
    results.append(("Root Endpoint", test_root()))
    results.append(("Jobs Endpoint", test_jobs()))
    
    print("\n" + "=" * 60)
    print("Test Results:")
    print("=" * 60)
    for name, passed in results:
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"{status}: {name}")
    
    all_passed = all(result[1] for result in results)
    if all_passed:
        print("\n✓ All tests passed! API is working correctly.")
        print("\nNext steps:")
        print("1. Deploy to Render.com (see DEPLOYMENT_GUIDE.md)")
        print("2. Update .env.local with your deployment URL")
        print("3. Restart your Next.js dev server")
    else:
        print("\n✗ Some tests failed. Check the errors above.")
