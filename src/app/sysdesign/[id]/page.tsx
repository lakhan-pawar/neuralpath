'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2, Zap, Code, AlertTriangle, Layers, Target, PlayCircle, Brain, Sparkles } from 'lucide-react';
import { DiagramViewer } from '@/components/sysdesign/DiagramViewer';
import { SYSTEM_DESIGNS_PART1 } from '@/data/systemDesigns1';
import { SYSTEM_DESIGNS_PART2 } from '@/data/systemDesigns2';
import { SYSTEM_DESIGNS_PART3 } from '@/data/systemDesigns3';
import { HOW_IT_WORKS } from '@/data/howItWorksExplanations';

const ALL_DESIGNS = [...SYSTEM_DESIGNS_PART1, ...SYSTEM_DESIGNS_PART2, ...SYSTEM_DESIGNS_PART3];

export default function SystemDesignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const design = ALL_DESIGNS.find(d => d.id === id);
  const explanation = design ? HOW_IT_WORKS[design.id] : null;

  if (!design) {
    return (
      <div className="container px-4 py-12 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="outline" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Card className="glass">
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-lg text-muted-foreground">System design not found</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const complexityColor = {
    'Low': 'bg-green-500/10 text-green-500 border-green-500/30',
    'Medium': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    'High': 'bg-orange-500/10 text-orange-500 border-orange-500/30',
    'Very High': 'bg-red-500/10 text-red-500 border-red-500/30'
  };

  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to System Designs
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{design.name}</h1>
              <div className="flex items-center gap-3 text-lg text-muted-foreground">
                <Building2 className="h-5 w-5" />
                <span className="font-semibold">{design.company}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Badge variant="secondary" className="text-sm">
                {design.category}
              </Badge>
              <Badge variant="outline" className={`text-sm ${complexityColor[design.complexity]}`}>
                {design.complexity}
              </Badge>
            </div>
          </div>
          <p className="text-xl text-foreground leading-relaxed">{design.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* How It Works - Hardcoded */}
            <Card className="glass border-primary/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <PlayCircle className="h-6 w-6 text-primary" />
                    How It Works
                  </h2>
                  {explanation && (
                    <Button 
                      onClick={() => setShowExplanation(!showExplanation)}
                      size="sm"
                      variant="default"
                      className="gap-2"
                    >
                      <Brain className="h-4 w-4" />
                      {showExplanation ? 'Hide' : 'Show'} Explanation
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!showExplanation && (
                  <div className="text-center py-8">
                    <PlayCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-base text-muted-foreground mb-4">
                      Click "Show Explanation" to see a concise, interview-ready breakdown of how this system works
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Perfect for interview preparation - easy to remember and explain
                    </p>
                  </div>
                )}
                {showExplanation && explanation && (
                  <div className="prose prose-sm max-w-none">
                    <div className="text-base leading-relaxed whitespace-pre-wrap text-foreground">
                      {explanation}
                    </div>
                  </div>
                )}
                {showExplanation && !explanation && (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">
                      Explanation not available for this system yet.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Architecture Diagram */}
            <Card className="glass">
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Layers className="h-6 w-6 text-primary" />
                  System Architecture
                </h2>
              </CardHeader>
              <CardContent>
                <DiagramViewer chart={design.diagram} />
              </CardContent>
            </Card>

            {/* Components */}
            <Card className="glass">
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Layers className="h-6 w-6 text-primary" />
                  Key Components
                </h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {design.components.map((component, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-base">{component}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card className="glass">
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Code className="h-6 w-6 text-primary" />
                  Technologies & Tools
                </h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {design.keyTechnologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-base px-4 py-2">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Challenges */}
            <Card className="glass">
              <CardHeader>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
                  Technical Challenges
                </h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {design.challenges.map((challenge, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-orange-500/5 border border-orange-500/20">
                      <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                      <p className="text-base text-foreground">{challenge}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Scale */}
            <Card className="glass">
              <CardHeader>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Scale
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-base text-foreground leading-relaxed">{design.scale}</p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="glass bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Quick Stats
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Components</span>
                  <span className="text-2xl font-bold text-primary">{design.components.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Technologies</span>
                  <span className="text-2xl font-bold text-accent">{design.keyTechnologies.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Challenges</span>
                  <span className="text-2xl font-bold text-orange-500">{design.challenges.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Category Info */}
            <Card className="glass">
              <CardHeader>
                <h3 className="text-xl font-bold">Category</h3>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="text-base px-4 py-2">
                  {design.category}
                </Badge>
                <p className="text-sm text-muted-foreground mt-3">
                  This system belongs to the {design.category} category, representing real-world production systems at scale.
                </p>
              </CardContent>
            </Card>

            {/* Interview Tip */}
            <Card className="glass bg-gradient-to-br from-green-500/5 to-blue-500/5 border-green-500/20">
              <CardHeader>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-500" />
                  Interview Tip
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground leading-relaxed">
                  When explaining this system in an interview, start with the user journey, then dive into the architecture. 
                  Mention the scale ({design.scale}) and key challenges to show depth of understanding.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
