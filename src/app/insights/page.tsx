'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  TrendingUp, DollarSign, MapPin, Briefcase, Users, 
  ArrowUp, ArrowDown, Minus, Building, Target
} from 'lucide-react';
import { 
  SALARY_DATA, SKILL_DEMAND, JOB_MARKET_TRENDS, COMPANY_HIRING,
  ROLES, LOCATIONS, EXPERIENCE_LEVELS 
} from '@/data/salaryAnalytics';

export default function InsightsPage() {
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');

  const filteredSalaries = SALARY_DATA.filter(s => {
    const matchesRole = selectedRole === 'All' || s.role === selectedRole;
    const matchesLocation = selectedLocation === 'All' || s.location === selectedLocation;
    const matchesExperience = selectedExperience === 'All' || s.experienceLevel === selectedExperience;
    return matchesRole && matchesLocation && matchesExperience;
  });

  const avgSalary = filteredSalaries.length > 0
    ? Math.round(filteredSalaries.reduce((sum, s) => sum + s.avgSalary, 0) / filteredSalaries.length)
    : 0;

  const minSalary = filteredSalaries.length > 0
    ? Math.min(...filteredSalaries.map(s => s.minSalary))
    : 0;

  const maxSalary = filteredSalaries.length > 0
    ? Math.max(...filteredSalaries.map(s => s.maxSalary))
    : 0;

  const totalDataPoints = filteredSalaries.reduce((sum, s) => sum + s.dataPoints, 0);

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <ArrowDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-muted-foreground';
  };

  return (
    <div className="container px-4 py-8 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <TrendingUp className="mr-2 h-3 w-3" /> Market Insights
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Salary & Job Market Analytics</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Real-time insights into AI/ML job market, salaries, and skill demand
          </p>
        </div>

        {/* Filters */}
        <div className="glass p-4 rounded-lg space-y-3 mb-6">
          <div>
            <span className="text-xs font-semibold text-muted-foreground mb-2 block">Role:</span>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedRole === 'All' ? 'default' : 'outline'}
                className="cursor-pointer text-xs"
                onClick={() => setSelectedRole('All')}
              >
                All
              </Badge>
              {ROLES.map((role) => (
                <Badge
                  key={role}
                  variant={selectedRole === role ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedRole(role)}
                >
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-muted-foreground mb-2 block">Location:</span>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedLocation === 'All' ? 'default' : 'outline'}
                className="cursor-pointer text-xs"
                onClick={() => setSelectedLocation('All')}
              >
                All
              </Badge>
              {LOCATIONS.map((loc) => (
                <Badge
                  key={loc}
                  variant={selectedLocation === loc ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedLocation(loc)}
                >
                  {loc}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-muted-foreground mb-2 block">Experience:</span>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedExperience === 'All' ? 'default' : 'outline'}
                className="cursor-pointer text-xs"
                onClick={() => setSelectedExperience('All')}
              >
                All
              </Badge>
              {EXPERIENCE_LEVELS.map((exp) => (
                <Badge
                  key={exp}
                  variant={selectedExperience === exp ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedExperience(exp)}
                >
                  {exp}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Salary Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Average Salary</p>
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold">{formatSalary(avgSalary)}</p>
              <p className="text-xs text-muted-foreground mt-1">{totalDataPoints.toLocaleString()} data points</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Salary Range</p>
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <p className="text-lg font-bold">{formatSalary(minSalary)}</p>
              <p className="text-xs text-muted-foreground">to {formatSalary(maxSalary)}</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Job Postings</p>
                <Briefcase className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">{JOB_MARKET_TRENDS[JOB_MARKET_TRENDS.length - 1].jobPostings.toLocaleString()}</p>
              <p className="text-xs text-green-500 mt-1">+15% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Remote Jobs</p>
                <MapPin className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold">{JOB_MARKET_TRENDS[JOB_MARKET_TRENDS.length - 1].remotePercentage}%</p>
              <p className="text-xs text-muted-foreground mt-1">of all postings</p>
            </CardContent>
          </Card>
        </div>

        {/* Salary by Role and Location */}
        <Card className="glass mb-6">
          <CardHeader>
            <h2 className="text-xl font-bold">Salary Breakdown</h2>
            <p className="text-sm text-muted-foreground">Average salaries by role and location</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredSalaries.slice(0, 10).map((salary, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-sm">{salary.role}</span>
                      <Badge variant="outline" className="text-xs">{salary.experienceLevel}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {salary.location}
                      <span>•</span>
                      <span>{salary.dataPoints} data points</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">{formatSalary(salary.avgSalary)}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatSalary(salary.minSalary)} - {formatSalary(salary.maxSalary)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top In-Demand Skills */}
        <Card className="glass mb-6">
          <CardHeader>
            <h2 className="text-xl font-bold">Top In-Demand Skills</h2>
            <p className="text-sm text-muted-foreground">Skills with highest demand and salary impact</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SKILL_DEMAND.slice(0, 12).map((skill) => (
                <div key={skill.skill} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{skill.skill}</span>
                      {getTrendIcon(skill.trend)}
                      <span className={`text-xs font-semibold ${getTrendColor(skill.trend)}`}>
                        {skill.percentageChange > 0 ? '+' : ''}{skill.percentageChange}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{skill.count.toLocaleString()} job postings</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-500">+{formatSalary(skill.avgSalaryBoost)}</p>
                    <p className="text-xs text-muted-foreground">avg boost</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Trends */}
        <Card className="glass mb-6">
          <CardHeader>
            <h2 className="text-xl font-bold">Job Market Trends (2024)</h2>
            <p className="text-sm text-muted-foreground">Monthly job postings and salary trends</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {JOB_MARKET_TRENDS.map((trend) => (
                <div key={trend.month} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                  <span className="text-sm font-medium w-24">{trend.month}</span>
                  <div className="flex-1 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{trend.jobPostings.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{formatSalary(trend.avgSalary)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">{trend.remotePercentage}% remote</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Hiring Companies */}
        <Card className="glass">
          <CardHeader>
            <h2 className="text-xl font-bold">Top Hiring Companies</h2>
            <p className="text-sm text-muted-foreground">Companies actively hiring AI/ML talent</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {COMPANY_HIRING.map((company) => (
                <div key={company.company} className="p-4 rounded-lg bg-muted/30">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Building className="h-5 w-5 text-primary" />
                        <h3 className="font-bold text-lg">{company.company}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {company.openPositions} open positions • Avg: {formatSalary(company.avgSalary)}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{company.locations.join(', ')}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {company.topSkills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
