import { Suspense } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Code2, Database, Zap, CheckCircle2, Circle, ArrowRight } from 'lucide-react';

export default function RoadmapPage() {
  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <Brain className="mr-2 h-3 w-3" />
            AI-Powered Career Roadmap
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Your Path from C# to AI Engineering</h1>
          <p className="text-lg text-muted-foreground">
            Generate a personalized learning roadmap based on your current C# expertise
          </p>
        </div>

        <Card className="glass mb-8">
          <CardHeader>
            <h2 className="text-xl font-semibold">Tell us about your experience</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Years of C# Experience</label>
              <Input type="number" placeholder="e.g., 5" className="max-w-xs" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Familiar Technologies (comma-separated)</label>
              <Input placeholder="e.g., ASP.NET Core, Entity Framework, Azure" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Target AI Role</label>
              <select className="w-full max-w-xs px-3 py-2 rounded-md border border-input bg-background">
                <option>AI Engineer</option>
                <option>ML Engineer</option>
                <option>LLM Engineer</option>
                <option>AI Solutions Architect</option>
              </select>
            </div>
            <Button className="mt-4">
              Generate Roadmap <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue={0} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value={0}>Beginner</TabsTrigger>
            <TabsTrigger value={1}>Intermediate</TabsTrigger>
            <TabsTrigger value={2}>Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value={0} className="space-y-4 mt-6">
            <RoadmapPhase
              phase="Phase 1: Foundation"
              duration="2-3 months"
              items={[
                { title: 'Python Fundamentals for C# Devs', completed: true, csharpConcept: 'Similar to C# syntax' },
                { title: 'NumPy & Pandas Basics', completed: true, csharpConcept: 'Like LINQ for data' },
                { title: 'Jupyter Notebooks', completed: false, csharpConcept: 'Interactive C# notebooks' },
                { title: 'ML Fundamentals', completed: false, csharpConcept: 'Pattern recognition basics' },
              ]}
            />
            <RoadmapPhase
              phase="Phase 2: ML Basics"
              duration="3-4 months"
              items={[
                { title: 'Scikit-learn', completed: false, csharpConcept: 'ML.NET equivalent' },
                { title: 'Model Training & Evaluation', completed: false, csharpConcept: 'Unit testing for models' },
                { title: 'Feature Engineering', completed: false, csharpConcept: 'Data transformation pipelines' },
              ]}
            />
          </TabsContent>

          <TabsContent value={1} className="space-y-4 mt-6">
            <RoadmapPhase
              phase="Phase 3: Deep Learning"
              duration="4-5 months"
              items={[
                { title: 'PyTorch/TensorFlow', completed: false, csharpConcept: 'Neural network frameworks' },
                { title: 'CNNs & RNNs', completed: false, csharpConcept: 'Specialized architectures' },
                { title: 'Transfer Learning', completed: false, csharpConcept: 'Reusing pre-trained models' },
              ]}
            />
          </TabsContent>

          <TabsContent value={2} className="space-y-4 mt-6">
            <RoadmapPhase
              phase="Phase 4: LLMs & Production"
              duration="3-4 months"
              items={[
                { title: 'LangChain & Semantic Kernel', completed: false, csharpConcept: 'LLM orchestration in C#' },
                { title: 'Vector Databases', completed: false, csharpConcept: 'Like SQL but for embeddings' },
                { title: 'RAG Systems', completed: false, csharpConcept: 'Context-aware AI apps' },
                { title: 'Azure AI Services', completed: false, csharpConcept: 'Deploy with Azure Functions' },
              ]}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function RoadmapPhase({ phase, duration, items }: { 
  phase: string; 
  duration: string; 
  items: Array<{ title: string; completed: boolean; csharpConcept: string }> 
}) {
  return (
    <Card className="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{phase}</h3>
          <Badge variant="secondary">{duration}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              {item.completed ? (
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-muted-foreground">
                  C# Context: {item.csharpConcept}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
