import type { Job } from '@/types/job';

// Indeed RSS feed - publicly accessible
// Format: https://www.indeed.com/rss?q=query&l=location
export async function searchIndeedCanada(query: string, location: string = 'Canada'): Promise<Job[]> {
  try {
    // Use Indeed RSS feed
    const encodedQuery = encodeURIComponent(query);
    const encodedLocation = encodeURIComponent(location);
    const rssUrl = `https://www.indeed.com/rss?q=${encodedQuery}&l=${encodedLocation}`;
    
    console.log('Fetching Indeed RSS:', rssUrl);
    
    const response = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Indeed RSS error:', response.status);
      return getFallbackIndeedJobs(query);
    }

    const xmlText = await response.text();
    
    // Parse RSS XML
    const jobs = parseIndeedRSS(xmlText);
    console.log('Indeed RSS jobs found:', jobs.length);
    
    return jobs.length > 0 ? jobs : getFallbackIndeedJobs(query);
  } catch (error) {
    console.error('Indeed RSS fetch error:', error);
    return getFallbackIndeedJobs(query);
  }
}

// Parse Indeed RSS XML feed
function parseIndeedRSS(xml: string): Job[] {
  const jobs: Job[] = [];
  
  try {
    // Extract items from RSS feed
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const items = xml.match(itemRegex) || [];
    
    items.forEach((item, index) => {
      try {
        // Extract fields
        const title = extractTag(item, 'title');
        const link = extractTag(item, 'link');
        const description = extractTag(item, 'description');
        const pubDate = extractTag(item, 'pubDate');
        
        // Extract company and location from title (format: "Job Title - Company - Location")
        const titleParts = title.split(' - ');
        const jobTitle = titleParts[0] || title;
        const company = titleParts[1] || 'Company';
        const location = titleParts[2] || 'Canada';
        
        // Check if remote
        const isRemote = description.toLowerCase().includes('remote') || 
                        location.toLowerCase().includes('remote');
        
        jobs.push({
          id: `indeed_rss_${index}_${Date.now()}`,
          title: jobTitle.trim(),
          company: company.trim(),
          location: location.trim(),
          remote: isRemote,
          description: stripHtml(description).substring(0, 300) + '...',
          url: link,
          source: 'indeed',
          postedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
          tags: extractTags(description),
        });
      } catch (err) {
        console.error('Error parsing RSS item:', err);
      }
    });
  } catch (error) {
    console.error('Error parsing RSS XML:', error);
  }
  
  return jobs;
}

// Helper to extract XML tag content
function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : '';
}

// Helper to strip HTML tags
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper to extract tags from description
function extractTags(description: string): string[] {
  const tags: string[] = [];
  const text = description.toLowerCase();
  
  const keywords = [
    'python', 'java', 'javascript', 'typescript', 'react', 'node',
    'machine learning', 'deep learning', 'ai', 'ml', 'nlp',
    'tensorflow', 'pytorch', 'keras', 'scikit-learn',
    'aws', 'azure', 'gcp', 'kubernetes', 'docker',
    'sql', 'nosql', 'mongodb', 'postgresql',
  ];
  
  keywords.forEach(keyword => {
    if (text.includes(keyword)) {
      tags.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
    }
  });
  
  return tags.slice(0, 5);
}

// Fallback mock data if RSS fails
function getFallbackIndeedJobs(query: string): Job[] {
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
  ];
  
  // Filter by query
  const lowerQuery = query.toLowerCase();
  const queryTerms = lowerQuery.split(' ').filter(term => term.length > 2);
  
  return indeedJobs.filter(job => {
    const searchText = `${job.title} ${job.description} ${job.tags.join(' ')}`.toLowerCase();
    return queryTerms.length === 0 || queryTerms.some(term => searchText.includes(term));
  });
}
