'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Wifi, MapPin, Database, DollarSign } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import type { JobSource } from '@/types/job';

interface JobFiltersProps {
  onSearch?: () => void;
  isSearching?: boolean;
}

export function JobFilters({ onSearch, isSearching }: JobFiltersProps) {
  const { jobFilter, setJobFilter } = useAppStore();

  const locations = [
    { value: 'all', label: 'All', flag: '🌍' },
    { value: 'canada', label: 'Canada', flag: '🇨🇦' },
    { value: 'toronto', label: 'Toronto', flag: '🇨🇦' },
    { value: 'vancouver', label: 'Vancouver', flag: '🇨🇦' },
    { value: 'us', label: 'USA', flag: '🇺🇸' },
  ];

  const sources: { value: JobSource; label: string }[] = [
    { value: 'adzuna', label: 'Adzuna' },
    { value: 'indeed', label: 'Indeed' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'eluta', label: 'Eluta' },
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
    <div className="glass p-4 md:p-6 rounded-xl space-y-4">
      {/* Main Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={jobFilter.query}
            onChange={(e) => setJobFilter({ query: e.target.value })}
            onKeyPress={handleKeyPress}
            placeholder="Search: AI Engineer, ML Engineer, Data Scientist..."
            className="pl-11 h-12 text-base"
          />
        </div>
        {onSearch && (
          <Button 
            onClick={onSearch} 
            disabled={isSearching}
            size="lg"
            className="gap-2 h-12 px-8 whitespace-nowrap"
          >
            <Search className="h-5 w-5" />
            {isSearching ? 'Searching...' : 'Search Jobs'}
          </Button>
        )}
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
            <MapPin className="h-3.5 w-3.5" />
            Location
          </label>
          <div className="flex flex-wrap gap-1.5">
            {locations.map((loc) => (
              <button
                key={loc.value}
                onClick={() => setJobFilter({ location: loc.value })}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                  jobFilter.location === loc.value
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'border-border/50 text-muted-foreground hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                {loc.flag} {loc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Remote & Seniority */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
            <Wifi className="h-3.5 w-3.5" />
            Work Type
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setJobFilter({ remote: !jobFilter.remote })}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                jobFilter.remote
                  ? 'bg-green-500 text-white border-green-500 shadow-sm'
                  : 'border-border/50 text-muted-foreground hover:border-green-500/50 hover:bg-green-500/5'
              }`}
            >
              Remote
            </button>
            <button
              onClick={() => setJobFilter({ remote: false })}
              className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                !jobFilter.remote
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'border-border/50 text-muted-foreground hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              On-site
            </button>
          </div>
        </div>

        {/* Seniority Level */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
            <DollarSign className="h-3.5 w-3.5" />
            Level
          </label>
          <div className="flex flex-wrap gap-1.5">
            {(['all', 'junior', 'mid', 'senior'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setJobFilter({ seniority: level })}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all capitalize ${
                  jobFilter.seniority === level
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'border-border/50 text-muted-foreground hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Job Sources */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
            <Database className="h-3.5 w-3.5" />
            Sources {jobFilter.sources && jobFilter.sources.length > 0 && `(${jobFilter.sources.length})`}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {sources.map((source) => (
              <button
                key={source.value}
                onClick={() => toggleSource(source.value)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                  jobFilter.sources?.includes(source.value)
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'border-border/50 text-muted-foreground hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                {source.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
