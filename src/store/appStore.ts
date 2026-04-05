'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { JobFilter } from '@/types/job';
import type { InterviewCategory } from '@/types/interview';
import type { ProjectTopic } from '@/types/project';

interface AppState {
  // Job filters
  jobFilter: JobFilter;
  setJobFilter: (filter: Partial<JobFilter>) => void;

  // Interview
  selectedCategory: InterviewCategory | 'all';
  setSelectedCategory: (cat: InterviewCategory | 'all') => void;

  // Projects
  selectedTopic: ProjectTopic | 'all';
  setSelectedTopic: (topic: ProjectTopic | 'all') => void;

  // User prefs
  yearsExperience: number;
  setYearsExperience: (years: number) => void;
  
  // Hydration
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      jobFilter: {
        query: 'AI engineer',
        location: 'canada',
        remote: false,
        seniority: 'all',
        salaryMin: 0,
        sources: [],
      },
      setJobFilter: (filter) =>
        set((state) => ({ jobFilter: { ...state.jobFilter, ...filter } })),

      selectedCategory: 'all',
      setSelectedCategory: (cat) => set({ selectedCategory: cat }),

      selectedTopic: 'all',
      setSelectedTopic: (topic) => set({ selectedTopic: topic }),

      yearsExperience: 5,
      setYearsExperience: (years) => set({ yearsExperience: years }),
      
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    { 
      name: 'neuralpath-store',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
