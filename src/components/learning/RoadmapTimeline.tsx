'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Lock } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

interface RoadmapItem {
  id: string;
  title: string;
  csharpContext: string;
  resources: string[];
}

interface Phase {
  name: string;
  duration: string;
  color: string;
  items: RoadmapItem[];
}

const PHASES: Phase[] = [
  {
    name: 'Phase 1 — Python Foundation',
    duration: '4–6 weeks',
    color: 'text-green-500',
    items: [
      { id: 'py-basics', title: 'Python Basics', csharpContext: 'Like C# without types — familiar syntax', resources: ['Microsoft Learn', 'Python.org'] },
      { id: 'numpy', title: 'NumPy & Pandas', csharpContext: 'LINQ for arrays and DataFrames', resources: ['Kaggle Learn'] },
      { id: 'jupyter', title: 'Jupyter Notebooks', csharpContext: 'Interactive C# notebooks (Polyglot)', resources: ['Jupyter.org'] },
    ],
  },
  {
    name: 'Phase 2 — ML Fundamentals',
    duration: '6–8 weeks',
    color: 'text-yellow-500',
    items: [
      { id: 'sklearn', title: 'Scikit-learn', csharpContext: 'ML.NET equivalent in Python', resources: ['Scikit-learn docs'] },
      { id: 'feature-eng', title: 'Feature Engineering', csharpContext: 'Data transformation pipelines', resources: ['Kaggle'] },
      { id: 'model-eval', title: 'Model Evaluation', csharpContext: 'Unit testing for ML models', resources: ['fast.ai'] },
    ],
  },
  {
    name: 'Phase 3 — Deep Learning',
    duration: '8–10 weeks',
    color: 'text-orange-500',
    items: [
      { id: 'pytorch', title: 'PyTorch Basics', csharpContext: 'Tensor ops like matrix math in C#', resources: ['PyTorch.org'] },
      { id: 'transformers', title: 'Transformers & HuggingFace', csharpContext: 'Pre-built model libraries', resources: ['HuggingFace'] },
      { id: 'fine-tuning', title: 'Fine-tuning LLMs', csharpContext: 'Customizing pre-built components', resources: ['HuggingFace PEFT'] },
    ],
  },
  {
    name: 'Phase 4 — AI Engineering',
    duration: '6–8 weeks',
    color: 'text-primary',
    items: [
      { id: 'semantic-kernel', title: 'Semantic Kernel', csharpContext: 'Native C# LLM orchestration', resources: ['Microsoft Learn'] },
      { id: 'vector-db', title: 'Vector Databases', csharpContext: 'Semantic SQL for embeddings', resources: ['Pinecone', 'Weaviate'] },
      { id: 'rag', title: 'RAG Systems', csharpContext: 'Context-aware AI with your data', resources: ['LangChain docs'] },
      { id: 'agents', title: 'AI Agents', csharpContext: 'Autonomous Azure Functions', resources: ['AutoGen', 'SK Agents'] },
    ],
  },
];

export function RoadmapTimeline() {
  const { isComplete, markComplete, markIncomplete } = useProgress();

  return (
    <div className="space-y-6">
      {PHASES.map((phase, phaseIdx) => {
        const phaseComplete = phase.items.every((i) => isComplete(i.id));
        const prevPhaseComplete = phaseIdx === 0 || PHASES[phaseIdx - 1].items.every((i) => isComplete(i.id));

        return (
          <div key={phase.name} className={!prevPhaseComplete && phaseIdx > 0 ? 'opacity-50' : ''}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`text-sm font-bold ${phase.color}`}>{phase.name}</div>
              <Badge variant="secondary" className="text-xs">{phase.duration}</Badge>
              {phaseComplete && <Badge className="bg-green-500/20 text-green-500 border-green-500/30 text-xs">Complete</Badge>}
            </div>
            <div className="space-y-2 pl-4 border-l-2 border-border/50">
              {phase.items.map((item) => {
                const done = isComplete(item.id);
                const locked = !prevPhaseComplete && phaseIdx > 0;
                return (
                  <Card key={item.id} className={`glass transition-colors ${done ? 'border-green-500/30' : ''}`}>
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start gap-3">
                        <button
                          disabled={locked}
                          onClick={() => done ? markIncomplete(item.id) : markComplete(item.id)}
                          className="mt-0.5 shrink-0 disabled:cursor-not-allowed"
                        >
                          {locked ? (
                            <Lock className="h-5 w-5 text-muted-foreground" />
                          ) : done ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium text-sm ${done ? 'line-through text-muted-foreground' : ''}`}>{item.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{item.csharpContext}</div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.resources.map((r) => (
                              <Badge key={r} variant="outline" className="text-xs border-primary/20">{r}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
