'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Map, BookOpen, Target, TrendingUp, Menu, X, Briefcase } from "lucide-react";

const NAV_LINKS = [
  { href: "/jobs", label: "Jobs", icon: Target },
  { href: "/interview", label: "Interview", icon: BookOpen },
  { href: "/resume-projects", label: "Resume Projects", icon: Briefcase },
  { href: "/sysdesign", label: "System Design", icon: Map },
  { href: "/trends", label: "Trends", icon: TrendingUp },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 shadow-soft">
      <div className="container flex h-20 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 shrink-0">
          <Brain className="h-7 w-7 text-primary" />
          <span className="font-bold text-2xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            NeuralPath
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2 mx-auto">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary shadow-soft"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/glossary">
            <Button size="sm" className="shadow-medium h-11 px-6 text-base font-semibold">
              Glossary
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-3 rounded-xl hover:bg-muted/50 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/70 bg-background/98 backdrop-blur-md shadow-medium">
          <div className="container px-4 py-5 space-y-2">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary shadow-soft"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span>{label}</span>
                </Link>
              );
            })}
            <div className="pt-4 border-t border-border/70 mt-4">
              <Link href="/glossary" onClick={() => setMobileMenuOpen(false)} className="block">
                <Button size="sm" className="w-full h-12 text-base font-semibold">
                  Glossary
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
