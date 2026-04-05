import { NextRequest } from 'next/server';
import { aggregateJobs } from '@/lib/jobs/aggregator';
import type { JobFilter } from '@/types/job';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const filter: JobFilter = {
    query: searchParams.get('q') ?? 'AI engineer',
    location: searchParams.get('location') ?? 'all',
    remote: searchParams.get('remote') === 'true',
    seniority: (searchParams.get('seniority') as JobFilter['seniority']) ?? 'all',
    salaryMin: Number(searchParams.get('salaryMin') ?? 0),
    sources: [],
  };

  try {
    const jobs = await aggregateJobs(filter);
    return Response.json({ jobs, count: jobs.length });
  } catch (err) {
    console.error('Jobs API error:', err);
    const msg = err instanceof Error ? err.message : 'Failed to fetch jobs';
    return Response.json({ error: msg }, { status: 500 });
  }
}
