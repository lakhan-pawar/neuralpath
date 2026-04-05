'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Lightbulb, Search, Filter, X } from 'lucide-react';
import { UseCaseCard } from '@/components/usecases/UseCaseCard';
import { LoadingCard } from '@/components/shared/LoadingCard';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import type { AIUseCase } from '@/types/usecase';

const categories = [
  'All',
  'Computer Vision',
  'NLP & Text',
  'Audio & Speech',
  'Business Automation',
  'Healthcare',
  'Finance',
  'Education',
  'E-commerce',
  'Personal Productivity',
  'Creative & Design',
  'Development Tools',
  'Data Analysis'
];

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function UseCasesPage() {
  const [useCases, setUseCases] = useState<AIUseCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    fetchUseCases();
  }, []);

  const fetchUseCases = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (selectedDifficulty !== 'All') params.append('difficulty', selectedDifficulty);

      const res = await fetch(`/api/usecases?${params}`);
      const data = await res.json();
      setUseCases(data.useCases || []);
    } catch (error) {
      console.error('Failed to fetch use cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUseCases();
  };

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedTags([]);
    fetchUseCases();
  };

  // Get all unique tags
  const allTags = Array.from(
    new Set(useCases.flatMap(uc => uc.tags))
  ).sort();

  // Popular tags
  const tagCounts = useCases.reduce((acc, uc) => {
    uc.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([tag]) => tag);

  // Filter by selected tags
  const filteredUseCases = useCases.filter(uc => {
    if (selectedTags.length === 0) return true;
    return selectedTags.every(tag => uc.tags.includes(tag));
  });

  return (
    <div className="container px-4 py-8 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <Lightbulb className="mr-2 h-3 w-3" /> AI Use Cases
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">300+ AI Use Cases & Ideas</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Real-world applications of AI across industries. From receipt scanning to medical diagnosis.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4 mb-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search use cases: receipt scanner, chatbot, image recognition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </form>

          {/* Category Filter */}
          <div className="glass p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-muted-foreground">Filters</span>
              </div>
              {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || selectedTags.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Clear all
                </button>
              )}
            </div>

            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Category:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => {
                      setSelectedCategory(cat);
                      fetchUseCases();
                    }}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Difficulty:</span>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((diff) => (
                  <Badge
                    key={diff}
                    variant={selectedDifficulty === diff ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => {
                      setSelectedDifficulty(diff);
                      fetchUseCases();
                    }}
                  >
                    {diff}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            {!loading && popularTags.length > 0 && (
              <div>
                <span className="text-xs font-semibold text-muted-foreground mb-2 block">Popular Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'secondary'}
                      className="cursor-pointer text-xs hover:bg-primary/20 transition-colors"
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag} ({tagCounts[tag]})
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Tag Filters */}
          {selectedTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Active tags:</span>
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="default"
                  className="cursor-pointer gap-1"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag} <X className="h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground mb-4">
          Showing {filteredUseCases.length} use case{filteredUseCases.length !== 1 ? 's' : ''}
        </div>

        {/* Use Cases Grid */}
        <ErrorBoundary>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => (
                <LoadingCard key={i} lines={5} />
              ))}
            </div>
          ) : filteredUseCases.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No use cases found. Try adjusting your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUseCases.map((useCase) => (
                <UseCaseCard key={useCase.id} useCase={useCase} onTagClick={handleTagClick} />
              ))}
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}
