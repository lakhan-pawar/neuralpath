# NeuralPath

Your AI career co-pilot — from C# dev to AI Engineer

## Overview

NeuralPath is a comprehensive AI-powered career intelligence platform that helps developers transition into AI Engineering. Built with Next.js 16, TypeScript, and Gemini 2.5 Flash.

## Features

### 🎓 Learning & Development
- **AI Roadmap Generator** - Personalized learning paths with weekly plans
- **Skill Gap Analyzer** - Compare your skills against AI role requirements
- **Resource Library** - Curated learning resources from top platforms
- **Progress Tracker** - Track your learning journey

### 💼 Job Search & Career
- **Job Aggregator** - Real jobs from Indeed, LinkedIn, ZipRecruiter, Glassdoor, Adzuna, The Muse
- **AI Job Matching** - Gemini-powered job recommendations
- **Interview Prep** - Job-specific interview questions with answers
- **Interview Q&A Bank** - 100+ categorized interview questions

### 🚀 Projects & Practice
- **GitHub Projects** - Curated open-source projects for learning
- **Contribution Guides** - AI-generated guides for contributing
- **Project Explainers** - Understand complex codebases

### 📊 Insights & Trends
- **Tech Trends** - Latest from Reddit, Hacker News, ArXiv
- **AI Glossary** - 300+ AI/ML/LLM terms with explanations
- **System Design Hub** - 200+ real-world system designs from FAANG+

### 🎯 Key Features
- **Zero Login Required** - All features accessible without authentication
- **Mobile-First Design** - Responsive UI with dark mode
- **Real-Time Data** - Live job listings and tech trends
- **AI-Powered** - Gemini 2.5 Flash for all AI features

## Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **UI Components**: shadcn/ui, Lucide React icons
- **AI**: Google Gemini 2.5 Flash API
- **Job Data**: JobSpy (Python), Adzuna API, The Muse API
- **Package Manager**: pnpm

## Getting Started

### Prerequisites
- Node.js 18+ and pnpm
- Google Gemini API key (free at https://aistudio.google.com/)
- Optional: Adzuna API key (free 20k req/month)

### Installation

1. **Clone and install dependencies:**
```bash
pnpm install
```

2. **Set up environment variables:**
Create `.env.local` in the root directory:
```bash
# Required
GEMINI_API_KEY=your_gemini_api_key

# Optional - Job APIs
ADZUNA_APP_ID=your_adzuna_id
ADZUNA_APP_KEY=your_adzuna_key
JOBSPY_API_URL=  # Leave empty for mock data

# Optional - GitHub token for higher rate limits
GITHUB_TOKEN=your_github_token
```

3. **Run the development server:**
```bash
pnpm dev
```

4. **Open http://localhost:3000**

### Setting Up Real Job Data (Optional)

For real job listings from Indeed, LinkedIn, ZipRecruiter, and Glassdoor:

1. **Deploy JobSpy Python API** (see `python-jobspy/QUICKSTART.md`)
   - Easiest: Deploy to Render.com (5 minutes, free)
   - Or run locally: `cd python-jobspy && python main.py`

2. **Update `.env.local`:**
```bash
JOBSPY_API_URL=https://your-jobspy-api.onrender.com
```

3. **Restart dev server** - Real jobs will now appear!

See `JOBSPY_DEPLOYMENT_STATUS.md` for detailed instructions.

## Project Structure

```
neuralpath/
├── src/
│   ├── app/                    # Next.js 16 App Router pages
│   │   ├── learning/          # Roadmap & skill assessment
│   │   ├── jobs/              # Job aggregator & matching
│   │   ├── interview/         # Interview Q&A
│   │   ├── projects/          # GitHub projects
│   │   ├── trends/            # Tech trends & news
│   │   ├── glossary/          # AI terminology (300+ terms)
│   │   ├── sysdesign/         # System designs (200+ examples)
│   │   └── api/               # API routes
│   ├── components/            # React components
│   ├── lib/                   # Utilities & API clients
│   ├── hooks/                 # Custom React hooks
│   └── data/                  # Static data files
├── python-jobspy/             # JobSpy Python API
│   ├── main.py               # FastAPI server
│   ├── QUICKSTART.md         # 5-minute deployment guide
│   └── DEPLOYMENT_GUIDE.md   # Detailed deployment options
└── .env.local                # Environment variables
```

## Key Documentation

- **`JOBSPY_DEPLOYMENT_STATUS.md`** - JobSpy API deployment status & guide
- **`python-jobspy/QUICKSTART.md`** - Deploy JobSpy in 5 minutes
- **`python-jobspy/DEPLOYMENT_GUIDE.md`** - All deployment options
- **`FEATURES_SUMMARY.md`** - Complete feature list
- **`AGENTS.md`** - Next.js 16 agent rules

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
