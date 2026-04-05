'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Brain, Search, Code, Lightbulb, AlertTriangle, 
  ChevronDown, ChevronUp, BookOpen, Target, Zap, Clock, Building, Tag, 
  Shuffle, CheckCircle2, MessageSquare, Filter, X, GitCompare, Star, Check,
  ExternalLink, DollarSign, User, Calendar, PlayCircle
} from 'lucide-react';
import { DEEP_DIVE_TOPICS_PART1 } from '@/data/interviewDeepDives1';
import { DEEP_DIVE_TOPICS_PART2 } from '@/data/interviewDeepDives2';
import { DEEP_DIVE_TOPICS_PART3 } from '@/data/interviewDeepDives3';
import { DEEP_DIVE_TOPICS_PART4 } from '@/data/interviewDeepDives4';
import { DEEP_DIVE_TOPICS_PART5 } from '@/data/interviewDeepDives5';
import { DEEP_DIVE_TOPICS_PART6 } from '@/data/interviewDeepDives6';
import { DEEP_DIVE_TOPICS_PART7 } from '@/data/interviewDeepDives7';
import { DEEP_DIVE_TOPICS_PART8 } from '@/data/interviewDeepDives8';
import { DEEP_DIVE_TOPICS_PART9 } from '@/data/interviewDeepDives9';
import { DEEP_DIVE_TOPICS_PART10 } from '@/data/interviewDeepDives10';
import { INTERVIEW_QUESTIONS, COMPANIES, TOPICS } from '@/data/interviewQuestions';
import { COMPARISON_ITEMS, CATEGORIES as COMPARISON_CATEGORIES } from '@/data/comparisons';
import type { QuestionType, QuestionDifficulty } from '@/types/interviewQuestion';
import type { ComparisonCategory } from '@/types/comparison';
import { AI_TERMS_PART1, CATEGORIES_PART1 } from '@/data/glossaryTerms1';
import { AI_TERMS_PART2, CATEGORIES_PART2 } from '@/data/glossaryTerms2';
import { AI_TERMS_PART3, CATEGORIES_PART3 } from '@/data/glossaryTerms3';
import { RESOURCES, RESOURCE_TYPES, RESOURCE_LEVELS, RESOURCE_TOPICS } from '@/data/resources';
import type { ResourceType, ResourceLevel } from '@/types/resource';

type Term = {
  term: string;
  category: string;
  definition: string;
  example?: string;
  relatedTerms?: string[];
};

const AI_TERMS: Term[] = [...AI_TERMS_PART1, ...AI_TERMS_PART2, ...AI_TERMS_PART3];
const GLOSSARY_CATEGORIES = ['All', ...CATEGORIES_PART1, ...CATEGORIES_PART2, ...CATEGORIES_PART3];

const TYPE_ICONS = {
  'Book': BookOpen,
  'Course': PlayCircle,
  'Video': PlayCircle,
  'Podcast': PlayCircle,
  'Paper': BookOpen,
  'Blog': BookOpen,
  'Tool': BookOpen,
};

const LEVEL_COLORS_RESOURCE = {
  'Beginner': 'bg-green-500/10 text-green-500 border-green-500/30',
  'Intermediate': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  'Advanced': 'bg-red-500/10 text-red-500 border-red-500/30',
  'All Levels': 'bg-blue-500/10 text-blue-500 border-blue-500/30',
};

const ALL_TOPICS = [
  ...DEEP_DIVE_TOPICS_PART1,
  ...DEEP_DIVE_TOPICS_PART2,
  ...DEEP_DIVE_TOPICS_PART3,
  ...DEEP_DIVE_TOPICS_PART4,
  ...DEEP_DIVE_TOPICS_PART5,
  ...DEEP_DIVE_TOPICS_PART6,
  ...DEEP_DIVE_TOPICS_PART7,
  ...DEEP_DIVE_TOPICS_PART8,
  ...DEEP_DIVE_TOPICS_PART9,
  ...DEEP_DIVE_TOPICS_PART10,
];

