'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Wifi, MapPin, Database } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import type { JobSource } from '@/types/job';

interface JobFiltersProps {
  onSearch?: () => void;
  isSearching?: boolean;
}

export function JobFilters({ onSearch, isSearching }: JobFiltersProps) {
  const { jobFilter, setJobFilter } = useAppStore();

  const locations = [
    { value: 'all', label: 'All Locations', flag: '🌍' },
    { value: 'canada', label: 'Canada', flag: '🇨🇦' },
    { value: 'toronto', label: 'Toronto', flag: '🇨🇦' },
    { value: 'vancouver', label: 'Vancouver', flag: '🇨🇦' },
    { value: 'montreal', label: 'Montreal', flag: '🇨🇦' },
    { value: 'us', label: 'United States', flag: '🇺🇸' },
  ];

  const sources: { value: JobSource; label: string; color: string }[] = [
    { value: 'adzuna', label: 'Adzuna', color: 'bg-blue-500/10 text-blue-500 border-blue-500/30' },
    { value: 'indeed', label: 'Indeed', color: 'bg-orange-500/10 text-orange-500 border-orange-500/30' },
    { value: 'linkedin', label: 'LinkedIn', color: 'bg-blue-600/10 text-blue-600 border-blue-600/30' },
    { value: 'eluta', label: 'Eluta', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30' },
    { value: 'muse', label: 'The Muse', color: 'bg-purple-500/10 text-purple-500 border-purple-500/30' },
    { value: 'remotive', label: 'Remotive', color: 'bg-green-500/10 text-green-500 border-green-500/30' },
  ];

  const toggleSource = (source: JobSource) => {
    const currentSources = jobFilter.sources || [];
    const newSources = currentSources.includes(source)
      ? currentSources.filter(s => s !== source)
      : [...currentSources, source];
    setJobFilter({ sources: newSources });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Input with Button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={jobFilter.query}
            onChange={(e) => setJobFilter({ query: e.target.value })}
            onKeyPress={handleKeyPress}
            placeholder="AI engineer, ML engineer, LLM..."
            className="pl-10"
          />
        </div>
        {onSearch && (
          <Button 
            onClick={onSearch} 
            disabled={isSearching}
            className="gap-2 px-6"
          >
            <Search className="h-4 w-4" />
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        )}
      </div>

      {/* Location Filter */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-muted-foreground">Location</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {locations.map((loc) => (
            <button
              key={loc.value}
              onClick={() => setJobFilter({ location: loc.value })}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                jobFilter.location === loc.value
                  ? 'bg-primary/10 border-primary/30 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/30'
              }`}
            >
              <span>{loc.flag}</span> {loc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Job Source Filter */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Database className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-muted-foreground">Job Sources</span>
          {jobFilter.sources && jobFilter.sources.length > 0 && (
            <span className="text-xs text-muted-foreground">({jobFilter.sources.length} selected)</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {sources.map((source) => (
            <button
              key={source.value}
              onClick={() => toggleSource(source.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                jobFilter.sources?.includes(source.value)
                  ? source.color
                  : 'border-border text-muted-foreground hover:border-primary/30'
              }`}
            >
              <Database className="h-3 w-3" /> {source.label}
            </button>
          ))}
        </div>
      </div>

      {/* Other Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setJobFilter({ remote: !jobFilter.remote })}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
            jobFilter.remote
              ? 'bg-primary/10 border-primary/30 text-primary'
              : 'border-border text-muted-foreground hover:border-primary/30'
          }`}
        >
          <Wifi className="h-3 w-3" /> Remote only
        </button>
        {(['all', 'junior', 'mid', 'senior'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setJobFilter({ seniority: level })}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors capitalize ${
              jobFilter.seniority === level
                ? 'bg-primary/10 border-primary/30 text-primary'
                : 'border-border text-muted-foreground hover:border-primary/30'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}
