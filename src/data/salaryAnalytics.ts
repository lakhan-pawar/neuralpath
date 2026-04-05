import type { SalaryData, SkillDemand, JobMarketTrend, CompanyHiring } from '@/types/analytics';

export const SALARY_DATA: SalaryData[] = [
  // ML Engineer
  { role: 'ML Engineer', location: 'Toronto, ON', minSalary: 95000, maxSalary: 165000, avgSalary: 125000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 320 },
  { role: 'ML Engineer', location: 'Vancouver, BC', minSalary: 90000, maxSalary: 155000, avgSalary: 118000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 240 },
  { role: 'ML Engineer', location: 'Montreal, QC', minSalary: 85000, maxSalary: 145000, avgSalary: 110000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 180 },
  { role: 'ML Engineer', location: 'Ottawa, ON', minSalary: 88000, maxSalary: 150000, avgSalary: 115000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 120 },
  { role: 'ML Engineer', location: 'Calgary, AB', minSalary: 82000, maxSalary: 140000, avgSalary: 108000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 95 },
  { role: 'ML Engineer', location: 'Waterloo, ON', minSalary: 90000, maxSalary: 158000, avgSalary: 120000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 110 },
  { role: 'ML Engineer', location: 'Remote (Canada)', minSalary: 85000, maxSalary: 150000, avgSalary: 112000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 450 },
  
  // Senior ML Engineer
  { role: 'Senior ML Engineer', location: 'Toronto, ON', minSalary: 135000, maxSalary: 220000, avgSalary: 170000, currency: 'CAD', experienceLevel: 'Senior', companySize: 'Large', dataPoints: 180 },
  { role: 'Senior ML Engineer', location: 'Vancouver, BC', minSalary: 130000, maxSalary: 210000, avgSalary: 165000, currency: 'CAD', experienceLevel: 'Senior', companySize: 'Large', dataPoints: 140 },
  { role: 'Senior ML Engineer', location: 'Montreal, QC', minSalary: 125000, maxSalary: 200000, avgSalary: 158000, currency: 'CAD', experienceLevel: 'Senior', companySize: 'Large', dataPoints: 95 },
  { role: 'Senior ML Engineer', location: 'Remote (Canada)', minSalary: 128000, maxSalary: 205000, avgSalary: 160000, currency: 'CAD', experienceLevel: 'Senior', companySize: 'Large', dataPoints: 280 },
  
  // AI Engineer
  { role: 'AI Engineer', location: 'Toronto, ON', minSalary: 100000, maxSalary: 175000, avgSalary: 132000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 250 },
  { role: 'AI Engineer', location: 'Vancouver, BC', minSalary: 95000, maxSalary: 165000, avgSalary: 125000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 190 },
  { role: 'AI Engineer', location: 'Montreal, QC', minSalary: 90000, maxSalary: 155000, avgSalary: 118000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 145 },
  { role: 'AI Engineer', location: 'Remote (Canada)', minSalary: 92000, maxSalary: 160000, avgSalary: 120000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 380 },
  
  // Data Scientist
  { role: 'Data Scientist', location: 'Toronto, ON', minSalary: 85000, maxSalary: 145000, avgSalary: 110000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 420 },
  { role: 'Data Scientist', location: 'Vancouver, BC', minSalary: 82000, maxSalary: 140000, avgSalary: 105000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 310 },
  { role: 'Data Scientist', location: 'Montreal, QC', minSalary: 78000, maxSalary: 132000, avgSalary: 98000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 240 },
  { role: 'Data Scientist', location: 'Calgary, AB', minSalary: 80000, maxSalary: 135000, avgSalary: 102000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 150 },
  { role: 'Data Scientist', location: 'Remote (Canada)', minSalary: 80000, maxSalary: 138000, avgSalary: 103000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 620 },
  
  // Research Scientist
  { role: 'Research Scientist', location: 'Toronto, ON', minSalary: 120000, maxSalary: 200000, avgSalary: 155000, currency: 'CAD', experienceLevel: 'Senior', companySize: 'Large', dataPoints: 110 },
  { role: 'Research Scientist', location: 'Montreal, QC', minSalary: 115000, maxSalary: 190000, avgSalary: 148000, currency: 'CAD', experienceLevel: 'Senior', companySize: 'Large', dataPoints: 95 },
  { role: 'Research Scientist', location: 'Vancouver, BC', minSalary: 118000, maxSalary: 195000, avgSalary: 152000, currency: 'CAD', experienceLevel: 'Senior', companySize: 'Large', dataPoints: 75 },
  { role: 'Research Scientist', location: 'Remote (Canada)', minSalary: 115000, maxSalary: 188000, avgSalary: 145000, currency: 'CAD', experienceLevel: 'Senior', companySize: 'Large', dataPoints: 180 },
  
  // MLOps Engineer
  { role: 'MLOps Engineer', location: 'Toronto, ON', minSalary: 95000, maxSalary: 160000, avgSalary: 122000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 160 },
  { role: 'MLOps Engineer', location: 'Vancouver, BC', minSalary: 92000, maxSalary: 155000, avgSalary: 118000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 120 },
  { role: 'MLOps Engineer', location: 'Waterloo, ON', minSalary: 93000, maxSalary: 158000, avgSalary: 120000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 85 },
  { role: 'MLOps Engineer', location: 'Remote (Canada)', minSalary: 90000, maxSalary: 152000, avgSalary: 115000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 280 },
  
  // NLP Engineer
  { role: 'NLP Engineer', location: 'Toronto, ON', minSalary: 98000, maxSalary: 170000, avgSalary: 128000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 130 },
  { role: 'NLP Engineer', location: 'Montreal, QC', minSalary: 92000, maxSalary: 160000, avgSalary: 120000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 95 },
  { role: 'NLP Engineer', location: 'Remote (Canada)', minSalary: 95000, maxSalary: 165000, avgSalary: 125000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 220 },
  
  // Computer Vision Engineer
  { role: 'Computer Vision Engineer', location: 'Toronto, ON', minSalary: 96000, maxSalary: 168000, avgSalary: 126000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 115 },
  { role: 'Computer Vision Engineer', location: 'Vancouver, BC', minSalary: 93000, maxSalary: 162000, avgSalary: 122000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 90 },
  { role: 'Computer Vision Engineer', location: 'Waterloo, ON', minSalary: 94000, maxSalary: 165000, avgSalary: 124000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 75 },
  { role: 'Computer Vision Engineer', location: 'Remote (Canada)', minSalary: 92000, maxSalary: 160000, avgSalary: 120000, currency: 'CAD', experienceLevel: 'Mid-Level', companySize: 'Large', dataPoints: 195 },
];

