import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SkillsPage() {
  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5">
            <Search className="mr-2 h-3 w-3" />
            Skill Gap Analysis
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Analyze Your Skill Gap</h1>
          <p className="text-lg text-muted-foreground">
            Compare your current C# skills against AI Engineering requirements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="glass">
            <CardHeader>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Your C# Strengths
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <SkillItem skill="Object-Oriented Programming" level={90} transferable />
                <SkillItem skill="LINQ & Data Manipulation" level={85} transferable />
                <SkillItem skill="Async/Await Patterns" level={80} transferable />
                <SkillItem skill="Dependency Injection" level={75} transferable />
                <SkillItem skill="Unit Testing" level={70} transferable />
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-accent" />
                Skills to Develop
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <SkillItem skill="Python Programming" level={30} gap />
                <SkillItem skill="Machine Learning Basics" level={20} gap />
                <SkillItem skill="Neural Networks" level={10} gap />
                <SkillItem skill="Vector Databases" level={15} gap />
                <SkillItem skill="LLM Fine-tuning" level={5} gap />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass mb-8">
          <CardHeader>
            <h2 className="text-xl font-semibold">Skill Translation Map</h2>
            <p className="text-sm text-muted-foreground">How your C# knowledge maps to AI Engineering</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <SkillMapping
                csharpSkill="LINQ Queries"
                aiSkill="Pandas DataFrames"
                similarity={85}
                example="df.filter() is like .Where()"
              />
              <SkillMapping
                csharpSkill="Entity Framework"
                aiSkill="Vector Databases (Pinecone)"
                similarity={60}
                example="Semantic search vs SQL queries"
              />
              <SkillMapping
                csharpSkill="Dependency Injection"
                aiSkill="LangChain Components"
                similarity={70}
                example="Chain composition patterns"
              />
              <SkillMapping
                csharpSkill="Async/Await"
                aiSkill="Async LLM Calls"
                similarity={90}
                example="Nearly identical patterns"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <TrendingUp className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Your Learning Velocity</h3>
                <p className="text-muted-foreground mb-4">
                  Based on your C# experience, you can leverage 60% of your existing knowledge. 
                  Estimated time to AI Engineer role: <span className="font-bold text-primary">8-12 months</span>
                </p>
                <Button>Get Personalized Plan</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SkillItem({ skill, level, transferable, gap }: { 
  skill: string; 
  level: number; 
  transferable?: boolean;
  gap?: boolean;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{skill}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full ${transferable ? 'bg-primary' : 'bg-accent'}`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

function SkillMapping({ csharpSkill, aiSkill, similarity, example }: {
  csharpSkill: string;
  aiSkill: string;
  similarity: number;
  example: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card/30">
      <div className="flex-1">
        <div className="font-medium text-sm mb-1">{csharpSkill}</div>
        <div className="text-xs text-muted-foreground">{example}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm font-semibold text-primary">{similarity}%</div>
        <div className="h-8 w-px bg-border" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm text-accent">{aiSkill}</div>
      </div>
    </div>
  );
}
