import Link from "next/link";
import { GitFork, X, Link2, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container px-4 py-10 md:py-12 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                NeuralPath
              </span>
            </Link>
            <p className="mb-6 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Empowering C# developers to master modern AI Engineering through intelligent, personalized learning paths.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted/50 rounded-lg">
                <GitFork size={18} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted/50 rounded-lg">
                <X size={18} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted/50 rounded-lg">
                <Link2 size={18} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Product</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/roadmap" className="hover:text-primary transition-colors">Pathfinder</Link></li>
              <li><Link href="/skills" className="hover:text-primary transition-colors">Skill Gap</Link></li>
              <li><Link href="/resources" className="hover:text-primary transition-colors">Knowledge Base</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Community</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row gap-4">
          <p>© 2026 NeuralPath AI. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart size={14} className="text-primary fill-primary" />
            <span>for the .NET community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
