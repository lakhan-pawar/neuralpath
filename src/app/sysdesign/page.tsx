import type { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { Network } from 'lucide-react';
import { DesignCard } from '@/components/sysdesign/DesignCard';
import { CloudComparison } from '@/components/sysdesign/CloudComparison';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { SYSTEM_DESIGNS_PART1 } from '@/data/systemDesigns1';
import { SYSTEM_DESIGNS_PART2 } from '@/data/systemDesigns2';
import { SYSTEM_DESIGNS_PART3 } from '@/data/systemDesigns3';

export const metadata: Metadata = {
  title: 'System Design Hub | NeuralPath',
  description: 'AI architecture patterns, cloud comparisons, and interactive design Q&A.',
};

// Combine all system designs (200+ total)
const ALL_DESIGNS = [...SYSTEM_DESIGNS_PART1, ...SYSTEM_DESIGNS_PART2, ...SYSTEM_DESIGNS_PART3];

export default function SysDesignPage() {
  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <Network className="mr-2 h-3 w-3" /> Module 6
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">System Design Hub</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-4">
            200+ real-world system designs from tech giants
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Google</Badge>
            <Badge variant="secondary">Microsoft</Badge>
            <Badge variant="secondary">Amazon</Badge>
            <Badge variant="secondary">Meta</Badge>
            <Badge variant="secondary">Netflix</Badge>
            <Badge variant="secondary">Anthropic</Badge>
            <Badge variant="secondary">OpenAI</Badge>
            <Badge variant="secondary">Oracle</Badge>
            <Badge variant="secondary">+50 more companies</Badge>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ALL_DESIGNS.map((design) => (
              <ErrorBoundary key={design.id}>
                <DesignCard pattern={{
                  id: design.id,
                  name: design.name,
                  category: design.category,
                  description: design.description,
                  components: design.components,
                  csharpAnalogy: `${design.company} - ${design.complexity} complexity. Scale: ${design.scale}`,
                  diagram: design.diagram,
                  company: design.company,
                  scale: design.scale,
                  keyTechnologies: design.keyTechnologies,
                  challenges: design.challenges,
                  complexity: design.complexity
                }} />
              </ErrorBoundary>
            ))}
          </div>
          <CloudComparison />
        </div>
      </div>
    </div>
  );
}
