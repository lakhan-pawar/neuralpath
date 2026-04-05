export interface SalaryData {
  role: string;
  location: string;
  minSalary: number;
  maxSalary: number;
  avgSalary: number;
  currency: string;
  experienceLevel: string;
  companySize: string;
  dataPoints: number;
}

export interface SkillDemand {
  skill: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
  percentageChange: number;
  avgSalaryBoost: number;
}

export interface JobMarketTrend {
  month: string;
  jobPostings: number;
  avgSalary: number;
  remotePercentage: number;
}

export interface CompanyHiring {
  company: string;
  openPositions: number;
  avgSalary: number;
  locations: string[];
  topSkills: string[];
}