export const SKILL_DEMAND: SkillDemand[] = [
  { skill: 'Python', count: 5890, trend: 'stable', percentageChange: 2, avgSalaryBoost: 0 },
  { skill: 'PyTorch', count: 3450, trend: 'up', percentageChange: 22, avgSalaryBoost: 8000 },
  { skill: 'TensorFlow', count: 3120, trend: 'down', percentageChange: -6, avgSalaryBoost: 5000 },
  { skill: 'LLMs', count: 2890, trend: 'up', percentageChange: 165, avgSalaryBoost: 18000 },
  { skill: 'Transformers', count: 2450, trend: 'up', percentageChange: 95, avgSalaryBoost: 15000 },
  { skill: 'RAG', count: 1980, trend: 'up', percentageChange: 230, avgSalaryBoost: 14000 },
  { skill: 'LangChain', count: 1650, trend: 'up', percentageChange: 340, avgSalaryBoost: 12000 },
  { skill: 'AWS', count: 4230, trend: 'stable', percentageChange: 4, avgSalaryBoost: 10000 },
  { skill: 'Docker', count: 3780, trend: 'stable', percentageChange: 3, avgSalaryBoost: 7000 },
  { skill: 'Kubernetes', count: 2890, trend: 'up', percentageChange: 15, avgSalaryBoost: 12000 },
  { skill: 'MLOps', count: 2340, trend: 'up', percentageChange: 48, avgSalaryBoost: 14000 },
  { skill: 'Computer Vision', count: 1890, trend: 'up', percentageChange: 18, avgSalaryBoost: 10000 },
  { skill: 'NLP', count: 2780, trend: 'up', percentageChange: 28, avgSalaryBoost: 11000 },
  { skill: 'SQL', count: 5120, trend: 'stable', percentageChange: 1, avgSalaryBoost: 3000 },
  { skill: 'Spark', count: 1450, trend: 'down', percentageChange: -4, avgSalaryBoost: 8000 },
  { skill: 'Scikit-learn', count: 2890, trend: 'stable', percentageChange: 0, avgSalaryBoost: 3000 },
  { skill: 'Hugging Face', count: 2230, trend: 'up', percentageChange: 105, avgSalaryBoost: 12000 },
  { skill: 'OpenAI API', count: 1560, trend: 'up', percentageChange: 195, avgSalaryBoost: 10000 },
  { skill: 'Vector Databases', count: 1280, trend: 'up', percentageChange: 270, avgSalaryBoost: 15000 },
  { skill: 'Fine-tuning', count: 1720, trend: 'up', percentageChange: 135, avgSalaryBoost: 14000 },
];

