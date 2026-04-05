import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, Zap, Tag } from 'lucide-react';
import type { AIUseCase } from '@/types/usecase';

interface UseCaseCardProps {
  useCase: AIUseCase;
  onTagClick?: (tag: string) => void;
}

export function UseCaseCard({ useCase, onTagClick }: UseCaseCardProps) {
  const difficultyColors = {
    'Beginner': 'bg-green-500/10 text-green-500 border-green-500/30',
    'Intermediate': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    'Advanced': 'bg-red-500/10 text-red-500 border-red-500/30'
  };

  return (
    <Card className="glass hover:border-primary/40 transition-all h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-base leading-tight flex-1">{useCase.title}</h3>
          <Badge variant="outline" className={`text-xs shrink-0 ${difficultyColors[useCase.difficulty]}`}>
            {useCase.difficulty}
          </Badge>
        </div>
        <Badge variant="secondary" className="text-xs w-fit">
          {useCase.category}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-3 flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {useCase.description}
        </p>

        {/* Real World Example */}
        {useCase.realWorldExample && (
          <div className="p-2 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-xs text-primary font-medium">
              💡 {useCase.realWorldExample}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {useCase.estimatedTime && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{useCase.estimatedTime}</span>
            </div>
          )}
          {useCase.potentialSavings && (
            <div className="flex items-center gap-1 text-green-600">
              <DollarSign className="h-3 w-3" />
              <span className="font-medium">{useCase.potentialSavings}</span>
            </div>
          )}
        </div>

        {/* AI Models */}
        <div>
          <div className="flex items-center gap-1 mb-1.5">
            <Zap className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground">AI Models:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {useCase.aiModels.slice(0, 3).map((model) => (
              <Badge key={model} variant="outline" className="text-xs border-primary/20 bg-primary/5">
                {model}
              </Badge>
            ))}
            {useCase.aiModels.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{useCase.aiModels.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-auto">
          <div className="flex items-center gap-1 mb-1.5">
            <Tag className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-semibold text-muted-foreground">Tags:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {useCase.tags.map((tag) => (
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
        </div>
      </CardContent>
    </Card>
  );
}
