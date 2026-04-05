'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Rocket, Search, Filter, X } from 'lucide-react';
import { LiveProjectCard } from '@/components/liveprojects/LiveProjectCard';
import { LoadingCard } from '@/components/shared/LoadingCard';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import type { AIImplementation } from '@/types/implementation';

const types = [
  'All',
  'RAG Application',
  'AI Agent',
  'Agentic Workflow',
  'Multimodal Agent',
  'Tool-Using Agent',
  'Multi-Agent System',
  'LLM Application',
  'Computer Vision',
  'Voice Agent'
];

const complexities = ['All', 'Simple', 'Intermediate', 'Advanced'];

export default function LiveProjectsPage() {
  const [projects, setProjects] = useState<AIImplementation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedComplexity, setSelectedComplexity] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (selectedType !== 'All') params.append('type', selectedType);
      if (selectedComplexity !== 'All') params.append('complexity', selectedComplexity);

      const res = await fetch(`/api/liveprojects?${params}`);
      const data = await res.json();
      setProjects(data.implementations || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProjects();
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
    setSelectedType('All');
    setSelectedComplexity('All');
    setSelectedTags([]);
    fetchProjects();
  };

  // Get all unique tags
  const allTags = Array.from(
    new Set(projects.flatMap(p => p.tags))
  ).sort();

  // Popular tags
  const tagCounts = projects.reduce((acc, p) => {
    p.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([tag]) => tag);

  // Filter by selected tags
  const filteredProjects = projects.filter(p => {
    if (selectedTags.length === 0) return true;
    return selectedTags.every(tag => p.tags.includes(tag));
  });

  return (
    <div className="container px-4 py-8 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <Rocket className="mr-2 h-3 w-3" /> Live AI Implementations
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Real AI Implementations in Production</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            20+ technical AI implementations: RAG apps, AI agents, agentic workflows, and multimodal systems used by developers and companies.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4 mb-6">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search implementations: Quivr, AutoGPT, CrewAI, LangGraph..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </form>

          {/* Filters */}
          <div className="glass p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-muted-foreground">Filters</span>
              </div>
              {(selectedType !== 'All' || selectedComplexity !== 'All' || selectedTags.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Clear all
                </button>
              )}
            </div>

            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Type:</span>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <Badge
                    key={type}
                    variant={selectedType === type ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => {
                      setSelectedType(type);
                      fetchProjects();
                    }}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Complexity:</span>
              <div className="flex flex-wrap gap-2">
                {complexities.map((complexity) => (
                  <Badge
                    key={complexity}
                    variant={selectedComplexity === complexity ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => {
                      setSelectedComplexity(complexity);
                      fetchProjects();
                    }}
                  >
                    {complexity}
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
          Showing {filteredProjects.length} implementation{filteredProjects.length !== 1 ? 's' : ''}
        </div>

        {/* Projects Grid */}
        <ErrorBoundary>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <LoadingCard key={i} lines={6} />
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No implementations found. Try adjusting your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((project) => (
                <LiveProjectCard key={project.id} project={project} onTagClick={handleTagClick} />
              ))}
            </div>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}
