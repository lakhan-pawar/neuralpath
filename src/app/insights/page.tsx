import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Briefcase, DollarSign, MapPin, Users } from 'lucide-react';

export default function InsightsPage() {
  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Badge variant="outline" className="mb-4 border-accent/20 bg-accent/5">
            <TrendingUp className="mr-2 h-3 w-3" />
            Market Intelligence
          </Badge>
          <h1 className="text-4xl font-bold mb-4">AI Job Market Insights</h1>
          <p className="text-lg text-muted-foreground">
            Real-time data on AI Engineering opportunities and trends
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Briefcase className="h-6 w-6" />}
            value="47,000+"
            label="AI Engineer Jobs"
            trend="+23% YoY"
            trendUp
          />
          <StatCard
            icon={<DollarSign className="h-6 w-6" />}
            value="$145k"
            label="Average Salary"
            trend="+15% YoY"
            trendUp
          />
          <StatCard
            icon={<Users className="h-6 w-6" />}
            value="3.2x"
            label="Demand vs Supply"
            trend="High demand"
            trendUp
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="glass">
            <CardHeader>
              <h2 className="text-xl font-semibold">Top Skills in Demand</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <SkillDemand skill="Python" demand={95} />
                <SkillDemand skill="LLM Integration" demand={88} />
                <SkillDemand skill="Vector Databases" demand={76} />
                <SkillDemand skill="PyTorch/TensorFlow" demand={72} />
                <SkillDemand skill="Cloud (Azure/AWS)" demand={85} />
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <h2 className="text-xl font-semibold">Top Hiring Companies</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <CompanyCard name="Microsoft" openings={234} location="Remote/Hybrid" />
                <CompanyCard name="OpenAI" openings={89} location="San Francisco" />
                <CompanyCard name="Google DeepMind" openings={156} location="Multiple" />
                <CompanyCard name="Anthropic" openings={67} location="Remote" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, trend, trendUp }: {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <Card className="glass">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div className="text-3xl font-bold">{value}</div>
        </div>
        <div className="text-sm text-muted-foreground mb-1">{label}</div>
        <div className={`text-xs font-medium ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
          {trend}
        </div>
      </CardContent>
    </Card>
  );
}

function SkillDemand({ skill, demand }: { skill: string; demand: number }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{skill}</span>
        <span className="text-sm text-muted-foreground">{demand}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-accent" style={{ width: `${demand}%` }} />
      </div>
    </div>
  );
}

function CompanyCard({ name, openings, location }: {
  name: string;
  openings: number;
  location: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/30">
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {location}
        </div>
      </div>
      <Badge variant="secondary">{openings} jobs</Badge>
    </div>
  );
}
