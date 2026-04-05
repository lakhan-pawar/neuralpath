'use client';

import { Component, type ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; message: string; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <Card className="glass border-destructive/30">
          <CardContent className="pt-6 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">Something went wrong</p>
              <p className="text-xs text-muted-foreground mt-1">{this.state.message}</p>
              <Button size="sm" variant="outline" className="mt-3"
                onClick={() => this.setState({ hasError: false, message: '' })}>
                Try again
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }
    return this.props.children;
  }
}
