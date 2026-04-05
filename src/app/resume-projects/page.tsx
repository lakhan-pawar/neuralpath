'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Briefcase, Search, Clock, Code, Lightbulb, Target, 
  AlertTriangle, TrendingUp, ChevronDown, ChevronUp, Database, Rocket, FlaskConical
} from 'lucide-react';
import { RESUME_PROJECTS_PART1 } from '@/data/resumeProjects1';
import { RESUME_PROJECTS_PART2 } from '@/data/resumeProjects2';
import { RESUME_PROJECTS_PART3 } from '@/data/resumeProjects3';
import { RESUME_PROJECTS_PART4 } from '@/data/resumeProjects4';
import { RESUME_PROJECTS_PART5 } from '@/data/resumeProjects5';
import { RESUME_PROJECTS_PART6 } from '@/data/resumeProjects6';
import { ALL_USE_CASES } from '@/data/useCasesIndex';
import { AI_IMPLEMENTATIONS } from '@/data/aiImplementations';

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
  const [activeTab, setActiveTab] = useState<'resume' | 'usecases' | 'live'>('resume');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  
  // Use Cases state
  const [useCaseSearch, setUseCaseSearch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedUseCaseDifficulty, setSelectedUseCaseDifficulty] = useState('All');
  const [expandedUseCase, setExpandedUseCase] = useState<string | null>(null);
  
  // Live Projects state
  const [liveSearch, setLiveSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedComplexity, setSelectedComplexity] = useState('All');

  const filteredProjects = ALL_PROJECTS.filter(project => {
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || project.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  }).sort((a, b) => {
    // Sort by difficulty: Beginner -> Intermediate -> Advanced
    const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });
  
  const filteredUseCases = ALL_USE_CASES.filter(useCase => {
    const matchesSearch = useCaseSearch === '' ||
      useCase.title.toLowerCase().includes(useCaseSearch.toLowerCase()) ||
      useCase.description.toLowerCase().includes(useCaseSearch.toLowerCase());
    const matchesIndustry = selectedIndustry === 'All' || useCase.category === selectedIndustry;
    const matchesDifficulty = selectedUseCaseDifficulty === 'All' || useCase.difficulty === selectedUseCaseDifficulty;
    return matchesSearch && matchesIndustry && matchesDifficulty;
  }).sort((a, b) => {
    // Sort by difficulty: Beginner -> Intermediate -> Advanced
    const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });
  
  const filteredImplementations = AI_IMPLEMENTATIONS.filter(impl => {
    const matchesSearch = liveSearch === '' ||
      impl.name.toLowerCase().includes(liveSearch.toLowerCase()) ||
      impl.description.toLowerCase().includes(liveSearch.toLowerCase());
    const matchesType = selectedType === 'All' || impl.type === selectedType;
    const matchesComplexity = selectedComplexity === 'All' || impl.complexity === selectedComplexity;
    return matchesSearch && matchesType && matchesComplexity;
  });

  const toggleProject = (id: string) => {
    setExpandedProject(expandedProject === id ? null : id);
  };
  
  const toggleUseCase = (id: string) => {
    setExpandedUseCase(expandedUseCase === id ? null : id);
  };
  
  const industries = Array.from(new Set(ALL_USE_CASES.map(u => u.category)));
  const types = Array.from(new Set(AI_IMPLEMENTATIONS.map(i => i.type)));
  const complexities = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <Briefcase className="mr-2 h-3 w-3" /> AI Projects Hub
          </Badge>
          <h1 className="text-4xl font-bold mb-3">AI/ML Projects & Use Cases</h1>
          <p className="text-lg text-muted-foreground">
            Resume-ready projects, real-world use cases, and production implementations
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-border">
          <button
            onClick={() => setActiveTab('resume')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'resume'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <FlaskConical className="inline-block h-4 w-4 mr-2" />
            Resume Projects
          </button>
          <button
            onClick={() => setActiveTab('usecases')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'usecases'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Lightbulb className="inline-block h-4 w-4 mr-2" />
            Use Cases
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'live'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Rocket className="inline-block h-4 w-4 mr-2" />
            Live Projects
          </button>
        </div>

        {/* Resume Projects Tab */}
        {activeTab === 'resume' && (
          <>
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

          {/* Difficulty Filter */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Difficulty Level:</h3>
            <div className="flex flex-wrap gap-2">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    selectedDifficulty === level
                      ? level === 'Beginner' 
                        ? 'bg-green-500/10 border-green-500/30 text-green-500'
                        : level === 'Intermediate'
                        ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'
                        : level === 'Advanced'
                        ? 'bg-red-500/10 border-red-500/30 text-red-500'
                        : 'bg-primary/10 border-primary/30 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Category:</h3>
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
          </>
        )}

        {/* Use Cases Tab */}
        {activeTab === 'usecases' && (
          <>
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={useCaseSearch}
              onChange={(e) => setUseCaseSearch(e.target.value)}
              placeholder="Search use cases..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          {/* Difficulty Filter */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Difficulty Level:</h3>
            <div className="flex flex-wrap gap-2">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedUseCaseDifficulty(level)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    selectedUseCaseDifficulty === level
                      ? level === 'Beginner' 
                        ? 'bg-green-500/10 border-green-500/30 text-green-500'
                        : level === 'Intermediate'
                        ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'
                        : level === 'Advanced'
                        ? 'bg-red-500/10 border-red-500/30 text-red-500'
                        : 'bg-primary/10 border-primary/30 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Industry:</h3>
            <div className="flex flex-wrap gap-2">
              {['All', ...industries].map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    selectedIndustry === industry
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredUseCases.map((useCase) => (
            <Card key={useCase.id} className="glass">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{useCase.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{useCase.category}</Badge>
                      <Badge variant="outline" className={DIFFICULTY_COLORS[useCase.difficulty]}>
                        {useCase.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() => toggleUseCase(useCase.id)}
                    variant="outline"
                    size="sm"
                  >
                    {expandedUseCase === useCase.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>

              {expandedUseCase === useCase.id && (
                <CardContent className="space-y-4">
                  {/* AI Models */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">AI Models:</h4>
                    <div className="flex flex-wrap gap-2">
                      {useCase.aiModels.map((model, idx) => (
                        <Badge key={idx} variant="secondary">{model}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {useCase.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Real World Example */}
                  {useCase.realWorldExample && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2">Real World Example:</h4>
                      <p className="text-sm">{useCase.realWorldExample}</p>
                    </div>
                  )}

                  {/* Estimated Time & Savings */}
                  <div className="flex gap-4">
                    {useCase.estimatedTime && (
                      <div>
                        <h4 className="font-semibold text-xs text-muted-foreground mb-1">Estimated Time:</h4>
                        <p className="text-sm">{useCase.estimatedTime}</p>
                      </div>
                    )}
                    {useCase.potentialSavings && (
                      <div>
                        <h4 className="font-semibold text-xs text-muted-foreground mb-1">Potential Savings:</h4>
                        <p className="text-sm">{useCase.potentialSavings}</p>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {useCase.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {filteredUseCases.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">
              No use cases found. Try adjusting your search.
            </p>
          </div>
        )}
          </>
        )}

        {/* Live Projects Tab */}
        {activeTab === 'live' && (
          <>
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                  <p className="text-2xl font-bold">{filteredImplementations.length}</p>
                </div>
                <Rocket className="h-8 w-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Types</p>
                  <p className="text-2xl font-bold">{types.length}</p>
                </div>
                <Target className="h-8 w-8 text-accent opacity-50" />
              </div>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">With GitHub</p>
                  <p className="text-2xl font-bold">{AI_IMPLEMENTATIONS.filter(i => i.github).length}</p>
                </div>
                <Code className="h-8 w-8 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={liveSearch}
              onChange={(e) => setLiveSearch(e.target.value)}
              placeholder="Search live projects..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Type:</h3>
            <div className="flex flex-wrap gap-2">
              {['All', ...types].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    selectedType === type
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Complexity:</h3>
            <div className="flex flex-wrap gap-2">
              {complexities.map((complexity) => (
                <button
                  key={complexity}
                  onClick={() => setSelectedComplexity(complexity)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    selectedComplexity === complexity
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  {complexity}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredImplementations.map((impl) => (
            <Card key={impl.id} className="glass hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold flex-1">{impl.name}</h3>
                    {impl.stars && (
                      <Badge variant="secondary" className="shrink-0">
                        ⭐ {impl.stars}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{impl.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{impl.type}</Badge>
                    <Badge variant="outline">{impl.complexity}</Badge>
                    <Badge variant="outline">{impl.organization}</Badge>
                  </div>
                  {impl.github && (
                    <a
                      href={impl.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <Code className="h-3 w-3" />
                      View on GitHub →
                    </a>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Tech Stack */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Tech Stack:</h4>
                  <div className="flex flex-wrap gap-1">
                    {impl.techStack.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </div>

                {/* AI Models */}
                {impl.aiModels && impl.aiModels.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">AI Models:</h4>
                    <div className="flex flex-wrap gap-1">
                      {impl.aiModels.map((model, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">{model}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Features */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {impl.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div>
                  <div className="flex flex-wrap gap-1">
                    {impl.tags.slice(0, 5).map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredImplementations.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">
              No projects found. Try adjusting your filters.
            </p>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}
