'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  GitCompare, Check, X, ExternalLink, Star,
  TrendingUp, Users, BookOpen, Zap
} from 'lucide-react';
import { COMPARISON_ITEMS, CATEGORIES } from '@/data/comparisons';
import type { ComparisonCategory } from '@/types/comparison';

export default function ComparePage() {
  const [selectedCategory, setSelectedCategory] = useState<ComparisonCategory>('Frameworks');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const categoryItems = COMPARISON_ITEMS.filter(i => i.category === selectedCategory);
  const itemsToCompare = COMPARISON_ITEMS.filter(i => selectedItems.includes(i.id));

  const toggleItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      if (selectedItems.length < 3) {
        setSelectedItems([...selectedItems, id]);
      }
    }
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const renderRating = (rating?: number) => {
    if (!rating) return <span className="text-muted-foreground">N/A</span>;
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderFeatureSupport = (supported: boolean, notes?: string) => {
    return (
      <div className="flex items-center gap-2">
        {supported ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <X className="h-4 w-4 text-red-500" />
        )}
        {notes && <span className="text-xs text-muted-foreground">({notes})</span>}
      </div>
    );
  };

  return (
    <div className="container px-4 py-8 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Badge variant="outline" className="mb-4 border-primary/20 bg-primary/5">
            <GitCompare className="mr-2 h-3 w-3" /> Comparison Tools
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Compare AI/ML Tools</h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Side-by-side comparison of frameworks, cloud providers, vector databases, and tools
          </p>
        </div>

        {/* Category Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Select Category:</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                className="cursor-pointer text-sm px-4 py-2"
                onClick={() => {
                  setSelectedCategory(category as ComparisonCategory);
                  setSelectedItems([]);
                }}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Item Selection */}
        <Card className="glass mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Select Items to Compare</h2>
                <p className="text-sm text-muted-foreground">Choose up to 3 items</p>
              </div>
              {selectedItems.length > 0 && (
                <Button onClick={clearSelection} variant="outline" size="sm">
                  Clear Selection
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categoryItems.map((item) => {
                const isSelected = selectedItems.includes(item.id);
                const canSelect = selectedItems.length < 3 || isSelected;
                
                return (
                  <div
                    key={item.id}
                    onClick={() => canSelect && toggleItem(item.id)}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : canSelect
                        ? 'border-border hover:border-primary/50'
                        : 'border-border opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold">{item.name}</h3>
                      {isSelected && <Check className="h-5 w-5 text-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{item.maintainer}</p>
                    <div className="flex items-center gap-2 text-xs">
                      {item.openSource && (
                        <Badge variant="secondary" className="text-xs">Open Source</Badge>
                      )}
                      {item.githubStars && (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Star className="h-3 w-3" />
                          {(item.githubStars / 1000).toFixed(0)}K
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Comparison Table */}
        {itemsToCompare.length > 0 && (
          <div className="space-y-6">
            {/* Overview */}
            <Card className="glass">
              <CardHeader>
                <h2 className="text-xl font-bold">Overview</h2>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${itemsToCompare.length}, 1fr)` }}>
                  <div className="font-semibold">Name</div>
                  {itemsToCompare.map((item) => (
                    <div key={item.id} className="font-bold">{item.name}</div>
                  ))}

                  <div className="font-semibold">Maintainer</div>
                  {itemsToCompare.map((item) => (
                    <div key={item.id} className="text-sm">{item.maintainer}</div>
                  ))}

                  <div className="font-semibold">Description</div>
                  {itemsToCompare.map((item) => (
                    <div key={item.id} className="text-sm text-muted-foreground">{item.description}</div>
                  ))}

                  <div className="font-semibold">Open Source</div>
                  {itemsToCompare.map((item) => (
                    <div key={item.id}>
                      {item.openSource ? (
                        <Badge variant="secondary" className="text-xs">Yes ({item.license})</Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">No</Badge>
                      )}
                    </div>
                  ))}

                  {itemsToCompare[0].githubStars && (
                    <>
                      <div className="font-semibold flex items-center gap-1">
                        <Star className="h-4 w-4" /> Stars
                      </div>
                      {itemsToCompare.map((item) => (
                        <div key={item.id} className="text-sm">
                          {item.githubStars ? `${(item.githubStars / 1000).toFixed(0)}K` : 'N/A'}
                        </div>
                      ))}
                    </>
                  )}

                  {itemsToCompare[0].pricing && (
                    <>
                      <div className="font-semibold">Pricing</div>
                      {itemsToCompare.map((item) => (
                        <div key={item.id} className="text-sm">{item.pricing || 'N/A'}</div>
                      ))}
                    </>
                  )}

                  <div className="font-semibold">Website</div>
                  {itemsToCompare.map((item) => (
                    <div key={item.id}>
                      <a href={item.website} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="gap-1">
                          <ExternalLink className="h-3 w-3" />
                          Visit
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ratings */}
            {itemsToCompare[0].easeOfUse && (
              <Card className="glass">
                <CardHeader>
                  <h2 className="text-xl font-bold">Ratings</h2>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${itemsToCompare.length}, 1fr)` }}>
                    <div className="font-semibold flex items-center gap-1">
                      <Zap className="h-4 w-4" /> Ease of Use
                    </div>
                    {itemsToCompare.map((item) => (
                      <div key={item.id}>{renderRating(item.easeOfUse)}</div>
                    ))}

                    <div className="font-semibold flex items-center gap-1">
                      <BookOpen className="h-4 w-4" /> Documentation
                    </div>
                    {itemsToCompare.map((item) => (
                      <div key={item.id}>{renderRating(item.documentation)}</div>
                    ))}

                    <div className="font-semibold flex items-center gap-1">
                      <Users className="h-4 w-4" /> Community
                    </div>
                    {itemsToCompare.map((item) => (
                      <div key={item.id}>{renderRating(item.community)}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pros & Cons */}
            <Card className="glass">
              <CardHeader>
                <h2 className="text-xl font-bold">Pros & Cons</h2>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${itemsToCompare.length}, 1fr)` }}>
                  {itemsToCompare.map((item) => (
                    <div key={item.id}>
                      <h3 className="font-bold mb-3">{item.name}</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-green-600 mb-2">Pros</h4>
                          <ul className="space-y-1">
                            {item.pros.map((pro, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-red-600 mb-2">Cons</h4>
                          <ul className="space-y-1">
                            {item.cons.map((con, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="glass">
              <CardHeader>
                <h2 className="text-xl font-bold">Features</h2>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${itemsToCompare.length}, 1fr)` }}>
                  {itemsToCompare[0].features.map((feature, idx) => (
                    <>
                      <div key={`label-${idx}`} className="font-semibold">{feature.name}</div>
                      {itemsToCompare.map((item) => {
                        const itemFeature = item.features[idx];
                        return (
                          <div key={`${item.id}-${idx}`}>
                            {renderFeatureSupport(itemFeature.supported, itemFeature.notes)}
                          </div>
                        );
                      })}
                    </>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card className="glass">
              <CardHeader>
                <h2 className="text-xl font-bold">Best For</h2>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${itemsToCompare.length}, 1fr)` }}>
                  {itemsToCompare.map((item) => (
                    <div key={item.id}>
                      <h3 className="font-bold mb-2">{item.name}</h3>
                      <div className="flex flex-wrap gap-1">
                        {item.useCases.map((useCase) => (
                          <Badge key={useCase} variant="secondary" className="text-xs">
                            {useCase}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {itemsToCompare.length === 0 && (
          <div className="text-center py-12 glass rounded-lg">
            <GitCompare className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">
              Select items above to start comparing
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