export const JOB_MARKET_TRENDS: JobMarketTrend[] = [
  { month: 'Jan 2024', jobPostings: 3450, avgSalary: 115000, remotePercentage: 38 },
  { month: 'Feb 2024', jobPostings: 3680, avgSalary: 116000, remotePercentage: 39 },
  { month: 'Mar 2024', jobPostings: 3920, avgSalary: 117000, remotePercentage: 41 },
  { month: 'Apr 2024', jobPostings: 4250, avgSalary: 118000, remotePercentage: 42 },
  { month: 'May 2024', jobPostings: 4680, avgSalary: 120000, remotePercentage: 44 },
  { month: 'Jun 2024', jobPostings: 5120, avgSalary: 122000, remotePercentage: 46 },
  { month: 'Jul 2024', jobPostings: 5450, avgSalary: 124000, remotePercentage: 48 },
  { month: 'Aug 2024', jobPostings: 5680, avgSalary: 125000, remotePercentage: 49 },
  { month: 'Sep 2024', jobPostings: 5980, avgSalary: 127000, remotePercentage: 51 },
  { month: 'Oct 2024', jobPostings: 6420, avgSalary: 129000, remotePercentage: 52 },
  { month: 'Nov 2024', jobPostings: 6890, avgSalary: 131000, remotePercentage: 54 },
  { month: 'Dec 2024', jobPostings: 6720, avgSalary: 133000, remotePercentage: 55 },
];

export const COMPANY_HIRING: CompanyHiring[] = [
  { company: 'Shopify', openPositions: 145, avgSalary: 145000, locations: ['Toronto, ON', 'Ottawa, ON', 'Remote'], topSkills: ['Python', 'PyTorch', 'LLMs', 'MLOps'] },
  { company: 'RBC', openPositions: 120, avgSalary: 125000, locations: ['Toronto, ON', 'Montreal, QC'], topSkills: ['Python', 'TensorFlow', 'NLP', 'AWS'] },
  { company: 'TD Bank', openPositions: 95, avgSalary: 122000, locations: ['Toronto, ON', 'Remote'], topSkills: ['Python', 'Machine Learning', 'SQL', 'AWS'] },
  { company: 'Scotiabank', openPositions: 85, avgSalary: 120000, locations: ['Toronto, ON', 'Remote'], topSkills: ['Python', 'PyTorch', 'NLP', 'MLOps'] },
  { company: 'Element AI (ServiceNow)', openPositions: 75, avgSalary: 155000, locations: ['Montreal, QC', 'Toronto, ON'], topSkills: ['LLMs', 'PyTorch', 'Transformers', 'NLP'] },
  { company: 'Amazon (Canada)', openPositions: 180, avgSalary: 140000, locations: ['Toronto, ON', 'Vancouver, BC', 'Remote'], topSkills: ['AWS', 'MLOps', 'Python', 'PyTorch'] },
  { company: 'Google (Canada)', openPositions: 95, avgSalary: 165000, locations: ['Toronto, ON', 'Waterloo, ON', 'Montreal, QC'], topSkills: ['PyTorch', 'TensorFlow', 'LLMs', 'Transformers'] },
  { company: 'Microsoft (Canada)', openPositions: 110, avgSalary: 150000, locations: ['Toronto, ON', 'Vancouver, BC', 'Remote'], topSkills: ['Azure', 'PyTorch', 'LLMs', 'MLOps'] },
  { company: 'Telus', openPositions: 65, avgSalary: 115000, locations: ['Vancouver, BC', 'Toronto, ON'], topSkills: ['Python', 'Machine Learning', 'NLP', 'AWS'] },
  { company: 'BMO', openPositions: 70, avgSalary: 118000, locations: ['Toronto, ON', 'Remote'], topSkills: ['Python', 'TensorFlow', 'NLP', 'MLOps'] },
];

export const ROLES = Array.from(new Set(SALARY_DATA.map(s => s.role))).sort();
export const LOCATIONS = Array.from(new Set(SALARY_DATA.map(s => s.location))).sort();
export const EXPERIENCE_LEVELS = Array.from(new Set(SALARY_DATA.map(s => s.experienceLevel))).sort();
