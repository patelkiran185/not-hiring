import React, { useState } from 'react';
import { Flame, Github, Twitter, Zap, Shield, Target, Upload, Brain, Lightbulb, TrendingUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ResumeUpload } from '@/components/ResumeUpload';
import { LoadingRoast } from '@/components/LoadingRoast';
import { RoastResults } from '@/components/RoastResults';
import { RoastingService, RoastResponse } from '@/services/roastingService';
import heroImage from '@/assets/hero-roast.jpg';

type AppState = 'upload' | 'roasting' | 'results';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('upload');
  const [roastData, setRoastData] = useState<RoastResponse | null>(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  const handleResumeSubmit = async (resumeText: string) => {
    setAppState('roasting');
    
    try {
      // Submit to roasting service
      const response = await RoastingService.submitResume({
        resumeText,
        options: {
          brutality: 'savage', // Maximum brutality for the full experience
          includeAudio: true,
        }
      });
      
      setRoastData(response);
      setAppState('results');
    } catch (error) {
      console.error('Roasting failed:', error);
      // Handle error - could show error state or fallback to mock data
      setAppState('upload');
      // You might want to show an error message here
    }
  };

  const handleNewRoast = () => {
    setAppState('upload');
    setRoastData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="animate-slide-in-brutal">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Flame className="h-24 w-24 text-primary animate-glow" />
                <div className="absolute -top-2 -right-2">
                  <Zap className="h-8 w-8 text-accent animate-pulse-brutal" />
                </div>
              </div>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-black text-brutal mb-6 leading-tight">
              RESUME
              <br />
              <span className="text-glow">ROASTER</span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-muted-foreground mb-8 max-w-4xl mx-auto">
              Get brutally honest, AI-powered feedback that will 
              <span className="text-primary font-bold"> destroy your ego</span> and 
              <span className="text-accent font-bold"> rebuild your resume</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button 
                variant="roast" 
                size="lg"
                onClick={() => {
                  const uploadSection = document.getElementById('upload-section');
                  uploadSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xl px-12 py-6 animate-pulse-brutal"
              >
                <Flame className="mr-3 h-6 w-6" />
                START THE ROAST
              </Button>
              
              <Button 
                variant="ghost-brutal" 
                size="lg"
                onClick={() => setIsHowItWorksOpen(true)}
                className="text-lg px-8 py-6"
              >
                <Shield className="mr-2 h-5 w-5" />
                How It Works
              </Button>
            </div>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-card/80 backdrop-blur-sm border border-accent/20 rounded-full px-6 py-3">
                <span className="text-accent font-semibold">✨ AI-Powered Analysis</span>
              </div>
              <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3">
                <span className="text-primary font-semibold">🔥 Brutal Honesty</span>
              </div>
              <div className="bg-card/80 backdrop-blur-sm border border-secondary/20 rounded-full px-6 py-3">
                <span className="text-secondary-glow font-semibold">📚 Actionable Insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16" id="upload-section">
        {appState === 'upload' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black text-brutal mb-4">
                Ready for the Truth?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Upload your resume and prepare for an unflinching analysis that will expose every weakness, 
                cliché, and missed opportunity. No sugar-coating, no participation trophies.
              </p>
            </div>
            <ResumeUpload onResumeSubmit={handleResumeSubmit} />
          </div>
        )}

        {appState === 'roasting' && <LoadingRoast />}

        {appState === 'results' && roastData && (
          <div className="max-w-6xl mx-auto">
            <RoastResults roastData={roastData} onNewRoast={handleNewRoast} />
          </div>
        )}
      </div>

      {/* How It Works Dialog */}
      <Dialog open={isHowItWorksOpen} onOpenChange={setIsHowItWorksOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border border-accent/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-4xl font-black text-brutal mb-4 flex items-center justify-center">
              <Flame className="mr-3 h-8 w-8 text-primary animate-glow" />
              How the Roasting Works
            </DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Get ready for a brutal but transformative journey that will turn your mediocre resume into a career-launching weapon.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Step 1 */}
            <div className="relative">
              <Card className="p-6 bg-gradient-to-br from-card/80 to-card/60 border-primary/20 hover:border-primary/40 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/20 p-3 rounded-full mr-4">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">1. Upload & Parse</h3>
                    <p className="text-sm text-accent">The Sacrifice Begins</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Upload your resume and watch our AI dissect it like a surgeon. We extract every word, 
                  analyze formatting, and identify the telltale signs of template mediocrity.
                </p>
              </Card>
              <div className="absolute -bottom-4 -right-4 bg-primary/10 rounded-full p-2">
                <span className="text-2xl">📄</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <Card className="p-6 bg-gradient-to-br from-card/80 to-card/60 border-accent/20 hover:border-accent/40 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-accent/20 p-3 rounded-full mr-4">
                    <Brain className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">2. AI Analysis</h3>
                    <p className="text-sm text-primary">The Brutal Truth</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI doesn't sugar-coat anything. It identifies clichés, weak language, formatting disasters, 
                  and missed opportunities with the precision of a career assassin.
                </p>
              </Card>
              <div className="absolute -bottom-4 -right-4 bg-accent/10 rounded-full p-2">
                <span className="text-2xl">🧠</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <Card className="p-6 bg-gradient-to-br from-card/80 to-card/60 border-secondary/20 hover:border-secondary/40 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-secondary/20 p-3 rounded-full mr-4">
                    <Lightbulb className="h-6 w-6 text-secondary-glow" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">3. Roast & Insights</h3>
                    <p className="text-sm text-secondary-glow">The Awakening</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Receive a brutally honest roast that exposes every flaw, followed by actionable flashcards 
                  that show you exactly how to fix each problem.
                </p>
              </Card>
              <div className="absolute -bottom-4 -right-4 bg-secondary/10 rounded-full p-2">
                <span className="text-2xl">💡</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <Card className="p-6 bg-gradient-to-br from-card/80 to-card/60 border-primary/20 hover:border-primary/40 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/20 p-3 rounded-full mr-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">4. Level Up</h3>
                    <p className="text-sm text-primary">The Transformation</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Armed with harsh truths and clear solutions, rebuild your resume into a interview-generating, 
                  career-accelerating masterpiece that actually gets results.
                </p>
              </Card>
              <div className="absolute -bottom-4 -right-4 bg-primary/10 rounded-full p-2">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
          </div>

          {/* Warning Box */}
          <Card className="mt-8 p-6 bg-gradient-to-r from-destructive/10 via-accent/10 to-primary/10 border border-primary/30">
            <div className="flex items-center justify-center mb-4">
              <Flame className="h-6 w-6 text-primary mr-2" />
              <h4 className="text-xl font-bold text-primary">Fair Warning</h4>
              <Flame className="h-6 w-6 text-primary ml-2" />
            </div>
            <p className="text-center text-muted-foreground">
              This roast will be <span className="text-primary font-bold">merciless</span>. 
              Your feelings might get hurt, but your career will thank you. 
              Only proceed if you can handle the <span className="text-accent font-bold">unfiltered truth</span>.
            </p>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button 
              variant="roast" 
              size="lg"
              onClick={() => {
                setIsHowItWorksOpen(false);
                const uploadSection = document.getElementById('upload-section');
                uploadSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3"
            >
              <Flame className="mr-2 h-5 w-5" />
              I'm Ready to Get Roasted
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              onClick={() => setIsHowItWorksOpen(false)}
              className="px-6 py-3"
            >
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <Flame className="h-8 w-8 text-primary" />
              <span className="text-xl font-black text-brutal">Resume Roaster</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-border">
            <p className="text-muted-foreground">
              Made with 🔥 for job seekers who can handle the truth.
              <br />
              <span className="text-xs">
                Disclaimer: Feelings may be hurt, but careers will be improved.
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
