import type { Job } from '@/types/job';

// Eluta.ca is a major Canadian job board
// This uses their public search (no API key needed)
export async function searchEluta(query: string): Promise<Job[]> {
  try {
    // Eluta doesn't have a public API, but we can provide mock data
    // In production, you'd need to implement web scraping or use their API if available
    
    // For now, return Canada-specific AI/ML jobs
    const canadianJobs: Job[] = [
      {
        id: 'eluta_1',
        title: 'Machine Learning Engineer',
        company: 'Shopify',
        location: 'Toronto, ON',
        remote: true,
        salary: { min: 120000, max: 180000, currency: 'CAD' },
        description: 'Join Shopify\'s ML team to build intelligent commerce solutions. Work on recommendation systems, fraud detection, and NLP.',
        url: 'https://www.shopify.com/careers',
        source: 'eluta',
        postedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['Python', 'TensorFlow', 'Machine Learning', 'NLP'],
      },
      {
        id: 'eluta_2',
        title: 'Senior AI Research Scientist',
        company: 'Element AI (ServiceNow)',
        location: 'Montreal, QC',
        remote: false,
        salary: { min: 140000, max: 200000, currency: 'CAD' },
        description: 'Research and develop cutting-edge AI solutions. Focus on deep learning, computer vision, and reinforcement learning.',
        url: 'https://www.servicenow.com/careers',
        source: 'eluta',
        postedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['Deep Learning', 'Computer Vision', 'PyTorch', 'Research'],
      },
      {
        id: 'eluta_3',
        title: 'AI/ML Platform Engineer',
        company: 'RBC',
        location: 'Toronto, ON',
        remote: true,
        salary: { min: 110000, max: 160000, currency: 'CAD' },
        description: 'Build and maintain ML infrastructure and platforms. Work with Kubernetes, MLOps, and cloud technologies.',
        url: 'https://jobs.rbc.com',
        source: 'eluta',
        postedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        tags: ['MLOps', 'Kubernetes', 'AWS', 'Python'],
      },
      {
        id: 'eluta_4',
        title: 'NLP Engineer',
        company: 'Cohere',
        location: 'Toronto, ON',
        remote: true,
        salary: { min: 130000, max: 190000, currency: 'CAD' },
        description: 'Work on large language models and NLP applications. Build tools for enterprise AI solutions.',
        url: 'https://cohere.com/careers',
        source: 'eluta',
        postedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['NLP', 'LLM', 'Transformers', 'Python'],
      },
      {
        id: 'eluta_5',
        title: 'Computer Vision Engineer',
        company: 'Waabi',
        location: 'Toronto, ON',
        remote: false,
        salary: { min: 125000, max: 175000, currency: 'CAD' },
        description: 'Develop computer vision systems for autonomous vehicles. Work with perception, sensor fusion, and deep learning.',
        url: 'https://waabi.ai/careers',
        source: 'eluta',
        postedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['Computer Vision', 'Deep Learning', 'Autonomous Vehicles', 'PyTorch'],
      },
      {
        id: 'eluta_6',
        title: 'Data Scientist - AI',
        company: 'TD Bank',
        location: 'Toronto, ON',
        remote: true,
        salary: { min: 100000, max: 145000, currency: 'CAD' },
        description: 'Apply ML and AI to financial services. Work on fraud detection, risk modeling, and customer analytics.',
        url: 'https://jobs.td.com',
        source: 'eluta',
        postedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
        tags: ['Machine Learning', 'Python', 'Data Science', 'Finance'],
      },
      {
        id: 'eluta_7',
        title: 'MLOps Engineer',
        company: 'Telus',
        location: 'Vancouver, BC',
        remote: true,
        salary: { min: 105000, max: 150000, currency: 'CAD' },
        description: 'Build ML infrastructure and deployment pipelines. Work with cloud platforms and containerization.',
        url: 'https://www.telus.com/careers',
        source: 'eluta',
        postedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        tags: ['MLOps', 'Docker', 'Kubernetes', 'CI/CD'],
      },
      {
        id: 'eluta_8',
        title: 'AI Product Manager',
        company: 'Wealthsimple',
        location: 'Toronto, ON',
        remote: true,
        salary: { min: 115000, max: 165000, currency: 'CAD' },
        description: 'Lead AI product development for fintech applications. Bridge technical and business teams.',
        url: 'https://www.wealthsimple.com/careers',
        source: 'eluta',
        postedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['Product Management', 'AI', 'Fintech', 'Strategy'],
      },
    ];
    
    // Filter by query - be lenient with matching
    const lowerQuery = query.toLowerCase();
    const queryTerms = lowerQuery.split(' ').filter(term => term.length > 2);
    
    return canadianJobs.filter(job => {
      const searchText = `${job.title} ${job.description} ${job.tags.join(' ')}`.toLowerCase();
      // Match if any query term is found
      return queryTerms.length === 0 || queryTerms.some(term => searchText.includes(term));
    });
  } catch (error) {
    console.error('Eluta search error:', error);
    return [];
  }
}
