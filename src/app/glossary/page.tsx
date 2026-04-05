'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookOpen, Search, Sparkles, Filter, X } from 'lucide-react';
import { GeminiChat } from '@/components/shared/GeminiChat';
import { AI_TERMS_PART1, CATEGORIES_PART1 } from '@/data/glossaryTerms1';
import { AI_TERMS_PART2, CATEGORIES_PART2 } from '@/data/glossaryTerms2';
import { AI_TERMS_PART3, CATEGORIES_PART3 } from '@/data/glossaryTerms3';

type Term = {
  term: string;
  category: string;
  definition: string;
  example?: string;
  relatedTerms?: string[];
};

// Combine all terms from the three files (300 total terms)
const AI_TERMS: Term[] = [...AI_TERMS_PART1, ...AI_TERMS_PART2, ...AI_TERMS_PART3];
const CATEGORIES = ['All', ...CATEGORIES_PART1, ...CATEGORIES_PART2, ...CATEGORIES_PART3];

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTerms = useMemo(() => {
    return AI_TERMS.filter((term) => {
      const matchesSearch =
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="container px-4 py-10 md:py-16 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <Badge variant="outline" className="mb-5 border-primary/30 bg-primary/5 font-semibold text-sm px-4 py-1.5">
            <BookOpen className="mr-2 h-4 w-4" /> AI Terminology
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            AI & LLM Glossary
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Your comprehensive guide to understanding AI, Machine Learning, and Large Language Model terminology
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-10 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search terms or definitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-12 h-16 text-lg rounded-2xl border-2 shadow-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 p-2 hover:bg-muted/50 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="w-full">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-5 w-5 text-muted-foreground shrink-0" />
              <span className="text-sm font-semibold text-muted-foreground">Filter by Category</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-medium'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-base text-muted-foreground font-medium">
            Showing <span className="text-primary font-bold">{filteredTerms.length}</span> of{' '}
            <span className="font-bold">{AI_TERMS.length}</span> terms
          </p>
        </div>

        {/* Terms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {filteredTerms.length > 0 ? (
                filteredTerms.map((term) => (
                  <Card key={term.term} className="glass shadow-medium hover:shadow-large transition-all">
                    <CardContent className="pt-7 pb-7">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-primary">{term.term}</h3>
                        <Badge variant="secondary" className="text-sm font-semibold shrink-0">
                          {term.category}
                        </Badge>
                      </div>
                      <p className="text-base text-foreground leading-relaxed mb-4">{term.definition}</p>
                      {term.example && (
                        <div className="bg-muted/50 rounded-xl p-4 mb-4">
                          <p className="text-sm font-semibold text-muted-foreground mb-2">Example:</p>
                          <p className="text-base text-foreground leading-relaxed italic">{term.example}</p>
                        </div>
                      )}
                      {term.relatedTerms && term.relatedTerms.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold text-muted-foreground mb-2">Related Terms:</p>
                          <div className="flex flex-wrap gap-2">
                            {term.relatedTerms.map((related) => (
                              <Badge
                                key={related}
                                variant="outline"
                                className="text-sm cursor-pointer hover:bg-primary/10 hover:border-primary/40 transition-colors"
                                onClick={() => setSearchQuery(related)}
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
                <Card className="glass shadow-medium">
                  <CardContent className="pt-12 pb-12 text-center">
                    <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">No terms found</h3>
                    <p className="text-base text-muted-foreground mb-6">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                      variant="outline"
                      className="h-12 px-6 text-base font-semibold"
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <GeminiChat
              title="Ask About Terms"
              placeholder="Ask me to explain any AI concept..."
              systemPrompt="You are an AI terminology expert. Explain AI, ML, and LLM concepts in simple terms that a C# developer can understand. Use analogies to programming concepts when helpful. Be concise but thorough."
            />

            <Card className="glass shadow-medium">
              <CardHeader>
                <h3 className="text-xl font-bold">Quick Stats</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-base text-muted-foreground">Total Terms</span>
                  <span className="text-2xl font-bold text-primary">{AI_TERMS.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-muted-foreground">Categories</span>
                  <span className="text-2xl font-bold text-accent">{CATEGORIES.length - 1}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass shadow-medium bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="pt-7 pb-7">
                <Sparkles className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Pro Tip</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Click on any related term badge to quickly jump to its definition. Use the AI assistant to get personalized explanations!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
