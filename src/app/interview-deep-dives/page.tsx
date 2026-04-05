'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Brain, Search, Code, Lightbulb, AlertTriangle, 
  ChevronDown, ChevronUp, BookOpen, Target, Zap
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
};

export default function InterviewDeepDivesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const filteredTopics = ALL_TOPICS.filter(topic => {
    const matchesSearch = searchQuery === '' || 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.concept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleTopic = (id: string) => {
    setExpandedTopic(expandedTopic === id ? null : id);
  };

  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <Brain className="mr-2 h-3 w-3" /> Interview Prep
          </Badge>
          <h1 className="text-4xl font-bold mb-3">Interview Deep Dives</h1>
          <p className="text-lg text-muted-foreground">
            Master ML/AI concepts with detailed explanations, code examples, and interview questions
          </p>
        </div>

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
      </div>
    </div>
  );
}
