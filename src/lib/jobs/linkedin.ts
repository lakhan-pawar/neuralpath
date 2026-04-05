import type { Job } from '@/types/job';

// LinkedIn doesn't have a public API for job search
// Using mock data - in production, you'd need LinkedIn's official API or partnerships
export async function searchLinkedIn(query: string): Promise<Job[]> {
  try {
    // Mock LinkedIn jobs for AI/ML roles
    const linkedInJobs: Job[] = [
      {
        id: 'linkedin_1',
        title: 'Staff Machine Learning Engineer',
        company: 'Amazon',
        location: 'Toronto, ON',
        remote: true,
        salary: { min: 150000, max: 220000, currency: 'CAD' },
        description: 'Lead ML initiatives for Alexa and AWS. Design and implement large-scale ML systems. Mentor junior engineers.',
        url: 'https://www.linkedin.com/jobs',
        source: 'linkedin',
        postedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['Machine Learning', 'Python', 'AWS', 'Leadership'],
      },
      {
        id: 'linkedin_2',
        title: 'Principal AI Engineer',
        company: 'Microsoft',
        location: 'Vancouver, BC',
        remote: true,
        salary: { min: 160000, max: 230000, currency: 'CAD' },
        description: 'Drive AI innovation for Azure AI services. Work on cutting-edge LLMs and multimodal models.',
        url: 'https://www.linkedin.com/jobs',
        source: 'linkedin',
        postedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['AI', 'LLM', 'Azure', 'Deep Learning'],
      },
      {
        id: 'linkedin_3',
        title: 'Senior Data Scientist - ML',
        company: 'Meta',
        location: 'Toronto, ON',
        remote: true,
        salary: { min: 140000, max: 200000, currency: 'CAD' },
        description: 'Build ML models for Instagram and Facebook. Work on recommendation systems and content ranking.',
        url: 'https://www.linkedin.com/jobs',
        source: 'linkedin',
        postedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['Machine Learning', 'Python', 'PyTorch', 'Recommendations'],
      },
      {
        id: 'linkedin_4',
        title: 'AI Research Scientist',
        company: 'Google DeepMind',
        location: 'Montreal, QC',
        remote: false,
        salary: { min: 150000, max: 210000, currency: 'CAD' },
        description: 'Conduct fundamental AI research. Publish papers at top conferences. Work on AGI and alignment.',
        url: 'https://www.linkedin.com/jobs',
        source: 'linkedin',
        postedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['Research', 'Deep Learning', 'AGI', 'PyTorch'],
      },
      {
        id: 'linkedin_5',
        title: 'Machine Learning Engineer',
        company: 'Apple',
        location: 'Toronto, ON',
        remote: true,
        salary: { min: 135000, max: 190000, currency: 'CAD' },
        description: 'Build ML features for iOS and macOS. Work on Siri, Photos, and on-device ML.',
        url: 'https://www.linkedin.com/jobs',
        source: 'linkedin',
        postedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['Machine Learning', 'iOS', 'Core ML', 'Python'],
      },
      {
        id: 'linkedin_6',
        title: 'Senior NLP Engineer',
        company: 'Salesforce',
        location: 'Toronto, ON',
        remote: true,
        salary: { min: 130000, max: 180000, currency: 'CAD' },
        description: 'Build NLP systems for Einstein AI. Work on chatbots, sentiment analysis, and text generation.',
        url: 'https://www.linkedin.com/jobs',
        source: 'linkedin',
        postedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['NLP', 'LLM', 'Transformers', 'Python'],
      },
      {
        id: 'linkedin_7',
        title: 'MLOps Lead',
        company: 'Uber',
        location: 'Toronto, ON',
        remote: true,
        salary: { min: 140000, max: 195000, currency: 'CAD' },
        description: 'Lead MLOps team. Build infrastructure for training and deploying ML models at scale.',
        url: 'https://www.linkedin.com/jobs',
        source: 'linkedin',
        postedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        tags: ['MLOps', 'Kubernetes', 'AWS', 'Leadership'],
      },
      {
        id: 'linkedin_8',
        title: 'Computer Vision Engineer',
        company: 'Tesla',
        location: 'Remote',
        remote: true,
        salary: { min: 145000, max: 205000, currency: 'CAD' },
        description: 'Develop computer vision for Autopilot. Work on object detection, tracking, and 3D reconstruction.',
        url: 'https://www.linkedin.com/jobs',
        source: 'linkedin',
        postedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['Computer Vision', 'Deep Learning', 'Autonomous Vehicles', 'PyTorch'],
      },
      {
        id: 'linkedin_9',
        title: 'AI Product Manager',
        company: 'Shopify',
        location: 'Ottawa, ON',
        remote: true,
        salary: { min: 125000, max: 175000, currency: 'CAD' },
        description: 'Lead AI product strategy for e-commerce. Work on recommendation systems and fraud detection.',
        url: 'https://www.linkedin.com/jobs',
        source: 'linkedin',
        postedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['Product Management', 'AI', 'E-commerce', 'Strategy'],
      },
      {
        id: 'linkedin_10',
        title: 'Senior ML Infrastructure Engineer',
        company: 'Spotify',
        location: 'Toronto, ON',
        remote: true,
        salary: { min: 135000, max: 185000, currency: 'CAD' },
        description: 'Build ML infrastructure for music recommendations. Scale systems to billions of users.',
        url: 'https://www.linkedin.com/jobs',
        source: 'linkedin',
        postedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['MLOps', 'Infrastructure', 'Python', 'Kubernetes'],
      },
      {
        id: 'linkedin_11',
        title: 'Deep Learning Researcher',
        company: 'NVIDIA',
        location: 'Toronto, ON',
        remote: false,
        salary: { min: 140000, max: 200000, currency: 'CAD' },
        description: 'Research deep learning algorithms for GPUs. Optimize neural networks for inference.',
        url: 'https://www.linkedin.com/jobs',
        source: 'linkedin',
        postedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        tags: ['Deep Learning', 'Research', 'CUDA', 'PyTorch'],
      },
      {
        id: 'linkedin_12',
        title: 'AI Solutions Engineer',
        company: 'OpenAI',
        location: 'Remote',
        remote: true,
        salary: { min: 150000, max: 220000, currency: 'CAD' },
        description: 'Help enterprise customers integrate GPT-4 and DALL-E. Build custom AI solutions.',
        url: 'https://www.linkedin.com/jobs',
        source: 'linkedin',
        postedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        tags: ['AI', 'LLM', 'Solutions Engineering', 'Python'],
      },
    ];
    
    // Filter by query - be lenient with matching
    const lowerQuery = query.toLowerCase();
    const queryTerms = lowerQuery.split(' ').filter(term => term.length > 2);
    
    return linkedInJobs.filter(job => {
      const searchText = `${job.title} ${job.description} ${job.tags.join(' ')}`.toLowerCase();
      // Match if any query term is found
      return queryTerms.length === 0 || queryTerms.some(term => searchText.includes(term));
    });
  } catch (error) {
    console.error('LinkedIn search error:', error);
    return [];
  }
}
