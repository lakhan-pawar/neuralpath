import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, BookOpen, Briefcase, TrendingUp, MessageSquare, FlaskConical, Network, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MODULES = [
  {
    href: '/learning',
    icon: BookOpen,
    label: 'Learning Plan',
    description: 'Phase-by-phase roadmap from C# to AI Engineering with progress tracking',
    badge: 'Module 1',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    href: '/jobs',
    icon: Briefcase,
    label: 'Job Finder',
    description: 'AI Engineering roles aggregated from Adzuna, TheMuse and more',
    badge: 'Module 2',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    href: '/trends',
    icon: TrendingUp,
    label: 'AI Trends',
    description: 'Live feed from Reddit, Hacker News, and ArXiv with glossary lookup',
    badge: 'Module 3',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    href: '/interview',
    icon: MessageSquare,
    label: 'Interview Prep',
    description: 'Real questions from the community with Gemini-powered answers and mock sessions',
    badge: 'Module 4',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  {
    href: '/projects',
    icon: FlaskConical,
    label: 'Project Lab',
    description: 'Trending GitHub AI repos to study, fork, and contribute to',
    badge: 'Module 5',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    href: '/sysdesign',
    icon: Network,
    label: 'System Design',
    description: 'AI architecture patterns, cloud comparisons, and Gemini design Q&A',
    badge: 'Module 6',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    href: '/glossary',
    icon: Brain,
    label: 'AI Glossary',
    description: 'Comprehensive terminology guide for AI, ML, and LLM concepts with examples',
    badge: 'Reference',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
  },
];

export default function HomePage() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Background */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-accent opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      {/* Hero */}
      <section className="container px-4 pt-20 pb-16 md:pt-32 md:pb-24 md:px-8 text-center">
        <Badge variant="outline" className="mb-8 py-2 px-5 border-primary/30 bg-primary/5 text-primary font-semibold text-sm">
          <Sparkles className="mr-2 h-4 w-4" />
          Designed for .NET & C# Developers
        </Badge>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl mb-8 bg-gradient-to-b from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent pb-2 leading-[1.1]">
          Your AI Career<br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Co-Pilot</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed px-4 font-medium">
          NeuralPath maps your C# expertise to AI Engineering. Six modules, zero login, powered by Gemini.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center mb-10 px-4">
          <Link href="/learning">
            <Button size="lg" className="h-14 px-10 text-base shadow-large hover:shadow-xl transition-all w-full sm:w-auto font-semibold">
              Start Learning Plan <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/jobs">
            <Button size="lg" variant="outline" className="h-14 px-10 text-base border-border hover:border-primary/30 transition-colors w-full sm:w-auto font-semibold">
              Browse AI Jobs
            </Button>
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base text-muted-foreground px-4 font-medium">
          <span className="flex items-center gap-2">
            <span className="text-primary text-lg">✓</span> Zero login
          </span>
          <span className="flex items-center gap-2">
            <span className="text-primary text-lg">✓</span> Free APIs only
          </span>
          <span className="flex items-center gap-2">
            <span className="text-primary text-lg">✓</span> Gemini-powered
          </span>
        </div>
      </section>

      {/* Module Grid */}
      <section className="container px-4 pb-24 md:pb-40 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {MODULES.map(({ href, icon: Icon, label, description, badge, color, bg }) => (
            <Link key={href} href={href} className="group">
              <Card className="glass h-full hover:border-primary/40 hover:shadow-large transition-all duration-300 hover:-translate-y-2">
                <CardContent className="pt-8 pb-8 px-7">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl ${bg} transition-transform group-hover:scale-110 duration-300 shadow-soft`}>
                      <Icon className={`h-7 w-7 ${color}`} />
                    </div>
                    <Badge variant="secondary" className="text-sm font-semibold px-3 py-1">{badge}</Badge>
                  </div>
                  <h3 className="font-bold text-2xl mb-3 group-hover:text-primary transition-colors">{label}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{description}</p>
                  <div className="flex items-center gap-2 mt-6 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Open module <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
