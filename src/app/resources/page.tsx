'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, Search, Filter, X, ExternalLink, Star, 
  Clock, DollarSign, User, Calendar, CheckCircle2, PlayCircle
} from 'lucide-react';
import { RESOURCES, RESOURCE_TYPES, RESOURCE_LEVELS, RESOURCE_TOPICS } from '@/data/resources';
import type { ResourceType, ResourceLevel } from '@/types/resource';

const TYPE_ICONS = {
  'Book': BookOpen,
  'Course': PlayCircle,
  'Video': PlayCircle,
  'Podcast': PlayCircle,
  'Paper': BookOpen,
  'Blog': BookOpen,
  'Tool': BookOpen,
};

const LEVEL_COLORS = {
  'Beginner': 'bg-green-500/10 text-green-500 border-green-500/30',
  'Intermediate': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  'Advanced': 'bg-red-500/10 text-red-500 border-red-500/30',
  'All Levels': 'bg-blue-500/10 text-blue-500 border-blue-500/30',
};

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [showPaidOnly, setShowPaidOnly] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [completedResources, setCompletedResources] = useState<Set<string>>(new Set());
  const [inProgressResources, setInProgressResources] = useState<Set<string>>(new Set());

  const filteredResources = RESOURCES.filter(r => {
    const matchesSearch = searchQuery === '' || 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'All' || r.type === selectedType;
    const matchesLevel = selectedLevel === 'All' || r.level === selectedLevel;
    const matchesTopic = selectedTopic === 'All' || r.topics.includes(selectedTopic);
    const matchesPaid = !showPaidOnly || r.isPaid;
    const matchesFree = !showFreeOnly || !r.isPaid;
    
    return matchesSearch && matchesType && matchesLevel && matchesTopic && matchesPaid && matchesFree;
  }).sort((a, b) => b.rating - a.rating);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedLevel('All');
    setSelectedTopic('All');
    setShowPaidOnly(false);
    setShowFreeOnly(false);
  };

  const toggleCompleted = (id: string) => {
    const newCompleted = new Set(completedResources);
    const newInProgress = new Set(inProgressResources);
    
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
      newInProgress.delete(id);
    }
    
    setCompletedResources(newCompleted);
    setInProgressResources(newInProgress);
  };

  const toggleInProgress = (id: string) => {
    const newInProgress = new Set(inProgressResources);
    const newCompleted = new Set(completedResources);
    
    if (newInProgress.has(id)) {
      newInProgress.delete(id);
    } else {
      newInProgress.add(id);
      newCompleted.delete(id);
    }
    
    setInProgressResources(newInProgress);
    setCompletedResources(newCompleted);
  };

  const hasActiveFilters = selectedType !== 'All' || selectedLevel !== 'All' || 
                          selectedTopic !== 'All' || showPaidOnly || showFreeOnly || searchQuery !== '';

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'
            }`}
          />
        ))}
        <span className="text-sm font-semibold ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="container px-4 py-8 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <BookOpen className="mr-2 h-3 w-3" /> Learning Resources
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Resource Library</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Curated collection of {RESOURCES.length}+ books, courses, videos, and tools for AI/ML learning
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{filteredResources.length}</p>
              <p className="text-xs text-muted-foreground">Resources</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{completedResources.size}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{inProgressResources.size}</p>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{RESOURCES.filter(r => !r.isPaid).length}</p>
              <p className="text-xs text-muted-foreground">Free</p>
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
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
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
                {RESOURCE_TYPES.map((type) => (
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

            {/* Level Filter */}
            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Level:</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedLevel === 'All' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedLevel('All')}
                >
                  All
                </Badge>
                {RESOURCE_LEVELS.map((level) => (
                  <Badge
                    key={level}
                    variant="outline"
                    className={`cursor-pointer text-xs ${selectedLevel === level ? LEVEL_COLORS[level as ResourceLevel] : ''}`}
                    onClick={() => setSelectedLevel(level)}
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
            const isCompleted = completedResources.has(resource.id);
            const isInProgress = inProgressResources.has(resource.id);
            
            return (
              <Card key={resource.id} className="glass">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-5 w-5 text-primary" />
                        <Badge variant="outline" className="text-xs">
                          {resource.type}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${LEVEL_COLORS[resource.level]}`}>
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
                    {renderStars(resource.rating)}
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
                    <Button
                      onClick={() => toggleInProgress(resource.id)}
                      variant={isInProgress ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                    >
                      {isInProgress ? 'In Progress' : 'Start'}
                    </Button>
                    <Button
                      onClick={() => toggleCompleted(resource.id)}
                      variant={isCompleted ? 'default' : 'outline'}
                      size="sm"
                      className="gap-1"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {isCompleted ? 'Done' : 'Mark Done'}
                    </Button>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <ExternalLink className="h-4 w-4" />
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
      </div>
    </div>
  );
}