const CATEGORIES = [
  'All',
  'Transformers & Attention',
  'Training Techniques',
  'Model Architectures',
  'Optimization',
  'Loss Functions',
  'Activation Functions',
  'Production ML',
  'RAG & Retrieval',
  'Fine-Tuning',
  'Embeddings',
  'Distributed Training',
  'Model Compression',
  'Evaluation Metrics',
  'Generative Models',
  'NLP Techniques',
  'Sequence Models',
  'Attention Variants',
  'Regularization',
];

const DIFFICULTY_COLORS = {
  'Beginner': 'bg-green-500/10 text-green-500 border-green-500/30',
  'Intermediate': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  'Advanced': 'bg-red-500/10 text-red-500 border-red-500/30',
  'Easy': 'bg-green-500/10 text-green-500 border-green-500/30',
  'Medium': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  'Hard': 'bg-red-500/10 text-red-500 border-red-500/30',
};

const DIFFICULTY_LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const DIFFICULTY_ORDER = {
  'Beginner': 1,
  'Intermediate': 2,
  'Advanced': 3,
};

const QUESTION_TYPES: QuestionType[] = ['Technical', 'Behavioral', 'System Design', 'Coding', 'ML Theory'];
const QUESTION_DIFFICULTIES: QuestionDifficulty[] = ['Easy', 'Medium', 'Hard'];

const TYPE_COLORS = {
  'Technical': 'bg-blue-500/10 text-blue-500',
  'Behavioral': 'bg-purple-500/10 text-purple-500',
  'System Design': 'bg-orange-500/10 text-orange-500',
  'Coding': 'bg-green-500/10 text-green-500',
  'ML Theory': 'bg-pink-500/10 text-pink-500',
};

