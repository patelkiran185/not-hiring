import React from 'react';
import { Flame, Zap, AlertTriangle, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const LoadingRoast: React.FC = () => {
  const roastingSteps = [
    { icon: Target, text: "Analyzing your questionable choices...", delay: "0s" },
    { icon: AlertTriangle, text: "Identifying cringe-worthy clichés...", delay: "1s" },
    { icon: Zap, text: "Preparing devastating feedback...", delay: "2s" },
    { icon: Flame, text: "Finalizing your digital destruction...", delay: "3s" },
  ];

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="card-glow p-12 max-w-2xl mx-auto text-center">
        <div className="space-y-8">
          {/* Main Loading Animation */}
          <div className="relative">
            <div className="mx-auto w-32 h-32 relative">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-transparent border-t-accent rounded-full animate-spin animation-delay-150"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Flame className="h-12 w-12 text-primary animate-pulse-brutal" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-4xl font-black text-brutal mb-4">
              ROASTING IN PROGRESS...
            </h2>
            <p className="text-xl text-muted-foreground">
              Our AI is sharpening its digital claws for maximum damage
            </p>
          </div>

          {/* Loading Steps */}
          <div className="space-y-4">
            {roastingSteps.map((step, index) => (
              <div 
                key={index}
                className="flex items-center justify-center space-x-3 opacity-0 animate-fade-in"
                style={{ animationDelay: step.delay, animationFillMode: 'forwards' }}
              >
                <step.icon className="h-5 w-5 text-accent animate-pulse" />
                <span className="text-foreground font-medium">{step.text}</span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent animate-pulse"
              style={{
                width: '100%',
                animation: 'loading-progress 4s ease-in-out infinite'
              }}
            ></div>
          </div>

          {/* Warning Message */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-sm text-destructive font-semibold flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Warning: Feelings may be hurt in the process
            </p>
          </div>
        </div>
      </Card>

    </div>
  );
};