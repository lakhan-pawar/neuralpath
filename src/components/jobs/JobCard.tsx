import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, DollarSign, ExternalLink, Wifi, Database, Code, Wrench, Lightbulb, GraduationCap } from 'lucide-react';
import type { Job } from '@/types/job';
import { useState } from 'react';

export function JobCard({ job }: { job: Job }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const timeAgo = (date: string) => {
    const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  // Extract different categories from description
  const extractJobDetails = () => {
    const text = job.description.toLowerCase();
    const originalText = job.description;
    
    // Core technologies (required/must-have)
    const coreTech = [
      'Python', 'JavaScript', 'TypeScript', 'Java', 'C#', 'C\\+\\+', 'Go', 'Rust',
      'TensorFlow', 'PyTorch', 'Keras', 'scikit-learn',
      'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
      'SQL', 'PostgreSQL', 'MongoDB', 'Machine Learning', 'Deep Learning', 'NLP', 'LLM'
    ];
    
    // Optional/Nice to have technologies
    const optionalTech = [
      'React', 'Vue', 'Angular', 'Node\\.js', 'Django', 'Flask', 'FastAPI',
      'Redis', 'Elasticsearch', 'GraphQL', 'Microservices',
      'Jenkins', 'CI/CD', 'MLOps', 'DevOps', 'Git', 'Linux'
    ];

    // Key skills (soft skills and domain expertise)
    const keySkillsKeywords = [
      'communication', 'problem solving', 'analytical', 'leadership', 'teamwork',
      'collaboration', 'critical thinking', 'attention to detail', 'time management',
      'agile', 'scrum', 'project management', 'stakeholder management',
      'data analysis', 'statistical analysis', 'research', 'innovation',
      'mentoring', 'coaching', 'presentation', 'documentation'
    ];

    const required = new Set<string>();
    const optional = new Set<string>();
    const responsibilities = new Set<string>();
    const keySkills = new Set<string>();
    const education = new Set<string>();

    // Extract required skills (mentioned with "required", "must", "essential")
    const requiredPattern = /(required|must have|essential|mandatory)[^.]*?(?:experience with|knowledge of|proficiency in)?\s*([^.]+)/gi;
    let match: RegExpExecArray | null;
    while ((match = requiredPattern.exec(text)) !== null) {
      const matchText = match[2];
      coreTech.forEach(tech => {
        const regex = new RegExp(`\\b${tech}\\b`, 'gi');
        if (regex.test(matchText)) {
          const techMatch = matchText.match(regex);
          if (techMatch) required.add(techMatch[0]);
        }
      });
    }

    // Extract optional skills (mentioned with "nice to have", "preferred", "bonus", "plus")
    const optionalPattern = /(nice to have|preferred|bonus|plus|desirable|advantage)[^.]*?(?:experience with|knowledge of)?\s*([^.]+)/gi;
    while ((match = optionalPattern.exec(text)) !== null) {
      const matchText = match[2];
      optionalTech.forEach(tech => {
        const regex = new RegExp(`\\b${tech}\\b`, 'gi');
        if (regex.test(matchText)) {
          const techMatch = matchText.match(regex);
          if (techMatch) optional.add(techMatch[0]);
        }
      });
    }

    // If no explicit required/optional found, categorize by frequency and context
    if (required.size === 0) {
      coreTech.forEach(tech => {
        const regex = new RegExp(`\\b${tech}\\b`, 'gi');
        const matches = text.match(regex);
        if (matches && matches.length > 0) {
          required.add(matches[0]);
        }
      });
    }

    if (optional.size === 0) {
      optionalTech.forEach(tech => {
        const regex = new RegExp(`\\b${tech}\\b`, 'gi');
        const matches = text.match(regex);
        if (matches && matches.length > 0 && !required.has(matches[0])) {
          optional.add(matches[0]);
        }
      });
    }

    // Extract key skills (soft skills and domain expertise)
    keySkillsKeywords.forEach(skill => {
      const regex = new RegExp(`\\b${skill}\\b`, 'gi');
      const matches = originalText.match(regex);
      if (matches) {
        keySkills.add(matches[0]);
      }
    });

    // Extract education requirements
    const educationPatterns = [
      /bachelor'?s?\s+(?:degree|in|of)\s+(?:in\s+)?([^.,]+)/gi,
      /master'?s?\s+(?:degree|in|of)\s+(?:in\s+)?([^.,]+)/gi,
      /phd|doctorate|doctoral\s+(?:degree|in|of)?\s*(?:in\s+)?([^.,]*)/gi,
      /degree\s+in\s+([^.,]+)/gi,
      /(computer science|engineering|mathematics|statistics|data science|artificial intelligence|machine learning)/gi
    ];

    educationPatterns.forEach(pattern => {
      let eduMatch;
      while ((eduMatch = pattern.exec(originalText)) !== null) {
        if (eduMatch[0].length > 5 && eduMatch[0].length < 100) {
          const edu = eduMatch[0].trim();
          education.add(edu.charAt(0).toUpperCase() + edu.slice(1));
        }
      }
    });

    // Extract experience requirements
    const experiencePattern = /(\d+\+?\s*(?:years?|yrs?)(?:\s+of)?\s+(?:experience|exp)(?:\s+(?:in|with|as))?\s+[^.,]+)/gi;
    while ((match = experiencePattern.exec(originalText)) !== null) {
      if (match[1].length < 100) {
        education.add(match[1].trim());
      }
    }

    // Extract responsibilities
    const responsibilityKeywords = [
      'design', 'develop', 'build', 'implement', 'create', 'maintain',
      'collaborate', 'lead', 'manage', 'optimize', 'deploy', 'test',
      'analyze', 'research', 'architect', 'integrate', 'monitor'
    ];

    responsibilityKeywords.forEach(keyword => {
      const pattern = new RegExp(`(${keyword}[^.]*?(?:models?|systems?|applications?|solutions?|pipelines?|infrastructure|apis?|services?|features?|code|data|teams?)[^.]*)`, 'gi');
      let respMatch;
      while ((respMatch = pattern.exec(text)) !== null) {
        const resp = respMatch[1].trim();
        if (resp.length > 20 && resp.length < 150) {
          responsibilities.add(resp.charAt(0).toUpperCase() + resp.slice(1));
        }
      }
    });

    return {
      required: Array.from(required).slice(0, 8),
      optional: Array.from(optional).slice(0, 6),
      responsibilities: Array.from(responsibilities).slice(0, 4),
      keySkills: Array.from(keySkills).slice(0, 6),
      education: Array.from(education).slice(0, 3)
    };
  };

  const jobDetails = extractJobDetails();

  const sourceColors = {
    adzuna: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    muse: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
    remotive: 'bg-green-500/10 text-green-500 border-green-500/30',
    indeed: 'bg-orange-500/10 text-orange-500 border-orange-500/30',
    eluta: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30',
    linkedin: 'bg-blue-600/10 text-blue-600 border-blue-600/30'
  };

  const sourceLabels = {
    adzuna: 'Adzuna',
    muse: 'The Muse',
    remotive: 'Remotive',
    indeed: 'Indeed',
    eluta: 'Eluta',
    linkedin: 'LinkedIn'
  };

  return (
    <Card className="glass hover:border-primary/40 transition-colors">
      <CardContent className="pt-5 pb-5">
        <div className="space-y-4">
          {/* Header Section */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <h3 className="font-semibold text-lg">{job.title}</h3>
                {job.remote && (
                  <Badge variant="outline" className="border-green-500/30 text-green-500 text-xs gap-1">
                    <Wifi className="h-3 w-3" /> Remote
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-base font-medium text-foreground">{job.company}</p>
                <Badge variant="outline" className={`text-xs ${sourceColors[job.source]}`}>
                  <Database className="h-3 w-3 mr-1" />
                  {sourceLabels[job.source]}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {job.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />{job.location}
                  </span>
                )}
                {job.salary && (
                  <span className="flex items-center gap-1.5 font-medium text-green-600">
                    <DollarSign className="h-4 w-4" />
                    {job.salary.min.toLocaleString()}–{job.salary.max.toLocaleString()} {job.salary.currency}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />{timeAgo(job.postedAt)}
                </span>
              </div>
            </div>
            
            {/* Apply Button */}
            <div className="shrink-0">
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                <Button size="default" variant="default" className="whitespace-nowrap">
                  Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Job Description */}
          <div className="border-t border-border/50 pt-4">
            <p className={`text-sm text-muted-foreground leading-relaxed ${showFullDescription ? '' : 'line-clamp-4'}`}>
              {job.description}
            </p>
            {job.description.length > 200 && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-sm text-primary hover:underline mt-2 font-medium"
              >
                {showFullDescription ? '▲ Show less' : '▼ Show more'}
              </button>
            )}
          </div>

          {/* Two Column Layout for Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border-t border-border/50 pt-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Core Responsibilities */}
              {jobDetails.responsibilities.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Wrench className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-semibold text-blue-500">Core Responsibilities</span>
                  </div>
                  <ul className="space-y-1.5 ml-5">
                    {jobDetails.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground list-disc leading-relaxed">
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Required Skills */}
              {jobDetails.required.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Code className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-semibold text-red-500">Required Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {jobDetails.required.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs bg-red-500/10 text-red-500 border-red-500/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Skills */}
              {jobDetails.keySkills.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-yellow-500">Key Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {jobDetails.keySkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Education & Experience */}
              {jobDetails.education.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <GraduationCap className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-semibold text-purple-500">Education & Experience</span>
                  </div>
                  <ul className="space-y-1.5 ml-5">
                    {jobDetails.education.map((edu, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground list-disc leading-relaxed">
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Optional/Nice to Have */}
              {jobDetails.optional.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Code className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-semibold text-green-500">Nice to Have</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {jobDetails.optional.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs text-green-500 border-green-500/30">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Tags */}
              {job.tags.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-muted-foreground">Additional Info</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
