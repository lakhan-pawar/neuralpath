'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Newspaper, Search, Filter, X, ExternalLink, Clock, User, Bookmark
} from 'lucide-react';
import { MOCK_NEWS, NEWS_CATEGORIES, NEWS_SOURCES } from '@/data/newsFeeds';

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [bookmarkedNews, setBookmarkedNews] = useState<Set<string>>(new Set());

  const filteredNews = MOCK_NEWS.filter(news => {
    const matchesSearch = searchQuery === '' || 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.category.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || news.category.includes(selectedCategory);
    const matchesSource = selectedSource === 'All' || news.source === selectedSource;
    
    return matchesSearch && matchesCategory && matchesSource;
  });

  const toggleBookmark = (id: string) => {
    const newBookmarks = new Set(bookmarkedNews);
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id);
    } else {
      newBookmarks.add(id);
    }
    setBookmarkedNews(newBookmarks);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSource('All');
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedSource !== 'All' || searchQuery !== '';

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="container px-4 py-8 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <Newspaper className="mr-2 h-3 w-3" /> AI/ML News
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Daily AI/ML News Digest</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Latest news, research, and updates from the AI/ML community
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{filteredNews.length}</p>
              <p className="text-xs text-muted-foreground">Articles</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{bookmarkedNews.size}</p>
              <p className="text-xs text-muted-foreground">Bookmarked</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{NEWS_SOURCES.length}</p>
              <p className="text-xs text-muted-foreground">Sources</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{NEWS_CATEGORIES.length}</p>
              <p className="text-xs text-muted-foreground">Topics</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news, topics, or keywords..."
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
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Clear all
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Category:</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedCategory === 'All' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedCategory('All')}
                >
                  All
                </Badge>
                {NEWS_CATEGORIES.slice(0, 15).map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Source Filter */}
            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Source:</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedSource === 'All' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedSource('All')}
                >
                  All
                </Badge>
                {NEWS_SOURCES.map((source) => (
                  <Badge
                    key={source}
                    variant={selectedSource === source ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => setSelectedSource(source)}
                  >
                    {source}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* News List */}
        <div className="space-y-4">
          {filteredNews.map((news) => {
            const isBookmarked = bookmarkedNews.has(news.id);
            
            return (
              <Card key={news.id} className="glass hover:border-primary/40 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {news.source}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {getTimeAgo(news.pubDate)}
                        </span>
                        {news.author && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            {news.author}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold mb-2 hover:text-primary transition-colors">
                        <a href={news.link} target="_blank" rel="noopener noreferrer">
                          {news.title}
                        </a>
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        {news.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {news.category.map((cat) => (
                          <Badge key={cat} variant="outline" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <button
                        onClick={() => toggleBookmark(news.id)}
                        className={`p-2 rounded-lg border transition-colors ${
                          isBookmarked
                            ? 'bg-primary/10 border-primary text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                      <a
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-border hover:border-primary/50 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">
              No news found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
