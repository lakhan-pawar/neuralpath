import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ExternalLink, Search, Star, Clock, DollarSign } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <BookOpen className="mr-2 h-3 w-3" />
            Learning Resources
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Curated AI Learning Path</h1>
          <p className="text-lg text-muted-foreground">
            Resources specifically mapped to your C# background
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search resources by topic or C# concept..." 
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue={0} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value={0}>Courses</TabsTrigger>
            <TabsTrigger value={1}>Docs</TabsTrigger>
            <TabsTrigger value={2}>Tools</TabsTrigger>
            <TabsTrigger value={3}>Projects</TabsTrigger>
          </TabsList>

          <TabsContent value={0} className="space-y-4 mt-6">
            <ResourceCard
              title="Python for C# Developers"
              provider="Microsoft Learn"
              type="Free Course"
              duration="4 hours"
              csharpMapping="Direct syntax comparison"
              rating={4.8}
              url="#"
            />
            <ResourceCard
              title="Machine Learning with ML.NET"
              provider="Pluralsight"
              type="Free Trial"
              duration="6 hours"
              csharpMapping="Stay in C# ecosystem"
              rating={4.6}
              url="#"
            />
            <ResourceCard
              title="LangChain for .NET Developers"
              provider="YouTube"
              type="Free"
              duration="2 hours"
              csharpMapping="LLM orchestration in C#"
              rating={4.7}
              url="#"
            />
            <ResourceCard
              title="Semantic Kernel Deep Dive"
              provider="Microsoft"
              type="Free"
              duration="8 hours"
              csharpMapping="Native C# AI framework"
              rating={4.9}
              url="#"
            />
          </TabsContent>

          <TabsContent value={1} className="space-y-4 mt-6">
            <ResourceCard
              title="Semantic Kernel Documentation"
              provider="Microsoft"
              type="Documentation"
              duration="Reference"
              csharpMapping="Official C# AI SDK"
              rating={4.9}
              url="#"
            />
            <ResourceCard
              title="Azure OpenAI Service"
              provider="Azure"
              type="Documentation"
              duration="Reference"
              csharpMapping="Enterprise LLM deployment"
              rating={4.7}
              url="#"
            />
            <ResourceCard
              title="Vector Database Guide"
              provider="Pinecone"
              type="Documentation"
              duration="Reference"
              csharpMapping="Semantic search basics"
              rating={4.5}
              url="#"
            />
          </TabsContent>

          <TabsContent value={2} className="space-y-4 mt-6">
            <ToolCard
              name="Semantic Kernel"
              description="Microsoft's C# SDK for AI orchestration"
              category="LLM Framework"
              pricing="Free & Open Source"
              csharpNative
            />
            <ToolCard
              name="ML.NET"
              description="Machine learning framework for .NET"
              category="ML Framework"
              pricing="Free & Open Source"
              csharpNative
            />
            <ToolCard
              name="Azure AI Services"
              description="Cloud AI services with C# SDKs"
              category="Cloud Platform"
              pricing="Free tier available"
              csharpNative
            />
            <ToolCard
              name="LangChain.NET"
              description="Port of LangChain for C# developers"
              category="LLM Framework"
              pricing="Free & Open Source"
              csharpNative
            />
          </TabsContent>

          <TabsContent value={3} className="space-y-4 mt-6">
            <ProjectCard
              title="Build a RAG Chatbot with Semantic Kernel"
              difficulty="Intermediate"
              duration="4-6 hours"
              skills={['C#', 'Semantic Kernel', 'Azure OpenAI', 'Vector DB']}
              description="Create a context-aware chatbot using your C# skills"
            />
            <ProjectCard
              title="ML.NET Sentiment Analyzer"
              difficulty="Beginner"
              duration="2-3 hours"
              skills={['C#', 'ML.NET', 'ASP.NET Core']}
              description="Build and deploy a sentiment analysis API"
            />
            <ProjectCard
              title="AI Agent with Function Calling"
              difficulty="Advanced"
              duration="8-10 hours"
              skills={['C#', 'Semantic Kernel', 'Azure Functions']}
              description="Create an autonomous AI agent that can use tools"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ResourceCard({ title, provider, type, duration, csharpMapping, rating, url }: {
  title: string;
  provider: string;
  type: string;
  duration: string;
  csharpMapping: string;
  rating: number;
  url: string;
}) {
  return (
    <Card className="glass hover:border-primary/50 transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span>{provider}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {duration}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-primary text-primary" />
                {rating}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">{type}</Badge>
              <Badge variant="outline" className="border-primary/20 bg-primary/5">
                {csharpMapping}
              </Badge>
            </div>
          </div>
          <Button size="sm" variant="outline">
            View <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ToolCard({ name, description, category, pricing, csharpNative }: {
  name: string;
  description: string;
  category: string;
  pricing: string;
  csharpNative?: boolean;
}) {
  return (
    <Card className="glass hover:border-primary/50 transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{name}</h3>
              {csharpNative && (
                <Badge variant="default" className="bg-primary">C# Native</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <div className="flex items-center gap-4 text-sm">
              <Badge variant="secondary">{category}</Badge>
              <span className="flex items-center gap-1 text-muted-foreground">
                <DollarSign className="h-3 w-3" />
                {pricing}
              </span>
            </div>
          </div>
          <Button size="sm">Explore</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectCard({ title, difficulty, duration, skills, description }: {
  title: string;
  difficulty: string;
  duration: string;
  skills: string[];
  description: string;
}) {
  const difficultyColor = {
    Beginner: 'bg-green-500/10 text-green-500 border-green-500/20',
    Intermediate: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    Advanced: 'bg-red-500/10 text-red-500 border-red-500/20',
  }[difficulty];

  return (
    <Card className="glass hover:border-primary/50 transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className={difficultyColor}>{difficulty}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {duration}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <Button size="sm">Start Project</Button>
        </div>
      </CardContent>
    </Card>
  );
}
