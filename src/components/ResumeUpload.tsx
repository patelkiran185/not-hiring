import React, { useState } from 'react';
import { Upload, FileText, Zap, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { RoastingService } from '@/services/roastingService';
import { FileParser } from '@/utils/fileParser';

interface ResumeUploadProps {
  onResumeSubmit: (resumeText: string) => void;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onResumeSubmit }) => {
  const [resumeText, setResumeText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (resumeText.trim()) {
      onResumeSubmit(resumeText);
    }
  };

  const handleFileUpload = async (file: File) => {
    console.log('File selected:', file); // Debug log

    // Clear previous states
    setError(null);
    setSuccess(null);
    setIsProcessing(true);

    try {
      const extractedText = await FileParser.parseFile(file);

      if (!extractedText.trim()) {
        throw new Error('No text content found in the file.');
      }

      if (extractedText.length < 10) {
        throw new Error('The file content is too short.');
      }

      setResumeText(extractedText); // Ensure resumeText is updated
      setSuccess(`Successfully loaded ${file.name} (${extractedText.split(/\s+/).length} words)`);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('File processing error:', error);
      setError(error instanceof Error ? error.message : 'Failed to process file');
      setUploadedFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;
    
    const file = files[0]; // Take the first file
    await handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRoastResume = async () => {
    if (!resumeText.trim()) {
      setError('No resume text available for roasting. Please upload a file or paste your resume text.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      const roastResult = await RoastingService.submitResume({ resumeText });

      // Navigate to results page with roast data
      navigate('/api/roast', { state: { roastResult } });
    } catch (error) {
      console.error('Roast error:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 animate-slide-in-brutal">
      {/* Error Alert */}
      {error && (
        <Alert className="border-destructive/20 bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive font-medium">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Success Alert */}
      {success && (
        <Alert className="border-primary/20 bg-primary/10">
          <CheckCircle className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary font-medium">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {/* Upload Zone */}
      <Card 
        className={`card-brutal p-8 transition-all duration-300 ${
          isDragging ? 'border-primary bg-primary/5 scale-105' : ''
        } ${isProcessing ? 'opacity-75 pointer-events-none' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              {isProcessing ? (
                <Loader2 className="h-16 w-16 text-accent animate-spin" />
              ) : (
                <FileText className="h-16 w-16 text-accent animate-float" />
              )}
              <div className="absolute -top-2 -right-2">
                <Zap className="h-6 w-6 text-primary animate-pulse-brutal" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-brutal mb-2">
              {isProcessing ? 'Processing Your Resume...' : 'Upload Your Resume for Destruction'}
            </h3>
            <p className="text-muted-foreground">
              {isProcessing ? (
                'Extracting text and preparing for brutality...'
              ) : (
                <>
                  Drag & drop your resume file or{' '}
                  <span className="text-accent font-semibold">choose a file below</span>.
                  <br />
                  <span className="text-sm text-muted-foreground">
                    Supports: PDF, TXT, MD files • Max size: 10MB
                  </span>
                </>
              )}
            </p>
            
            {uploadedFile && (
              <div className="mt-4 p-3 bg-card/50 rounded-lg border border-accent/20">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Uploaded:</span> {uploadedFile.name} 
                  <span className="text-muted-foreground">
                    ({(uploadedFile.size / 1024).toFixed(1)} KB)
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf,.txt,.md"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setSuccess(`File '${file.name}' has been successfully uploaded.`);
                    setError(null); // Clear any previous errors
                    console.log('File uploaded:', file.name);
                  } else {
                    setError('No file selected. Please try again.');
                    setSuccess(null); // Clear any previous success messages
                  }
                }}
                disabled={isProcessing}
                id="fileInput"
              />
              <Button 
                variant="ghost-brutal" 
                size="lg" 
                disabled={isProcessing}
                className="relative"
                onClick={() => document.getElementById('fileInput')?.click()} // Trigger file input click
              >
                {isProcessing ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-5 w-5" />
                )}
                {isProcessing ? 'Processing...' : 'Choose File to Roast'}
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
              onClick={handleRoastResume}
              disabled={!resumeText.trim() || isProcessing}
              className="animate-pulse-brutal"
            >
              <Zap className="mr-2 h-5 w-5" />
              {isProcessing ? 'Roasting...' : 'ROAST MY RESUME'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};