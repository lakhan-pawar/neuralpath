'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Building2, Zap, ArrowRight } from 'lucide-react';
import { useGemini } from '@/hooks/useGemini';
import Link from 'next/link';

interface DesignPattern {
  id?: string;
  name: string;
  category: string;
  description: string;
  components: string[];
  csharpAnalogy: string;
  diagram?: string;
  // New fields from system designs
  company?: string;
  scale?: string;
  keyTechnologies?: string[];
  challenges?: string[];
  complexity?: string;
}

export function DesignCard({ pattern }: { pattern: DesignPattern }) {
  const { response, loading, ask } = useGemini();

  const askGemini = () => {
    const prompt = pattern.company 
      ? `Explain ${pattern.company}'s "${pattern.name}" system in depth. Cover: architecture, scalability strategies, key technologies (${pattern.keyTechnologies?.join(', ')}), challenges (${pattern.challenges?.join(', ')}), and how they handle ${pattern.scale}. Provide concrete implementation details and best practices.`
      : `Explain the "${pattern.name}" AI system design pattern in depth. Cover: when to use it, key tradeoffs, failure modes, and a concrete implementation example. Relate to C# patterns where possible.`;
    
    ask(prompt, 'You are a Staff AI Engineer explaining system design patterns to an experienced C# developer. Be detailed and technical.');
  };

  const complexityColor = {
    'Low': 'bg-green-500/10 text-green-500 border-green-500/30',
    'Medium': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    'High': 'bg-orange-500/10 text-orange-500 border-orange-500/30',
    'Very High': 'bg-red-500/10 text-red-500 border-red-500/30'
  };

  return (
    <Card className="glass hover:border-primary/40 transition-all hover:shadow-large">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{pattern.name}</h3>
            {pattern.company && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">{pattern.company}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 items-end">
            <Badge variant="secondary" className="text-xs shrink-0">{pattern.category}</Badge>
            {pattern.complexity && (
              <Badge variant="outline" className={`text-xs shrink-0 ${complexityColor[pattern.complexity as keyof typeof complexityColor]}`}>
                {pattern.complexity}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground leading-relaxed">{pattern.description}</p>

        {/* Scale Info */}
        {pattern.scale && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <Zap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-primary mb-1">Scale</p>
              <p className="text-sm text-foreground">{pattern.scale}</p>
            </div>
          </div>
        )}

        {/* Components Preview */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2">Key Components</p>
          <div className="flex flex-wrap gap-1.5">
            {pattern.components.slice(0, 4).map((c) => (
              <Badge key={c} variant="outline" className="text-xs border-primary/20 bg-primary/5">
                {c}
              </Badge>
            ))}
            {pattern.components.length > 4 && (
              <Badge variant="outline" className="text-xs border-primary/20 bg-primary/5">
                +{pattern.components.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {pattern.id && (
            <Link href={`/sysdesign/${pattern.id}`} className="flex-1">
              <Button 
                size="sm" 
                variant="outline" 
                className="gap-2 text-xs w-full"
              >
                More Details
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          )}
          <Button 
            size="sm" 
            variant="default" 
            onClick={askGemini} 
            disabled={loading} 
            className="gap-2 text-xs flex-1"
          >
            <Brain className="h-3 w-3" />
            {loading ? 'Asking...' : 'Ask AI'}
          </Button>
        </div>

        {/* AI Response */}
        {response && (
          <div className="text-sm leading-relaxed whitespace-pre-wrap p-4 rounded-lg bg-primary/5 border border-primary/10 max-h-96 overflow-y-auto">
            {response}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
