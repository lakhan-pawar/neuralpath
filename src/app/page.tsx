import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Briefcase, TrendingUp, GraduationCap, FlaskConical, Network, Library, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QUICK_LINKS = [
  {
    href: '/jobs',
    icon: Briefcase,
    label: 'Jobs',
    description: 'AI roles from top companies',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    href: '/interview-deep-dives',
    icon: GraduationCap,
    label: 'Interview Prep',
    description: '75+ questions & deep dives',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  {
    href: '/resume-projects',
    icon: FlaskConical,
    label: 'Projects Hub',
    description: '100+ resume-ready projects',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    href: '/resources',
    icon: Library,
    label: 'Resources',
    description: 'Curated learning materials',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    href: '/sysdesign',
    icon: Network,
    label: 'System Design',
    description: 'AI architecture patterns',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    href: '/trends',
    icon: TrendingUp,
    label: 'AI Hub',
    description: 'Trends, news & community',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
];

export default function HomePage() {
  return (
    <div className="relative isolate overflow-hidden min-h-[calc(100vh-4rem)]">
      {/* Background */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-accent opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="container px-4 py-8 md:py-12 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section - Compact */}
          <div className="text-center mb-8 md:mb-12">
            <Badge variant="outline" className="mb-4 py-1.5 px-4 border-primary/30 bg-primary/5 text-primary font-semibold text-xs">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              For .NET & C# Developers
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent leading-tight">
              Your AI Career <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Co-Pilot</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
              Map your C# expertise to AI Engineering. Zero login, powered by Gemini.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Link href="/interview-deep-dives">
                <Button size="default" className="h-11 px-6 text-sm shadow-lg hover:shadow-xl transition-all w-full sm:w-auto font-semibold">
                  Start Interview Prep <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/jobs">
                <Button size="default" variant="outline" className="h-11 px-6 text-sm border-border hover:border-primary/30 transition-colors w-full sm:w-auto font-semibold">
                  Browse AI Jobs
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="text-primary">✓</span> Zero login
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-primary">✓</span> Free APIs
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-primary">✓</span> Gemini-powered
              </span>
            </div>
          </div>

          {/* Quick Links Grid - Compact 2x3 layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
            {QUICK_LINKS.map(({ href, icon: Icon, label, description, color, bg }) => (
              <Link key={href} href={href} className="group">
                <Card className="glass h-full hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="pt-5 pb-5 px-5">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${bg} transition-transform group-hover:scale-110 duration-300 shrink-0`}>
                        <Icon className={`h-5 w-5 ${color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors truncate">{label}</h3>
                        <p className="text-sm text-muted-foreground leading-snug">{description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Stats Section - Compact */}
          <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Card className="glass text-center">
              <CardContent className="pt-4 pb-4">
                <p className="text-2xl md:text-3xl font-bold text-primary">75+</p>
                <p className="text-xs text-muted-foreground mt-1">Interview Questions</p>
              </CardContent>
            </Card>
            <Card className="glass text-center">
              <CardContent className="pt-4 pb-4">
                <p className="text-2xl md:text-3xl font-bold text-primary">100+</p>
                <p className="text-xs text-muted-foreground mt-1">Project Ideas</p>
              </CardContent>
            </Card>
            <Card className="glass text-center">
              <CardContent className="pt-4 pb-4">
                <p className="text-2xl md:text-3xl font-bold text-primary">105+</p>
                <p className="text-xs text-muted-foreground mt-1">Live Implementations</p>
              </CardContent>
            </Card>
            <Card className="glass text-center">
              <CardContent className="pt-4 pb-4">
                <p className="text-2xl md:text-3xl font-bold text-primary">Live</p>
                <p className="text-xs text-muted-foreground mt-1">AI Trends & News</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
