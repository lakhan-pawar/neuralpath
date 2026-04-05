import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SERVICES = [
  {
    category: 'LLM APIs',
    azure: 'Azure OpenAI Service',
    aws: 'Amazon Bedrock',
    gcp: 'Vertex AI (Gemini)',
    azureNote: 'Best for C# / .NET teams',
  },
  {
    category: 'Vector DB',
    azure: 'Azure AI Search',
    aws: 'OpenSearch',
    gcp: 'Vertex AI Matching Engine',
    azureNote: 'Native SK integration',
  },
  {
    category: 'ML Training',
    azure: 'Azure ML',
    aws: 'SageMaker',
    gcp: 'Vertex AI Training',
    azureNote: 'Familiar Azure portal',
  },
  {
    category: 'Serverless AI',
    azure: 'Azure Functions + SK',
    aws: 'Lambda + Bedrock',
    gcp: 'Cloud Run + Gemini',
    azureNote: 'Direct C# support',
  },
];

export function CloudComparison() {
  return (
    <Card className="glass">
      <CardHeader>
        <h2 className="text-xl font-semibold">Cloud ML Services Comparison</h2>
        <p className="text-sm text-muted-foreground">Azure highlighted for C# developers</p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Category</th>
                <th className="text-left py-2 pr-4 font-medium text-primary">Azure</th>
                <th className="text-left py-2 pr-4 text-muted-foreground font-medium">AWS</th>
                <th className="text-left py-2 text-muted-foreground font-medium">GCP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {SERVICES.map((s) => (
                <tr key={s.category}>
                  <td className="py-3 pr-4 text-muted-foreground text-xs">{s.category}</td>
                  <td className="py-3 pr-4">
                    <div className="font-medium text-xs">{s.azure}</div>
                    <Badge variant="outline" className="text-xs border-primary/20 text-primary mt-1">{s.azureNote}</Badge>
                  </td>
                  <td className="py-3 pr-4 text-xs text-muted-foreground">{s.aws}</td>
                  <td className="py-3 text-xs text-muted-foreground">{s.gcp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
