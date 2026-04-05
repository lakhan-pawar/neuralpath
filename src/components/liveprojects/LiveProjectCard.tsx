import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Code, Star, Zap, Database, Layers } from 'lucide-react';
import type { AIImplementation } from '@/types/implementation';

interface LiveProjectCardProps {
  project: AIImplementation;
  onTagClick?: (tag: string) => void;
}

export function LiveProjectCard({ project, onTagClick }: LiveProjectCardProps) {
  const complexityColors = {
    'Simple': 'bg-green-500/10 text-green-500 border-green-500/30',
    'Intermediate': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    'Advanced': 'bg-red-500/10 text-red-500 border-red-500/30'
  };

  return (
    <Card className="glass hover:border-primary/40 transition-all h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{project.name}</h3>
            <p className="text-sm text-muted-foreground">{project.organization}</p>
          </div>
          <div className="flex flex-col gap-1 items-end">
            {project.stars && (
              <Badge variant="outline" className="text-xs border-yellow-500/30 text-yellow-500 gap-1">
                <Star className="h-3 w-3 fill-current" /> {project.stars >= 1000 ? `${(project.stars / 1000).toFixed(0)}K` : project.stars}
              </Badge>
            )}
            <Badge variant="outline" className={`text-xs ${complexityColors[project.complexity]}`}>
              {project.complexity}
            </Badge>
          </div>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            {project.type}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {project.language}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Use Case */}
        <div className="p-2 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-xs text-muted-foreground mb-0.5">Use Case:</p>
          <p className="text-xs text-foreground font-medium">{project.useCase}</p>
        </div>

        {/* Architecture */}
        <div className="p-2 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center gap-1 mb-1">
            <Layers className="h-3 w-3 text-muted-foreground" />
            <p className="text-xs font-semibold text-muted-foreground">Architecture:</p>
          </div>
          <p className="text-xs text-foreground leading-relaxed line-clamp-2">
            {project.architecture}
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <div className="flex items-center gap-1 mb-1.5">
            <Zap className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground">Stack:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs border-primary/20 bg-primary/5">
                {tech}
              </Badge>
            ))}
            {project.vectorDB && (
              <Badge variant="outline" className="text-xs border-purple-500/20 bg-purple-500/5 text-purple-500">
                <Database className="h-3 w-3 mr-0.5" /> {project.vectorDB}
              </Badge>
            )}
          </div>
        </div>

        {/* AI Models */}
        <div>
          <div className="flex items-center gap-1 mb-1.5">
            <Zap className="h-3 w-3 text-orange-500" />
            <span className="text-xs font-semibold text-orange-500">AI Models:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {project.aiModels.slice(0, 3).map((model) => (
              <Badge key={model} variant="secondary" className="text-xs bg-orange-500/10 text-orange-500">
                {model}
              </Badge>
            ))}
            {project.aiModels.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{project.aiModels.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-1 mb-3">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  if (onTagClick) onTagClick(tag);
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button size="sm" variant="default" className="w-full text-xs gap-1">
                  <Code className="h-3 w-3" /> GitHub
                </Button>
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button size="sm" variant="outline" className="w-full text-xs gap-1">
                  <ExternalLink className="h-3 w-3" /> Demo
                </Button>
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