export default function InterviewDeepDivesPage() {
  const [activeTab, setActiveTab] = useState<'glossary' | 'deep-dives' | 'questions' | 'compare' | 'resources'>('glossary');
  
  // Glossary state
  const [glossarySearch, setGlossarySearch] = useState('');
  const [glossaryCategory, setGlossaryCategory] = useState('All');
  
  // Deep Dives state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  
  // Questions state
  const [questionSearch, setQuestionSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  
  // Compare state
  const [compareCategory, setCompareCategory] = useState<ComparisonCategory>('Frameworks');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  // Resources state
  const [resourceSearch, setResourceSearch] = useState('');
  const [selectedResourceType, setSelectedResourceType] = useState<string>('All');
  const [selectedResourceLevel, setSelectedResourceLevel] = useState<string>('All');
  const [showPaidOnly, setShowPaidOnly] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [selectedQuestionDifficulty, setSelectedQuestionDifficulty] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [practicedQuestions, setPracticedQuestions] = useState<Set<string>>(new Set());

  // Glossary filtering
  const filteredGlossaryTerms = AI_TERMS.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      term.definition.toLowerCase().includes(glossarySearch.toLowerCase());
    const matchesCategory = glossaryCategory === 'All' || term.category === glossaryCategory;
    return matchesSearch && matchesCategory;
  });

  // Resources filtering
  const filteredResources = RESOURCES.filter(r => {
    const matchesSearch = resourceSearch === '' || 
      r.title.toLowerCase().includes(resourceSearch.toLowerCase()) ||
      r.author.toLowerCase().includes(resourceSearch.toLowerCase()) ||
      r.description.toLowerCase().includes(resourceSearch.toLowerCase()) ||
      r.topics.some(t => t.toLowerCase().includes(resourceSearch.toLowerCase()));
    
    const matchesType = selectedResourceType === 'All' || r.type === selectedResourceType;
    const matchesLevel = selectedResourceLevel === 'All' || r.level === selectedResourceLevel;
    const matchesPaid = !showPaidOnly || r.isPaid;
    const matchesFree = !showFreeOnly || !r.isPaid;
    
    return matchesSearch && matchesType && matchesLevel && matchesPaid && matchesFree;
  }).sort((a, b) => b.rating - a.rating);

  const filteredTopics = ALL_TOPICS.filter(topic => {
    const matchesSearch = searchQuery === '' || 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || topic.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  }).sort((a, b) => {
    // Sort by difficulty level (Beginner -> Intermediate -> Advanced)
    return DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty];
  });

  const toggleTopic = (id: string) => {
    setExpandedTopic(expandedTopic === id ? null : id);
  };

  const filteredQuestions = INTERVIEW_QUESTIONS.filter(q => {
    const matchesSearch = questionSearch === '' || 
      q.question.toLowerCase().includes(questionSearch.toLowerCase()) ||
      q.topics.some(t => t.toLowerCase().includes(questionSearch.toLowerCase()));
    
    const matchesType = selectedType === 'All' || q.type === selectedType;
    const matchesDifficulty = selectedQuestionDifficulty === 'All' || q.difficulty === selectedQuestionDifficulty;
    const matchesCompany = selectedCompany === 'All' || q.company === selectedCompany;
    const matchesTopic = selectedTopic === 'All' || q.topics.includes(selectedTopic);
    
    return matchesSearch && matchesType && matchesDifficulty && matchesCompany && matchesTopic;
  });

  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const togglePracticed = (id: string) => {
    const newPracticed = new Set(practicedQuestions);
    if (newPracticed.has(id)) {
      newPracticed.delete(id);
    } else {
      newPracticed.add(id);
    }
    setPracticedQuestions(newPracticed);
  };

  const getRandomQuestion = () => {
    if (filteredQuestions.length > 0) {
      const randomQ = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
      setExpandedQuestion(randomQ.id);
      setTimeout(() => {
        document.getElementById(randomQ.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const clearQuestionFilters = () => {
    setQuestionSearch('');
    setSelectedType('All');
    setSelectedQuestionDifficulty('All');
    setSelectedCompany('All');
    setSelectedTopic('All');
  };

  const hasActiveQuestionFilters = selectedType !== 'All' || selectedQuestionDifficulty !== 'All' || 
                          selectedCompany !== 'All' || selectedTopic !== 'All' || questionSearch !== '';

  // Compare functions
  const categoryItems = COMPARISON_ITEMS.filter(i => i.category === compareCategory);
  const itemsToCompare = COMPARISON_ITEMS.filter(i => selectedItems.includes(i.id));

  const toggleItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      if (selectedItems.length < 3) {
        setSelectedItems([...selectedItems, id]);
      }
    }
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const renderRating = (rating?: number) => {
    if (!rating) return <span className="text-muted-foreground">N/A</span>;
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <Brain className="mr-2 h-3 w-3" /> Interview Prep
          </Badge>
          <h1 className="text-4xl font-bold mb-3">Interview Preparation</h1>
          <p className="text-lg text-muted-foreground">
            Master ML/AI concepts and practice interview questions from top tech companies
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-border overflow-x-auto">
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'glossary'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <BookOpen className="inline-block h-4 w-4 mr-2" />
            Glossary
          </button>
          <button
            onClick={() => setActiveTab('deep-dives')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'deep-dives'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Brain className="inline-block h-4 w-4 mr-2" />
            Deep Dives
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'questions'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <MessageSquare className="inline-block h-4 w-4 mr-2" />
            Q&A Bank
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'compare'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <GitCompare className="inline-block h-4 w-4 mr-2" />
            Compare
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'resources'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <BookOpen className="inline-block h-4 w-4 mr-2" />
            Resources
          </button>
        </div>

        {/* Glossary Tab Content */}
        {activeTab === 'glossary' && (
          <>
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              placeholder="Search terms or definitions..."
              className="pl-10"
            />
            {glossarySearch && (
              <button
                onClick={() => setGlossarySearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted/50 rounded transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter by Category:
            </h3>
            <div className="flex flex-wrap gap-2">
              {GLOSSARY_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setGlossaryCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    glossaryCategory === category
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{filteredGlossaryTerms.length}</p>
              <p className="text-xs text-muted-foreground">Terms Shown</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{AI_TERMS.length}</p>
              <p className="text-xs text-muted-foreground">Total Terms</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{GLOSSARY_CATEGORIES.length - 1}</p>
              <p className="text-xs text-muted-foreground">Categories</p>
            </CardContent>
          </Card>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGlossaryTerms.length > 0 ? (
            filteredGlossaryTerms.map((term) => (
              <Card key={term.term} className="glass hover:border-primary/40 transition-all">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-lg font-bold text-primary">{term.term}</h3>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {term.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-3">{term.definition}</p>
                  {term.example && (
                    <div className="bg-muted/50 rounded-lg p-3 mb-3">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Example:</p>
                      <p className="text-sm text-foreground leading-relaxed italic">{term.example}</p>
                    </div>
                  )}
                  {term.relatedTerms && term.relatedTerms.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Related:</p>
                      <div className="flex flex-wrap gap-1">
                        {term.relatedTerms.map((related) => (
                          <Badge
                            key={related}
                            variant="outline"
                            className="text-xs cursor-pointer hover:bg-primary/10 hover:border-primary/40 transition-colors"
                            onClick={() => setGlossarySearch(related)}
                          >
                            {related}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg text-muted-foreground mb-4">
                No terms found. Try adjusting your search or filters.
              </p>
              <Button
                onClick={() => {
                  setGlossarySearch('');
                  setGlossaryCategory('All');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
          </>
        )}

        {/* Deep Dives Tab Content */}
        {activeTab === 'deep-dives' && (
          <>
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g., attention, backprop, dropout)..."
              className="pl-10"
            />
          </div>

          {/* Difficulty Filter */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Difficulty Level:</h3>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTY_LEVELS.map((level) => (
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="glass">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Topics</p>
                  <p className="text-2xl font-bold">{filteredTopics.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary opacity-50" />
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
                  <p className="text-sm text-muted-foreground">With Code</p>
                  <p className="text-2xl font-bold">{ALL_TOPICS.filter(t => t.codeExample).length}</p>
                </div>
                <Code className="h-8 w-8 text-green-500 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Topics List */}
        <div className="space-y-6">
          {filteredTopics.map((topic) => (
            <Card key={topic.id} className="glass">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold">{topic.title}</h2>
                      <Badge variant="outline" className={DIFFICULTY_COLORS[topic.difficulty]}>
                        {topic.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Target className="h-4 w-4" />
                      {topic.category}
                    </div>
                    <p className="text-base text-foreground leading-relaxed">{topic.concept}</p>
                  </div>
                  <Button
                    onClick={() => toggleTopic(topic.id)}
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                  >
                    {expandedTopic === topic.id ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        Hide
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        Learn More
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>

              {expandedTopic === topic.id && (
                <CardContent className="space-y-6">
                  {/* Visual Analogy */}
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                      <Lightbulb className="h-5 w-5 text-accent" />
                      Simple Analogy
                    </h3>
                    <p className="text-sm leading-relaxed">{topic.visualAnalogy}</p>
                  </div>

                  {/* How It Works */}
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                      <Zap className="h-5 w-5 text-primary" />
                      How It Works
                    </h3>
                    <div className="space-y-4">
                      {topic.howItWorks.map((step, idx) => (
                        <div key={idx} className="border-l-2 border-primary/30 pl-4">
                          <h4 className="font-semibold text-base mb-1">
                            {idx + 1}. {step.step}
                          </h4>
                          <p className="text-sm text-muted-foreground">{step.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Intuition */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h3 className="text-lg font-bold mb-2">💡 Intuition</h3>
                    <p className="text-sm leading-relaxed">{topic.intuition}</p>
                  </div>

                  {/* When to Use */}
                  <div>
                    <h3 className="text-lg font-bold mb-3">When to Use</h3>
                    <ul className="space-y-2">
                      {topic.whenToUse.map((use, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trade-offs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-green-600">Pros</h4>
                      <ul className="space-y-1">
                        {topic.tradeoffs.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-green-500">+</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-red-600">Cons</h4>
                      <ul className="space-y-1">
                        {topic.tradeoffs.cons.map((con, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-red-500">-</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Code Example */}
                  {topic.codeExample && (
                    <div>
                      <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                        <Code className="h-5 w-5 text-primary" />
                        Code Example ({topic.codeExample.language})
                      </h3>
                      <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-slate-100">
                          <code>{topic.codeExample.code}</code>
                        </pre>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{topic.codeExample.explanation}</p>
                    </div>
                  )}

                  {/* Interview Questions */}
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                      <Brain className="h-5 w-5 text-primary" />
                      Common Interview Questions
                    </h3>
                    <div className="space-y-4">
                      {topic.interviewQuestions.map((qa, idx) => (
                        <div key={idx} className="border border-border rounded-lg p-4">
                          <p className="font-semibold text-base mb-2">Q: {qa.question}</p>
                          <p className="text-sm text-muted-foreground">A: {qa.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Mistakes */}
                  <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-4">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Common Mistakes to Avoid
                    </h3>
                    <ul className="space-y-2">
                      {topic.commonMistakes.map((mistake, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-orange-500 mt-1">⚠</span>
                          <span>{mistake}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Related Topics */}
                  <div>
                    <h3 className="text-lg font-bold mb-3">Related Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {topic.relatedTopics.map((related) => (
                        <Badge key={related} variant="secondary">
                          {related}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">
              No topics found. Try adjusting your search or filters.
            </p>
          </div>
        )}
          </>
        )}

        {/* Q&A Bank Tab Content */}
        {activeTab === 'questions' && (
          <>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{filteredQuestions.length}</p>
              <p className="text-xs text-muted-foreground">Questions</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{practicedQuestions.size}</p>
              <p className="text-xs text-muted-foreground">Practiced</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{COMPANIES.length}</p>
              <p className="text-xs text-muted-foreground">Companies</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{TOPICS.length}</p>
              <p className="text-xs text-muted-foreground">Topics</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={questionSearch}
                onChange={(e) => setQuestionSearch(e.target.value)}
                placeholder="Search questions or topics..."
                className="pl-10"
              />
            </div>
            <Button onClick={getRandomQuestion} variant="outline" className="gap-2">
              <Shuffle className="h-4 w-4" />
              Random
            </Button>
          </div>

          {/* Filters */}
          <div className="glass p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-muted-foreground">Filters</span>
              </div>
              {hasActiveQuestionFilters && (
                <button
                  onClick={clearQuestionFilters}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Clear all
                </button>
              )}
            </div>

            {/* Type Filter */}
            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Type:</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedType === 'All' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedType('All')}
                >
                  All
                </Badge>
                {QUESTION_TYPES.map((type) => (
                  <Badge
                    key={type}
                    variant={selectedType === type ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Difficulty:</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedQuestionDifficulty === 'All' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedQuestionDifficulty('All')}
                >
                  All
                </Badge>
                {QUESTION_DIFFICULTIES.map((diff) => (
                  <Badge
                    key={diff}
                    variant="outline"
                    className={`cursor-pointer text-xs ${selectedQuestionDifficulty === diff ? DIFFICULTY_COLORS[diff] : ''}`}
                    onClick={() => setSelectedQuestionDifficulty(diff)}
                  >
                    {diff}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Company Filter */}
            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Company:</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedCompany === 'All' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedCompany('All')}
                >
                  All
                </Badge>
                {COMPANIES.map((company) => (
                  <Badge
                    key={company}
                    variant={selectedCompany === company ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => setSelectedCompany(company)}
                  >
                    {company}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <Card key={question.id} id={question.id} className="glass">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="outline" className={TYPE_COLORS[question.type]}>
                        {question.type}
                      </Badge>
                      <Badge variant="outline" className={DIFFICULTY_COLORS[question.difficulty]}>
                        {question.difficulty}
                      </Badge>
                      {question.company && (
                        <Badge variant="secondary" className="gap-1">
                          <Building className="h-3 w-3" />
                          {question.company}
                        </Badge>
                      )}
                      {question.timeToSolve && (
                        <Badge variant="secondary" className="gap-1">
                          <Clock className="h-3 w-3" />
                          {question.timeToSolve}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-base md:text-lg font-semibold mb-2">{question.question}</h3>
                    <div className="flex flex-wrap gap-1">
                      {question.topics.map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      onClick={() => togglePracticed(question.id)}
                      variant={practicedQuestions.has(question.id) ? 'default' : 'outline'}
                      size="sm"
                      className="gap-1"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => toggleQuestion(question.id)}
                      variant="outline"
                      size="sm"
                    >
                      {expandedQuestion === question.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedQuestion === question.id && (
                <CardContent className="space-y-4">
                  {/* Hints */}
                  {question.hints && question.hints.length > 0 && (
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2">💡 Hints:</h4>
                      <ul className="space-y-1">
                        {question.hints.map((hint, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">• {hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Answer */}
                  {question.answer && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2">✓ Answer:</h4>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{question.answer}</p>
                    </div>
                  )}

                  {/* Follow-up Questions */}
                  {question.followUpQuestions && question.followUpQuestions.length > 0 && (
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2">🔄 Follow-up Questions:</h4>
                      <ul className="space-y-1">
                        {question.followUpQuestions.map((fq, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">• {fq}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">
              No questions found. Try adjusting your filters.
            </p>
          </div>
        )}
          </>
        )}

        {/* Compare Tab Content */}
        {activeTab === 'compare' && (
          <>
        {/* Category Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Select Category:</h3>
          <div className="flex flex-wrap gap-2">
            {COMPARISON_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setCompareCategory(category);
                  setSelectedItems([]);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  compareCategory === category
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'border-border text-muted-foreground hover:border-primary/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Selection Info */}
        {selectedItems.length > 0 && (
          <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitCompare className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">
                {selectedItems.length} of 3 items selected for comparison
              </span>
            </div>
            <Button onClick={clearSelection} variant="outline" size="sm">
              Clear Selection
            </Button>
          </div>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {categoryItems.map((item) => (
            <Card
              key={item.id}
              className={`glass cursor-pointer transition-all ${
                selectedItems.includes(item.id) ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => toggleItem(item.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      {item.openSource && (
                        <Badge variant="secondary" className="text-xs">Open Source</Badge>
                      )}
                      {item.githubStars && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Star className="h-3 w-3" />
                          {(item.githubStars / 1000).toFixed(0)}K
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0">
                    {selectedItems.includes(item.id) ? (
                      <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-border" />
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        {itemsToCompare.length >= 2 && (
          <Card className="glass">
            <CardHeader>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <GitCompare className="h-6 w-6 text-primary" />
                Side-by-Side Comparison
              </h2>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${itemsToCompare.length}, 1fr)` }}>
                  {/* Headers */}
                  <div className="font-semibold"></div>
                  {itemsToCompare.map((item) => (
                    <div key={item.id} className="font-bold text-lg">{item.name}</div>
                  ))}

                  {/* Overview */}
                  <div className="font-semibold">Description</div>
                  {itemsToCompare.map((item) => (
                    <div key={item.id} className="text-sm">{item.description}</div>
                  ))}

                  {/* Open Source */}
                  <div className="font-semibold">Open Source</div>
                  {itemsToCompare.map((item) => (
                    <div key={item.id} className="text-sm">{item.openSource ? 'Yes' : 'No'}</div>
                  ))}

                  {/* GitHub Stars */}
                  {itemsToCompare[0].githubStars && (
                    <>
                      <div className="font-semibold flex items-center gap-1">
                        <Star className="h-4 w-4" /> Stars
                      </div>
                      {itemsToCompare.map((item) => (
                        <div key={item.id} className="text-sm">
                          {item.githubStars ? `${(item.githubStars / 1000).toFixed(0)}K` : 'N/A'}
                        </div>
                      ))}
                    </>
                  )}

                  {/* Pros */}
                  <div className="font-semibold">Pros</div>
                  {itemsToCompare.map((item) => (
                    <div key={item.id} className="text-sm">
                      <ul className="space-y-1">
                        {item.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <Check className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Cons */}
                  <div className="font-semibold">Cons</div>
                  {itemsToCompare.map((item) => (
                    <div key={item.id} className="text-sm">
                      <ul className="space-y-1">
                        {item.cons.map((con, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <X className="h-3 w-3 text-red-500 mt-0.5 shrink-0" />
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Best For */}
                  <div className="font-semibold">Use Cases</div>
                  {itemsToCompare.map((item) => (
                    <div key={item.id} className="text-sm">
                      <ul className="space-y-1">
                        {item.useCases.map((use, idx) => (
                          <li key={idx}>• {use}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {itemsToCompare.length < 2 && selectedItems.length > 0 && (
          <div className="text-center py-12">
            <GitCompare className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">
              Select at least 2 items to compare
            </p>
          </div>
        )}
          </>
        )}

        {/* Resources Tab Content */}
        {activeTab === 'resources' && (
          <>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{filteredResources.length}</p>
              <p className="text-xs text-muted-foreground">Resources</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{RESOURCES.filter(r => !r.isPaid).length}</p>
              <p className="text-xs text-muted-foreground">Free</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{RESOURCES.filter(r => r.type === 'Book').length}</p>
              <p className="text-xs text-muted-foreground">Books</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={resourceSearch}
              onChange={(e) => setResourceSearch(e.target.value)}
              placeholder="Search resources, authors, or topics..."
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="glass p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-muted-foreground">Filters</span>
              </div>
              {(selectedResourceType !== 'All' || selectedResourceLevel !== 'All' || showPaidOnly || showFreeOnly || resourceSearch !== '') && (
                <button
                  onClick={() => {
                    setResourceSearch('');
                    setSelectedResourceType('All');
                    setSelectedResourceLevel('All');
                    setShowPaidOnly(false);
                    setShowFreeOnly(false);
                  }}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Clear all
                </button>
              )}
            </div>

            {/* Type Filter */}
            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Type:</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedResourceType === 'All' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedResourceType('All')}
                >
                  All
                </Badge>
                {RESOURCE_TYPES.map((type) => (
                  <Badge
                    key={type}
                    variant={selectedResourceType === type ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => setSelectedResourceType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Level:</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedResourceLevel === 'All' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedResourceLevel('All')}
                >
                  All
                </Badge>
                {RESOURCE_LEVELS.map((level) => (
                  <Badge
                    key={level}
                    variant="outline"
                    className={`cursor-pointer text-xs ${selectedResourceLevel === level ? LEVEL_COLORS_RESOURCE[level as ResourceLevel] : ''}`}
                    onClick={() => setSelectedResourceLevel(level)}
                  >
                    {level}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Price:</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={showFreeOnly ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => {
                    setShowFreeOnly(!showFreeOnly);
                    if (!showFreeOnly) setShowPaidOnly(false);
                  }}
                >
                  Free Only
                </Badge>
                <Badge
                  variant={showPaidOnly ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => {
                    setShowPaidOnly(!showPaidOnly);
                    if (!showPaidOnly) setShowFreeOnly(false);
                  }}
                >
                  Paid Only
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.map((resource) => {
            const Icon = TYPE_ICONS[resource.type];
            
            return (
              <Card key={resource.id} className="glass">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Icon className="h-5 w-5 text-primary" />
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${LEVEL_COLORS_RESOURCE[resource.level]}`}>
                          {resource.level}
                        </Badge>
                        {!resource.isPaid && (
                          <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-500">
                            Free
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-bold mb-1">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                        <User className="h-3 w-3" />
                        {resource.author}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-sm leading-relaxed">{resource.description}</p>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {resource.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {resource.duration}
                      </span>
                    )}
                    {resource.price && (
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {resource.price}
                      </span>
                    )}
                    {resource.releaseYear && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {resource.releaseYear}
                      </span>
                    )}
                    {resource.platform && (
                      <span>{resource.platform}</span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= resource.rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                      <span className="text-sm font-semibold ml-1">{resource.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({resource.reviewCount.toLocaleString()} reviews)
                    </span>
                  </div>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-1">
                    {resource.topics.map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Resource
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">
              No resources found. Try adjusting your filters.
            </p>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}
