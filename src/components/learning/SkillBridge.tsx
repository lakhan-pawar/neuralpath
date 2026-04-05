import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

const MAPPINGS = [
  { csharp: 'LINQ', ai: 'Pandas / NumPy', similarity: 90, note: 'Same data transformation mindset' },
  { csharp: 'Entity Framework', ai: 'Vector DBs (Pinecone, Weaviate)', similarity: 60, note: 'ORM → semantic search' },
  { csharp: 'Dependency Injection', ai: 'LangChain / SK Components', similarity: 75, note: 'Chain composition patterns' },
  { csharp: 'Async / Await', ai: 'Async LLM Calls', similarity: 95, note: 'Nearly identical syntax' },
  { csharp: 'IEnumerable / Streams', ai: 'Generator / AsyncGenerator', similarity: 85, note: 'Lazy evaluation concept' },
  { csharp: 'Middleware (ASP.NET)', ai: 'LLM Chains / Agents', similarity: 70, note: 'Pipeline processing' },
  { csharp: 'Unit Testing (xUnit)', ai: 'Model Evaluation / Evals', similarity: 65, note: 'Assertion-based validation' },
  { csharp: 'Azure Functions', ai: 'AI Agent Tools', similarity: 80, note: 'Serverless function calling' },
];

export function SkillBridge() {
  return (
    <Card className="glass">
      <CardHeader>
        <h2 className="text-xl font-semibold">C# → AI Skill Bridge</h2>
        <p className="text-sm text-muted-foreground">Your existing knowledge mapped to AI equivalents</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {MAPPINGS.map((m) => (
          <div key={m.csharp} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-card/30">
            <div className="w-36 shrink-0">
              <div className="text-sm font-medium">{m.csharp}</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="text-xs font-bold text-primary w-8 text-right">{m.similarity}%</div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-accent truncate">{m.ai}</div>
              <div className="text-xs text-muted-foreground">{m.note}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
