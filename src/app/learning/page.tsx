'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BookOpen, ArrowRight, Loader2 } from 'lucide-react';
import { RoadmapTimeline } from '@/components/learning/RoadmapTimeline';
import { WeeklyPlan } from '@/components/learning/WeeklyPlan';
import { SkillBridge } from '@/components/learning/SkillBridge';
import { ProgressTracker } from '@/components/learning/ProgressTracker';
import { GeminiChat } from '@/components/shared/GeminiChat';
import { useGemini } from '@/hooks/useGemini';

const SPECIALIZATIONS = ['ASP.NET Core', 'WPF', 'Blazor', 'Azure', 'Microservices', 'Game Dev', 'WinForms', 'gRPC', 'Entity Framework', 'SignalR'];
const TARGET_ROLES = ['AI Engineer', 'ML Engineer', 'MLOps Engineer', 'AI Solutions Architect', 'AI Product Manager'];
const TIMELINES = ['6 months', '9 months', '12 months', '18 months'];

export default function LearningPage() {
  const [specs, setSpecs] = useState<string[]>([]);
  const [hours, setHours] = useState(10);
  const [role, setRole] = useState(TARGET_ROLES[0]);
  const [timeline, setTimeline] = useState(TIMELINES[2]);
  const [generated, setGenerated] = useState(false);
  const { response, loading, ask } = useGemini();

  const toggleSpec = (s: string) =>
    setSpecs((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const generate = () => {
    setGenerated(true);
    ask(
      `Generate a ${timeline} learning roadmap for a C# developer with 15 years experience in ${specs.join(', ') || 'general .NET'}. They have ${hours} hours/week available. Target role: ${role}. Provide a structured week-by-week plan covering Python foundations, ML basics, LLMs/RAG, MLOps, and production AI. Highlight how their C# skills transfer at each stage.`,
      'You are an expert AI Engineering mentor specializing in helping experienced C# developers transition to AI Engineering. Be specific, practical, and reference C# concepts the user already knows to accelerate learning.'
    );
  };

  return (
    <div className="container px-4 py-10 md:py-16 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <Badge variant="outline" className="mb-5 border-primary/30 bg-primary/5 font-semibold text-sm px-4 py-1.5">
            <BookOpen className="mr-2 h-4 w-4" /> Module 1
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">Learning Plan</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">Your personalized roadmap from C# to AI Engineering</p>
        </div>

        {/* Skill Assessment Form */}
        <Card className="glass mb-10 border-primary/30 shadow-large">
          <CardHeader>
            <h2 className="text-2xl md:text-3xl font-bold">Skill Assessment</h2>
            <p className="text-base text-muted-foreground leading-relaxed">Tell us about your background to personalize your roadmap</p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <label className="text-base font-semibold mb-4 block">C# Specializations</label>
              <div className="flex flex-wrap gap-3">
                {SPECIALIZATIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSpec(s)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                      specs.includes(s)
                        ? 'bg-primary/10 border-primary/50 text-primary shadow-soft scale-105'
                        : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-muted/50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="text-base font-semibold mb-3 block">
                  Hours per week: <span className="text-primary font-bold text-lg">{hours}h</span>
                </label>
                <input
                  type="range" min={5} max={40} step={5} value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full accent-primary h-3 rounded-lg"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2 font-medium">
                  <span>5h</span><span>40h</span>
                </div>
              </div>

              <div>
                <label className="text-base font-semibold mb-3 block">Target Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-input bg-background text-base font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  {TARGET_ROLES.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>

              <div>
                <label className="text-base font-semibold mb-3 block">Timeline</label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-input bg-background text-base font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  {TIMELINES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <Button onClick={generate} disabled={loading} className="gap-2 shadow-medium h-12 px-8 text-base font-semibold">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
              {loading ? 'Generating...' : 'Generate My Roadmap'}
            </Button>

            {response && (
              <div className="rounded-xl bg-primary/5 border-2 border-primary/20 p-6 text-base leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto shadow-soft">
                {response}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <RoadmapTimeline />
          </div>
          <div className="space-y-8">
            <ProgressTracker />
            <WeeklyPlan />
            <SkillBridge />
            <GeminiChat
              title="Learning Coach"
              placeholder="Ask about any topic on the roadmap..."
              systemPrompt="You are a learning coach for a C# developer transitioning to AI Engineering. Give concise, actionable study advice. Always relate new concepts to C# equivalents."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
