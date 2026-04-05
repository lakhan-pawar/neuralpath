'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { ArrowLeft, Sparkles, Building2, Brain, Code, Users, Loader2 } from 'lucide-react';

type InterviewQuestion = {
  id: string;
  question: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companies: string[];
  answer?: string;
  tips?: string[];
};

type InterviewPrep = {
  jobTitle: string;
  company: string;
  questions: InterviewQuestion[];
  skillsRequired: string[];
  preparationTips: string[];
};

export default function JobInterviewPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [prepData, setPrepData] = useState<InterviewPrep | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterviewPrep = async () => {
      try {
        setLoading(true);
        
        // Get job details from URL params
        const title = searchParams.get('title') || 'AI Engineer';
        const company = searchParams.get('company') || 'Company';
        const description = searchParams.get('description') || 'AI/ML role';

        const response = await fetch(
          `/api/jobs/${params.id}/interview?title=${encodeURIComponent(title)}&company=${encodeURIComponent(company)}&description=${encodeURIComponent(description)}`
        );
        
        const data = await response.json();
        
        if (response.ok) {
          setPrepData(data);
        } else {
          console.error('Failed to fetch interview prep:', data);
          console.error('Status:', response.status);
          console.error('Error details:', data.details);
        }
      } catch (error) {
        console.error('Failed to fetch interview prep:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchInterviewPrep();
    }
  }, [params.id, searchParams]);

  const categories = prepData ? [...new Set(prepData.questions.map(q => q.category))] : [];
  const filteredQuestions = selectedTab === 0 
    ? prepData?.questions 
    : prepData?.questions.filter(q => q.category === categories[selectedTab - 1]);

  if (loading) {
    return (
      <div className="container px-4 py-12 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Generating interview questions...</p>
            <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
          </div>
        </div>
      </div>
    );
  }

  if (!prepData) {
    return (
      <div className="container px-4 py-12 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Button variant="outline" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
          </Button>
          <Card className="glass">
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-lg text-muted-foreground">Failed to generate interview preparation</p>
              <Button variant="outline" onClick={() => router.back()} className="mt-4">
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
        </Button>

        {/* Header */}
        <div className="mb-8">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <Brain className="mr-2 h-3 w-3" /> Interview Preparation
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{prepData.jobTitle}</h1>
          <p className="text-xl text-muted-foreground flex items-center gap-2">
            <Building2 className="h-5 w-5" /> {prepData.company}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Tabs */}
            <Card className="glass">
              <CardContent className="pt-6 pb-6">
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedTab(0)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                        selectedTab === 0
                          ? 'bg-primary text-primary-foreground shadow-medium'
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      All ({prepData.questions.length})
                    </button>
                    {categories.map((category, index) => (
                      <button
                        key={category}
                        onClick={() => setSelectedTab(index + 1)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                          selectedTab === index + 1
                            ? 'bg-primary text-primary-foreground shadow-medium'
                            : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        {category} ({prepData.questions.filter(q => q.category === category).length})
                      </button>
                    ))}
                  </div>
                </Tabs>
              </CardContent>
            </Card>

            {/* Questions */}
            <div className="space-y-4">
              {filteredQuestions?.map((question) => (
                <Card key={question.id} className="glass hover:shadow-large transition-all">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-semibold flex-1">{question.question}</h3>
                      <Badge
                        variant={
                          question.difficulty === 'Easy' ? 'default' :
                          question.difficulty === 'Medium' ? 'secondary' : 'outline'
                        }
                        className="shrink-0"
                      >
                        {question.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {question.category}
                      </Badge>
                      {question.companies.map((company) => (
                        <Badge key={company} variant="secondary" className="text-xs">
                          <Building2 className="mr-1 h-3 w-3" /> {company}
                        </Badge>
                      ))}
                    </div>

                    {expandedQuestion === question.id && (
                      <div className="mt-4 space-y-4">
                        {question.answer && (
                          <div className="bg-muted/50 rounded-xl p-4">
                            <p className="text-sm font-semibold text-muted-foreground mb-2">Sample Answer:</p>
                            <p className="text-base leading-relaxed">{question.answer}</p>
                          </div>
                        )}
                        {question.tips && question.tips.length > 0 && (
                          <div className="bg-primary/5 rounded-xl p-4">
                            <p className="text-sm font-semibold text-primary mb-2">Tips:</p>
                            <ul className="space-y-1">
                              {question.tips.map((tip, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedQuestion(expandedQuestion === question.id ? null : question.id)}
                      className="mt-3"
                    >
                      {expandedQuestion === question.id ? 'Hide' : 'Show'} Answer & Tips
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills Required */}
            <Card className="glass">
              <CardHeader>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" /> Skills Required
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {prepData.skillsRequired.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Preparation Tips */}
            <Card className="glass bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> Preparation Tips
                </h3>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {prepData.preparationTips.map((tip, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="font-bold text-primary shrink-0">{index + 1}.</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="glass">
              <CardHeader>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" /> Question Stats
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Questions</span>
                  <span className="text-2xl font-bold text-primary">{prepData.questions.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Categories</span>
                  <span className="text-2xl font-bold text-accent">{categories.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Companies</span>
                  <span className="text-2xl font-bold text-green-500">
                    {[...new Set(prepData.questions.flatMap(q => q.companies))].length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
