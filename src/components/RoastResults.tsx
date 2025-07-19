import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, Download, Flame, Star, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RoastResultsProps {
  roastData: {
    overallScore: number;
    roastText: string;
    audioSummary: string;
    flashcards: Array<{
      title: string;
      problem: string;
      solution: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
    }>;
  };
  onNewRoast: () => void;
}

export const RoastResults: React.FC<RoastResultsProps> = ({ roastData, onNewRoast }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-accent';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-primary';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'Not terrible... surprisingly';
    if (score >= 60) return 'Mediocre at best';
    if (score >= 40) return 'Needs serious work';
    return 'Complete disaster';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-primary text-primary-foreground';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <Flame className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Star className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8 animate-slide-in-brutal">
      {/* Score Header */}
      <Card className="card-glow p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 animate-pulse" />
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <Flame className="h-12 w-12 text-primary animate-glow" />
          </div>
          <h2 className="text-4xl font-black text-brutal mb-2">
            ROAST COMPLETE
          </h2>
          <div className="space-y-2">
            <div className={`text-6xl font-black ${getScoreColor(roastData.overallScore)}`}>
              {roastData.overallScore}/100
            </div>
            <p className="text-xl text-muted-foreground">
              {getScoreMessage(roastData.overallScore)}
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button 
              variant="ghost-brutal"
              onClick={onNewRoast}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Roast Another
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Results
            </Button>
          </div>
        </div>
      </Card>

      {/* Results Tabs */}
      <Tabs defaultValue="roast" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="roast" className="font-bold">
            🔥 The Roast
          </TabsTrigger>
          <TabsTrigger value="audio" className="font-bold">
            🎵 Audio Summary
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="font-bold">
            📚 Brutal Lessons
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roast">
          <Card className="card-brutal p-6">
            <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
              <Flame className="mr-2 h-6 w-6" />
              Your Resume: Brutally Analyzed
            </h3>
            <div className="prose prose-invert max-w-none">
              <div className="bg-muted/30 rounded-lg p-6 border-l-4 border-primary">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap font-mono text-sm">
                  {roastData.roastText}
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="audio">
          <Card className="card-brutal p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-accent flex items-center">
                  <Volume2 className="mr-2 h-6 w-6" />
                  Audio Summary
                </h3>
                <Button
                  variant={isAudioPlaying ? "destructive" : "brutal"}
                  onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                >
                  {isAudioPlaying ? (
                    <>
                      <VolumeX className="mr-2 h-4 w-4" />
                      Stop Playback
                    </>
                  ) : (
                    <>
                      <Volume2 className="mr-2 h-4 w-4" />
                      Play Roast Audio
                    </>
                  )}
                </Button>
              </div>
              
              <div className="bg-muted/30 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-pulse-brutal">
                    <Volume2 className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Audio summary would play here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Duration: ~2:30 minutes of pure brutality
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="flashcards">
          <div className="grid gap-4 md:grid-cols-2">
            {roastData.flashcards.map((card, index) => (
              <Card key={index} className="card-brutal p-6 hover:scale-105 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-lg text-foreground">
                      {card.title}
                    </h4>
                    <Badge className={getSeverityColor(card.severity)} variant="secondary">
                      {getSeverityIcon(card.severity)}
                      <span className="ml-1 capitalize">{card.severity}</span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-destructive/10 border-l-4 border-destructive p-3 rounded">
                      <p className="text-sm font-semibold text-destructive mb-1">Problem:</p>
                      <p className="text-sm text-foreground">{card.problem}</p>
                    </div>
                    
                    <div className="bg-accent/10 border-l-4 border-accent p-3 rounded">
                      <p className="text-sm font-semibold text-accent mb-1">Solution:</p>
                      <p className="text-sm text-foreground">{card.solution}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};