'use client';

import { useState, useEffect } from 'react';
import { SocialPostCard } from './SocialPostCard';
import { LoadingCard } from '@/components/shared/LoadingCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import type { SocialPost, SocialPlatform } from '@/types/social';

export function SocialFeed() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<SocialPlatform | 'all'>('all');
  const [sortBy, setSortBy] = useState<'score' | 'recent' | 'comments'>('score');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (query?: string) => {
    setLoading(true);
    try {
      const url = query 
        ? `/api/social?q=${encodeURIComponent(query)}`
        : '/api/social';
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Failed to fetch social posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts(searchQuery);
  };

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery('');
    setPlatformFilter('all');
    fetchPosts();
  };

  // Get all unique tags from posts
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).sort();

  // Popular tags (most common)
  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([tag]) => tag);

  const filteredPosts = posts
    .filter(post => {
      // Platform filter
      if (platformFilter !== 'all' && post.platform !== platformFilter) return false;
      
      // Tag filter
      if (selectedTags.length > 0) {
        const hasAllTags = selectedTags.every(tag => 
          post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
        );
        if (!hasAllTags) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'comments':
          return b.numComments - a.numComments;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search discussions about Claude, Gemini, OpenAI, Hugging Face..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </form>

        {/* Popular Tags */}
        {!loading && popularTags.length > 0 && (
          <div className="glass p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-muted-foreground">Filter by Topic</span>
              {selectedTags.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="ml-auto text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag} ({tagCounts[tag]})
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Platform:</span>
          </div>
          <div className="flex gap-2">
            <Badge
              variant={platformFilter === 'all' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setPlatformFilter('all')}
            >
              All
            </Badge>
            <Badge
              variant={platformFilter === 'reddit' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setPlatformFilter('reddit')}
            >
              Reddit
            </Badge>
            <Badge
              variant={platformFilter === 'hackernews' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setPlatformFilter('hackernews')}
            >
              Hacker News
            </Badge>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm bg-background border border-border rounded-md px-2 py-1"
            >
              <option value="score">Top Rated</option>
              <option value="recent">Most Recent</option>
              <option value="comments">Most Discussed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {selectedTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
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

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredPosts.length} discussion{filteredPosts.length !== 1 ? 's' : ''}
        {selectedTags.length > 0 && ` with ${selectedTags.join(', ')}`}
      </div>

      {/* Posts - Two Column Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No discussions found. Try a different search term or clear filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredPosts.map((post) => (
            <SocialPostCard key={post.id} post={post} onTagClick={handleTagClick} />
          ))}
        </div>
      )}
    </div>
  );
}
