'use client';

import { useEffect, useRef } from 'react';

export function DiagramViewer({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !chart.trim()) return;

    import('mermaid').then((m) => {
      const mermaid = m.default;
      mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' });
      const id = `diagram-${Date.now()}`;
      mermaid
        .render(id, chart)
        .then(({ svg }) => {
          if (ref.current) ref.current.innerHTML = svg;
        })
        .catch(() => {
          if (ref.current) ref.current.innerHTML = '<p class="text-xs text-muted-foreground">Diagram unavailable</p>';
        });
    });
  }, [chart]);

  return <div ref={ref} className="w-full overflow-x-auto rounded-lg bg-muted/30 p-4 min-h-[120px]" />;
}
