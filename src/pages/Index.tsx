import React, { useState } from 'react';
import { Flame, Github, Twitter, Zap, Shield, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResumeUpload } from '@/components/ResumeUpload';
import { LoadingRoast } from '@/components/LoadingRoast';
import { RoastResults } from '@/components/RoastResults';
import heroImage from '@/assets/hero-roast.jpg';

type AppState = 'upload' | 'roasting' | 'results';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('upload');
  const [roastData, setRoastData] = useState<any>(null);

  const handleResumeSubmit = (resumeText: string) => {
    setAppState('roasting');
    
    // Simulate AI processing
    setTimeout(() => {
      const mockRoastData = {
        overallScore: Math.floor(Math.random() * 60) + 20, // 20-80 range for dramatic effect
        roastText: `Oh boy, where do I even begin with this digital trainwreck? 

Let's start with your "objective" section - you know, that cringe-inducing paragraph that screams "I have no idea what I want." "Seeking opportunities to leverage my skills" is corporate speak for "I'm desperate and will take anything." 

Your work experience reads like a grocery list written by someone who's never seen a grocery store. "Responsible for" appears 47 times - congratulations, you've managed to sound responsible for absolutely nothing specific. 

Skills section: "Proficient in Microsoft Office" - it's 2024, not 1995. That's like saying you're proficient in breathing. And "Good communication skills" while misspelling three words in your contact info? The irony is *chef's kiss*.

Your education section suggests you attended the University of Generic Achievements, majoring in Buzzword Management with a minor in Template Following.

But hey, at least your formatting is consistent... consistently amateur. Those bullet points have more alignment issues than a shopping cart with three broken wheels.

The real kicker? Your email address. Nothing says "hire me for a professional position" like TotallyAwesome69@email.com.

In summary: This resume has the persuasive power of wet cardboard and the professional appeal of a toddler's crayon drawing. But don't worry - even disasters can be fixed with enough effort and a complete rewrite.`,
        audioSummary: "Audio summary of brutal feedback",
        flashcards: [
          {
            title: "Generic Objective Statement",
            problem: "Your objective is corporate word salad that says nothing about what you actually want or offer.",
            solution: "Replace with a specific professional summary highlighting your unique value proposition and career goals.",
            severity: "high"
          },
          {
            title: "Overuse of 'Responsible for'",
            problem: "Starting every bullet point with 'responsible for' makes you sound passive and boring.",
            solution: "Use action verbs that demonstrate impact: 'Led', 'Increased', 'Developed', 'Achieved'.",
            severity: "critical"
          },
          {
            title: "Outdated Skills Section",
            problem: "Listing basic computer skills like Microsoft Office is redundant in modern job markets.",
            solution: "Focus on technical skills, programming languages, or industry-specific software relevant to your field.",
            severity: "medium"
          },
          {
            title: "Unprofessional Email Address",
            problem: "Your email address undermines your professional credibility before anyone reads your resume.",
            solution: "Create a professional email using your name: firstname.lastname@provider.com",
            severity: "critical"
          },
          {
            title: "Poor Formatting Consistency",
            problem: "Inconsistent formatting makes your resume look sloppy and unprofessional.",
            solution: "Use consistent fonts, spacing, and alignment. Consider using a professional template.",
            severity: "medium"
          },
          {
            title: "Lack of Quantifiable Achievements",
            problem: "No numbers or metrics to demonstrate the impact of your work.",
            solution: "Add specific numbers: '% improvement', 'dollar amounts saved', 'team size managed'.",
            severity: "high"
          }
        ]
      };
      
      setRoastData(mockRoastData);
      setAppState('results');
    }, 5000); // 5 second delay for dramatic effect
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
