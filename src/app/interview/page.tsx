'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Brain, Search, Filter, X, ChevronDown, ChevronUp, 
  Clock, Building, Tag, Shuffle, CheckCircle2
} from 'lucide-react';
import { INTERVIEW_QUESTIONS, COMPANIES, TOPICS } from '@/data/interviewQuestions';
import type { QuestionType, QuestionDifficulty } from '@/types/interviewQuestion';

const QUESTION_TYPES: QuestionType[] = ['Technical', 'Behavioral', 'System Design', 'Coding', 'ML Theory'];
const DIFFICULTIES: QuestionDifficulty[] = ['Easy', 'Medium', 'Hard'];

const DIFFICULTY_COLORS = {
  'Easy': 'bg-green-500/10 text-green-500 border-green-500/30',
  'Medium': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
  'Hard': 'bg-red-500/10 text-red-500 border-red-500/30',
};

const TYPE_COLORS = {
  'Technical': 'bg-blue-500/10 text-blue-500',
  'Behavioral': 'bg-purple-500/10 text-purple-500',
  'System Design': 'bg-orange-500/10 text-orange-500',
  'Coding': 'bg-green-500/10 text-green-500',
  'ML Theory': 'bg-pink-500/10 text-pink-500',
};

export default function InterviewQuestionBankPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [practicedQuestions, setPracticedQuestions] = useState<Set<string>>(new Set());

  const filteredQuestions = INTERVIEW_QUESTIONS.filter(q => {
    const matchesSearch = searchQuery === '' || 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'All' || q.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    const matchesCompany = selectedCompany === 'All' || q.company === selectedCompany;
    const matchesTopic = selectedTopic === 'All' || q.topics.includes(selectedTopic);
    
    return matchesSearch && matchesType && matchesDifficulty && matchesCompany && matchesTopic;
  });

  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const togglePracticed = (id: string) => {
    const newPracticed = new Set(practicedQuestions);
    if (newPracticed.has(id)) {
      newPracticed.delete(id);
    } else {
      newPracticed.add(id);
    }
    setPracticedQuestions(newPracticed);
  };

  const getRandomQuestion = () => {
    if (filteredQuestions.length > 0) {
      const randomQ = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
      setExpandedQuestion(randomQ.id);
      // Scroll to question
      setTimeout(() => {
        document.getElementById(randomQ.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedDifficulty('All');
    setSelectedCompany('All');
    setSelectedTopic('All');
  };

  const hasActiveFilters = selectedType !== 'All' || selectedDifficulty !== 'All' || 
                          selectedCompany !== 'All' || selectedTopic !== 'All' || searchQuery !== '';

  return (
    <div className="container px-4 py-8 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <Brain className="mr-2 h-3 w-3" /> Interview Prep
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Interview Question Bank</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Practice with {INTERVIEW_QUESTIONS.length}+ curated interview questions from top tech companies
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{filteredQuestions.length}</p>
              <p className="text-xs text-muted-foreground">Questions</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{practicedQuestions.size}</p>
              <p className="text-xs text-muted-foreground">Practiced</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{COMPANIES.length}</p>
              <p className="text-xs text-muted-foreground">Companies</p>
            </CardContent>
          </Card>
          <Card className="glass">
            <CardContent className="pt-4">
              <p className="text-2xl font-bold">{TOPICS.length}</p>
              <p className="text-xs text-muted-foreground">Topics</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions or topics..."
                className="pl-10"
              />
            </div>
            <Button onClick={getRandomQuestion} variant="outline" className="gap-2">
              <Shuffle className="h-4 w-4" />
              Random
            </Button>
          </div>

          {/* Filters */}
          <div className="glass p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-muted-foreground">Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Clear all
                </button>
              )}
            </div>

            {/* Type Filter */}
            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Type:</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedType === 'All' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedType('All')}
                >
                  All
                </Badge>
                {QUESTION_TYPES.map((type) => (
                  <Badge
                    key={type}
                    variant={selectedType === type ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Difficulty:</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedDifficulty === 'All' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedDifficulty('All')}
                >
                  All
                </Badge>
                {DIFFICULTIES.map((diff) => (
                  <Badge
                    key={diff}
                    variant="outline"
                    className={`cursor-pointer text-xs ${selectedDifficulty === diff ? DIFFICULTY_COLORS[diff] : ''}`}
                    onClick={() => setSelectedDifficulty(diff)}
                  >
                    {diff}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Company Filter */}
            <div>
              <span className="text-xs font-semibold text-muted-foreground mb-2 block">Company:</span>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedCompany === 'All' ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => setSelectedCompany('All')}
                >
                  All
                </Badge>
                {COMPANIES.map((company) => (
                  <Badge
                    key={company}
                    variant={selectedCompany === company ? 'default' : 'outline'}
                    className="cursor-pointer text-xs"
                    onClick={() => setSelectedCompany(company)}
                  >
                    {company}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((question) => (
            <Card key={question.id} id={question.id} className="glass">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="outline" className={TYPE_COLORS[question.type]}>
                        {question.type}
                      </Badge>
                      <Badge variant="outline" className={DIFFICULTY_COLORS[question.difficulty]}>
                        {question.difficulty}
                      </Badge>
                      {question.company && (
                        <Badge variant="secondary" className="gap-1">
                          <Building className="h-3 w-3" />
                          {question.company}
                        </Badge>
                      )}
                      {question.timeToSolve && (
                        <Badge variant="secondary" className="gap-1">
                          <Clock className="h-3 w-3" />
                          {question.timeToSolve}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-base md:text-lg font-semibold mb-2">{question.question}</h3>
                    <div className="flex flex-wrap gap-1">
                      {question.topics.map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      onClick={() => togglePracticed(question.id)}
                      variant={practicedQuestions.has(question.id) ? 'default' : 'outline'}
                      size="sm"
                      className="gap-1"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => toggleQuestion(question.id)}
                      variant="outline"
                      size="sm"
                    >
                      {expandedQuestion === question.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedQuestion === question.id && (
                <CardContent className="space-y-4">
                  {/* Hints */}
                  {question.hints && question.hints.length > 0 && (
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2">💡 Hints:</h4>
                      <ul className="space-y-1">
                        {question.hints.map((hint, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">• {hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Answer */}
                  {question.answer && (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2">✓ Answer:</h4>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{question.answer}</p>
                    </div>
                  )}

                  {/* Follow-up Questions */}
                  {question.followUpQuestions && question.followUpQuestions.length > 0 && (
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-sm mb-2">🔄 Follow-up Questions:</h4>
                      <ul className="space-y-1">
                        {question.followUpQuestions.map((fq, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">• {fq}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">
              No questions found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
