import type { Job } from '@/types/job';

// Indeed doesn't have a public API, so we'll use mock data
// In production, you'd need to use Indeed's Publisher API or web scraping
export async function searchIndeedCanada(query: string): Promise<Job[]> {
  try {
    // Mock Indeed Canada jobs for AI/ML roles
    const indeedJobs: Job[] = [
      {
        id: 'indeed_1',
        title: 'Senior Machine Learning Engineer',
        company: 'BMO Financial Group',
        location: 'Toronto, ON',
        remote: true,
        salary: { min: 130000, max: 180000, currency: 'CAD' },
        description: 'Lead ML initiatives for fraud detection and risk modeling. Work with large-scale data pipelines and deploy models to production.',
        url: 'https://ca.indeed.com/jobs',
        source: 'indeed',
        postedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['Machine Learning', 'Python', 'TensorFlow', 'AWS'],
      },
      {
        id: 'indeed_2',
        title: 'AI Research Scientist',
        company: 'Vector Institute',
        location: 'Toronto, ON',
        remote: false,
        salary: { min: 120000, max: 170000, currency: 'CAD' },
        description: 'Conduct cutting-edge AI research in deep learning and reinforcement learning. Publish papers and collaborate with industry partners.',
        url: 'https://ca.indeed.com/jobs',
        source: 'indeed',
        postedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['Deep Learning', 'Research', 'PyTorch', 'NLP'],
      },
      {
        id: 'indeed_3',
        title: 'MLOps Engineer',
        company: 'Scotiabank',
        location: 'Toronto, ON',
        remote: true,
        salary: { min: 110000, max: 150000, currency: 'CAD' },
        description: 'Build and maintain ML infrastructure. Deploy models at scale using Kubernetes and cloud platforms.',
        url: 'https://ca.indeed.com/jobs',
        source: 'indeed',
        postedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['MLOps', 'Kubernetes', 'Docker', 'AWS'],
      },
      {
        id: 'indeed_4',
        title: 'Data Scientist - AI',
        company: 'Bell Canada',
        location: 'Montreal, QC',
        remote: true,
        salary: { min: 95000, max: 135000, currency: 'CAD' },
        description: 'Apply ML and AI to telecommunications data. Build predictive models for customer churn and network optimization.',
        url: 'https://ca.indeed.com/jobs',
        source: 'indeed',
        postedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        tags: ['Data Science', 'Machine Learning', 'Python', 'SQL'],
      },
      {
        id: 'indeed_5',
        title: 'Computer Vision Engineer',
        company: 'Magna International',
        location: 'Aurora, ON',
        remote: false,
        salary: { min: 115000, max: 160000, currency: 'CAD' },
        description: 'Develop computer vision systems for autonomous vehicles. Work with cameras, LiDAR, and sensor fusion.',
        url: 'https://ca.indeed.com/jobs',
        source: 'indeed',
        postedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['Computer Vision', 'Deep Learning', 'Autonomous Vehicles', 'C++'],
      },
      {
        id: 'indeed_6',
        title: 'NLP Engineer',
        company: 'Rogers Communications',
        location: 'Toronto, ON',
        remote: true,
        salary: { min: 105000, max: 145000, currency: 'CAD' },
        description: 'Build NLP systems for customer service chatbots and voice assistants. Work with transformers and LLMs.',
        url: 'https://ca.indeed.com/jobs',
        source: 'indeed',
        postedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['NLP', 'LLM', 'Transformers', 'Python'],
      },
      {
        id: 'indeed_7',
        title: 'AI Product Manager',
        company: 'Manulife',
        location: 'Toronto, ON',
        remote: true,
        salary: { min: 120000, max: 170000, currency: 'CAD' },
        description: 'Lead AI product development for insurance and financial services. Bridge technical and business teams.',
        url: 'https://ca.indeed.com/jobs',
        source: 'indeed',
        postedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['Product Management', 'AI', 'Insurance', 'Strategy'],
      },
      {
        id: 'indeed_8',
        title: 'Machine Learning Platform Engineer',
        company: 'Intact Insurance',
        location: 'Montreal, QC',
        remote: true,
        salary: { min: 115000, max: 155000, currency: 'CAD' },
        description: 'Build ML platform infrastructure. Enable data scientists to train and deploy models efficiently.',
        url: 'https://ca.indeed.com/jobs',
        source: 'indeed',
        postedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        tags: ['MLOps', 'Platform Engineering', 'Kubernetes', 'Python'],
      },
      {
        id: 'indeed_9',
        title: 'AI Solutions Architect',
        company: 'CGI',
        location: 'Ottawa, ON',
        remote: true,
        salary: { min: 125000, max: 175000, currency: 'CAD' },
        description: 'Design AI solutions for government and enterprise clients. Lead technical architecture and implementation.',
        url: 'https://ca.indeed.com/jobs',
        source: 'indeed',
        postedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['AI', 'Architecture', 'Cloud', 'Consulting'],
      },
      {
        id: 'indeed_10',
        title: 'Deep Learning Engineer',
        company: 'Bombardier',
        location: 'Montreal, QC',
        remote: false,
        salary: { min: 110000, max: 150000, currency: 'CAD' },
        description: 'Apply deep learning to aerospace engineering. Work on predictive maintenance and optimization.',
        url: 'https://ca.indeed.com/jobs',
        source: 'indeed',
        postedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['Deep Learning', 'Aerospace', 'PyTorch', 'Python'],
      },
    ];
    
    // Filter by query - be lenient with matching
    const lowerQuery = query.toLowerCase();
    const queryTerms = lowerQuery.split(' ').filter(term => term.length > 2);
    
    return indeedJobs.filter(job => {
      const searchText = `${job.title} ${job.description} ${job.tags.join(' ')}`.toLowerCase();
      // Match if any query term is found
      return queryTerms.length === 0 || queryTerms.some(term => searchText.includes(term));
    });
  } catch (error) {
    console.error('Indeed Canada search error:', error);
    return [];
  }
}
