import React, { useState } from 'react';
import { Upload, FileText, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface ResumeUploadProps {
  onResumeSubmit: (resumeText: string) => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onResumeSubmit }) => {
  const [resumeText, setResumeText] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = () => {
    if (resumeText.trim()) {
      onResumeSubmit(resumeText);
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setResumeText(text);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const textFile = files.find(file => 
      file.type === 'text/plain' || 
      file.name.endsWith('.txt') ||
      file.name.endsWith('.md')
    );
    
    if (textFile) {
      handleFileUpload(textFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-8 animate-slide-in-brutal">
      {/* Upload Zone */}
      <Card 
        className={`card-brutal p-8 transition-all duration-300 ${
          isDragging ? 'border-primary bg-primary/5 scale-105' : ''
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <FileText className="h-16 w-16 text-accent animate-float" />
              <div className="absolute -top-2 -right-2">
                <Zap className="h-6 w-6 text-primary animate-pulse-brutal" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-brutal mb-2">
              Upload Your Resume for Destruction
            </h3>
            <p className="text-muted-foreground">
              Drag & drop your resume file or paste the text below. 
              <span className="text-primary font-semibold"> Prepare for brutality.</span>
            </p>
          </div>

          <div className="flex justify-center">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".txt,.md"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
              <Button variant="ghost-brutal" size="lg">
                <Upload className="mr-2 h-5 w-5" />
                Choose File to Roast
              </Button>
            </label>
          </div>
        </div>
      </Card>

      {/* Text Input */}
      <Card className="card-brutal p-6">
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-glow">
            Or Paste Your Resume Text
          </h4>
          <Textarea
            placeholder="Paste your resume text here... (I dare you)"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="min-h-[200px] bg-input border-border text-foreground resize-none font-mono text-sm"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {resumeText.length} characters ready for roasting
            </span>
            <Button 
              variant="roast" 
              size="lg"
              onClick={handleSubmit}
              disabled={!resumeText.trim()}
              className="animate-pulse-brutal"
            >
              <Zap className="mr-2 h-5 w-5" />
              ROAST MY RESUME
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};