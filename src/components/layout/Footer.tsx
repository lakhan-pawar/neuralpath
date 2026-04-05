import Link from 'next/link';
import { Brain, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 mt-auto">
      <div className="container px-4 py-8 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-bold">NeuralPath</span>
          </Link>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 fill-primary text-primary" /> for the .NET community
          </p>
          <p className="text-xs text-muted-foreground">© 2026 NeuralPath. Zero login required.</p>
        </div>
      </div>
    </footer>
  );
}
