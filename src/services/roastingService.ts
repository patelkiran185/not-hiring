/**
 * Service for communicating with the backend roasting API
 */

export interface RoastRequest {
  resumeText: string;
  options?: {
    brutality?: 'mild' | 'medium' | 'savage' | 'nuclear';
    focus?: 'general' | 'technical' | 'creative' | 'executive';
    includeAudio?: boolean;
  };
}

export interface RoastResponse {
  overallScore: number; // 0-100
  roastText: string;
  audioSummary?: string; // Base64 encoded audio or URL
  flashcards: FlashCard[];
  metadata?: {
    processingTime: number;
    wordCount: number;
    detectedExperience: string;
    detectedRole: string;
  };
}

export interface FlashCard {
  title: string;
  problem: string;
  solution: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category?: 'formatting' | 'content' | 'skills' | 'experience' | 'education' | 'contact';
  examples?: string[];
}

export class RoastingService {
  private static readonly BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
  
  /**
   * Submit resume for roasting
   */
  static async submitResume(request: RoastRequest): Promise<RoastResponse> {
    try {
      const response = await fetch(`${this.BASE_URL}/api/roast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to process resume');
      }

      return await response.json();
    } catch (error) {
      console.error('Roasting service error:', error);
      
      // Return mock data if backend is not available (for development)
      if (import.meta.env.DEV) {
        return this.getMockRoastResponse(request.resumeText);
      }
      
      throw error;
    }
  }

  /**
   * Check if backend is available
   */
  static async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.BASE_URL}/api/health`, {
        method: 'GET',
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Mock response for development/testing
   */
  private static getMockRoastResponse(resumeText: string): RoastResponse {
    const wordCount = resumeText.split(/\s+/).length;
    const brutality = this.generateBrutalRoast(resumeText);

    return {
      overallScore: Math.floor(Math.random() * 60) + 20, // 20-80 range for dramatic effect
      roastText: brutality.roastText,
      audioSummary: "Mock audio summary - Not available in development mode",
      flashcards: brutality.flashcards,
      metadata: {
        processingTime: Math.floor(Math.random() * 3000) + 1000, // 1-4 seconds
        wordCount,
        detectedExperience: this.detectExperienceLevel(resumeText),
        detectedRole: this.detectRole(resumeText),
      }
    };
  }

  /**
   * Generate brutal roast based on resume content
   */
  private static generateBrutalRoast(resumeText: string): { roastText: string; flashcards: FlashCard[] } {
    const issues = this.detectIssues(resumeText);
    
    const roastText = `Oh boy, where do I even begin with this digital disaster? 

${issues.objectiveIssue ? "Let's start with your 'objective' section - you know, that cringe-inducing paragraph that screams 'I have no idea what I want.' 'Seeking opportunities to leverage my skills' is corporate speak for 'I'm desperate and will take anything.'" : ''}

Your work experience reads like a grocery list written by someone who's never seen a grocery store. ${issues.responsibleForCount > 5 ? `"Responsible for" appears ${issues.responsibleForCount} times - congratulations, you've managed to sound responsible for absolutely nothing specific.` : ''}

${issues.basicSkills ? "Skills section: 'Proficient in Microsoft Office' - it's 2025, not 1995. That's like saying you're proficient in breathing." : ''}

${issues.unprofessionalEmail ? `The real kicker? Your email address. Nothing says 'hire me for a professional position' like ${issues.unprofessionalEmail}.` : ''}

But hey, at least your formatting is ${issues.formattingIssues ? 'consistently inconsistent. Those bullet points have more alignment issues than a shopping cart with three broken wheels.' : 'not completely terrible.'}

In summary: This resume has the persuasive power of wet cardboard and the professional appeal of a toddler's crayon drawing. But don't worry - even disasters can be fixed with enough effort and a complete rewrite.`;

    return {
      roastText,
      flashcards: this.generateFlashCards(issues)
    };
  }

  /**
   * Detect common resume issues
   */
  private static detectIssues(resumeText: string) {
    const text = resumeText.toLowerCase();
    
    return {
      objectiveIssue: text.includes('seeking opportunities') || text.includes('leverage my skills'),
      responsibleForCount: (resumeText.match(/responsible for/gi) || []).length,
      basicSkills: text.includes('microsoft office') || text.includes('proficient in office'),
      unprofessionalEmail: this.findUnprofessionalEmail(resumeText),
      formattingIssues: resumeText.includes('•') && resumeText.includes('*'), // Mixed bullet styles
      noQuantifiableResults: !(/\d+%|\$\d+|\d+\+/.test(resumeText)),
      tooLong: resumeText.split(/\s+/).length > 800,
      tooShort: resumeText.split(/\s+/).length < 200,
    };
  }

  /**
   * Find unprofessional email addresses
   */
  private static findUnprofessionalEmail(text: string): string | null {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = text.match(emailRegex) || [];
    
    const unprofessionalPatterns = [
      /\d{2,}/,           // Too many numbers
      /cool|awesome|sexy|hot|cute|funny|crazy/i,
      /69|420|666/,       // Immature numbers
      /xox|<3|hearts/i,   // Romantic elements
    ];
    
    return emails.find(email => 
      unprofessionalPatterns.some(pattern => pattern.test(email))
    ) || null;
  }

  /**
   * Generate specific flashcards based on detected issues
   */
  private static generateFlashCards(issues: any): FlashCard[] {
    const flashcards: FlashCard[] = [];

    if (issues.objectiveIssue) {
      flashcards.push({
        title: "Generic Objective Statement",
        problem: "Your objective is corporate word salad that says nothing about what you actually want or offer.",
        solution: "Replace with a specific professional summary highlighting your unique value proposition and career goals.",
        severity: "high",
        category: "content"
      });
    }

    if (issues.responsibleForCount > 3) {
      flashcards.push({
        title: "Overuse of 'Responsible for'",
        problem: "Starting every bullet point with 'responsible for' makes you sound passive and boring.",
        solution: "Use action verbs that demonstrate impact: 'Led', 'Increased', 'Developed', 'Achieved'.",
        severity: "critical",
        category: "content"
      });
    }

    if (issues.basicSkills) {
      flashcards.push({
        title: "Outdated Skills Section",
        problem: "Listing basic computer skills like Microsoft Office is redundant in modern job markets.",
        solution: "Focus on technical skills, programming languages, or industry-specific software relevant to your field.",
        severity: "medium",
        category: "skills"
      });
    }

    if (issues.unprofessionalEmail) {
      flashcards.push({
        title: "Unprofessional Email Address",
        problem: "Your email address undermines your professional credibility before anyone reads your resume.",
        solution: "Create a professional email using your name: firstname.lastname@provider.com",
        severity: "critical",
        category: "contact"
      });
    }

    if (issues.noQuantifiableResults) {
      flashcards.push({
        title: "Lack of Quantifiable Achievements",
        problem: "No numbers or metrics to demonstrate the impact of your work.",
        solution: "Add specific numbers: '% improvement', 'dollar amounts saved', 'team size managed'.",
        severity: "high",
        category: "experience"
      });
    }

    if (issues.formattingIssues) {
      flashcards.push({
        title: "Inconsistent Formatting",
        problem: "Mixed bullet styles and inconsistent formatting make your resume look sloppy.",
        solution: "Use consistent fonts, spacing, bullet styles, and alignment throughout.",
        severity: "medium",
        category: "formatting"
      });
    }

    return flashcards;
  }

  /**
   * Detect experience level
   */
  private static detectExperienceLevel(resumeText: string): string {
    const text = resumeText.toLowerCase();
    const yearMatches = resumeText.match(/\b(19|20)\d{2}\b/g) || [];
    
    if (text.includes('intern') || text.includes('student') || text.includes('graduate')) {
      return 'Entry Level';
    } else if (yearMatches.length > 4 || text.includes('senior') || text.includes('lead')) {
      return 'Senior Level';
    } else {
      return 'Mid Level';
    }
  }

  /**
   * Detect likely role/field
   */
  private static detectRole(resumeText: string): string {
    const text = resumeText.toLowerCase();
    
    if (text.includes('software') || text.includes('developer') || text.includes('programmer')) {
      return 'Software Developer';
    } else if (text.includes('marketing') || text.includes('social media')) {
      return 'Marketing';
    } else if (text.includes('design') || text.includes('ui/ux')) {
      return 'Designer';
    } else if (text.includes('manager') || text.includes('management')) {
      return 'Management';
    } else if (text.includes('sales') || text.includes('business development')) {
      return 'Sales';
    } else {
      return 'General';
    }
  }
}
