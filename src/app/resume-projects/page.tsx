'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Briefcase, Search, Clock, Code, Lightbulb, Target, 
  AlertTriangle, TrendingUp, ChevronDown, ChevronUp, Database 
} from 'lucide-react';
import { RESUME_PROJECTS_PART1 } from '@/data/resumeProjects1';
import { RESUME_PROJECTS_PART2 } from '@/data/resumeProjects2';
import { RESUME_PROJECTS_PART3 } from '@/data/resumeProjects3';
import { RESUME_PROJECTS_PART4 } from '@/data/resumeProjects4';
import { RESUME_PROJECTS_PART5 } from '@/data/resumeProjects5';
import { RESUME_PROJECTS_PART6 } from '@/data/resumeProjects6';

const ALL_PROJECTS = [
  ...RESUME_PROJECTS_PART1, 
  ...RESUME_PROJECTS_PART2, 
  ...RESUME_PROJECTS_PART3,
  ...RESUME_PROJECTS_PART4,
  ...RESUME_PROJECTS_PART5,
  ...RESUME_PROJECTS_PART6,
];

const CATEGORIES = [
  'All',
  'RAG (Retrieval-Augmented Generation)',
  'AI Agents',
  'Multi-Modal Agents',
  'Agentic AI',
  'AI Logging & Observability',
  'Advanced RAG Types',
  'Production ML Systems',
  'Distributed ML Systems',
  'LLM Fine-Tuning & Optimization',
  'NLP & Text Processing',
  'Computer Vision',
  'Recommendation Systems',
  'Time Series & Forecasting',
  'Reinforcement Learning',
  'Data Engineering for ML',
  'MLOps & Infrastructure',
  'Edge AI & Mobile ML',
  'Audio & Speech Processing',
  'Generative AI',
];

const DIFFICULTY_COLORS = {
  'Beginner': 'bg-green-500/10 text-green-500 border-green-500/30',
  'Intermediate': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  'Advanced': 'bg-red-500/10 text-red-500 border-red-500/30',
};

export default function ResumeProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const filteredProjects = ALL_PROJECTS.filter(project => {
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleProject = (id: string) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <Briefcase className="mr-2 h-3 w-3" /> Resume Builder
          </Badge>
          <h1 className="text-4xl font-bold mb-3">Resume-Ready AI Projects</h1>
          <p className="text-lg text-muted-foreground">
            Detailed project descriptions to add to your resume and ace technical interviews
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, tech stack, or keywords..."
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                  <p className="text-2xl font-bold">{filteredProjects.length}</p>
                </div>
                <Database className="h-8 w-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold">{CATEGORIES.length - 1}</p>
                </div>
                <Target className="h-8 w-8 text-accent opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Duration</p>
                  <p className="text-2xl font-bold">3-4 weeks</p>
                </div>
                <Clock className="h-8 w-8 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tech Stack</p>
                  <p className="text-2xl font-bold">50+ tools</p>
                </div>
                <Code className="h-8 w-8 text-orange-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="glass">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold">{project.title}</h2>
                      <Badge variant="outline" className={DIFFICULTY_COLORS[project.difficulty]}>
                        {project.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        {project.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {project.duration}
                      </span>
                    </div>
                    <p className="text-base text-foreground leading-relaxed">{project.overview}</p>
                  </div>
                  <Button
                    onClick={() => toggleProject(project.id)}
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                  >
                    {expandedProject === project.id ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        Show Details
                      </>
                    )}
                  </Button>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              {expandedProject === project.id && (
                <CardContent className="space-y-6">
                  {/* Key Features */}
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {project.keyFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Implementation */}
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                      <Code className="h-5 w-5 text-primary" />
                      Implementation Details
                    </h3>
                    <div className="space-y-4">
                      {project.implementation.map((step, idx) => (
                        <div key={idx} className="border-l-2 border-primary/30 pl-4">
                          <h4 className="font-semibold text-base mb-1">{step.step}</h4>
                          <p className="text-sm text-muted-foreground">{step.details}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Challenges */}
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Challenges & Solutions
                    </h3>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Results */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Results & Impact
                    </h3>
                    <p className="text-sm">{project.results}</p>
                  </div>

                  {/* Interview Tips */}
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                      <Target className="h-5 w-5 text-accent" />
                      Interview Tips
                    </h3>
                    <ul className="space-y-2">
                      {project.interviewTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-accent mt-1">→</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* GitHub Ideas */}
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                      <Code className="h-5 w-5 text-green-500" />
                      GitHub Repository Ideas
                    </h3>
                    <ul className="space-y-2">
                      {project.githubIdeas.map((idea, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{idea}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">
              No projects found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
