import * as mammoth from 'mammoth';

// Interface to define the pdf2json structure (based on your reference code)
interface PDFParser {
  on(event: string, callback: (data?: any) => void): void;
  parseBuffer(buffer: ArrayBuffer): void;
  getRawTextContent(): string;
}

/**
 * Extract text from various file formats
 */
export class FileParser {
  
  /**
   * Parse PDF file using pdf2json (browser-compatible version)
   */
  static async parsePDF(file: File): Promise<string> {
    try {
      // Dynamic import for pdf2json
      const PDFParserModule = await import('pdf2json');
      const PDFParser = PDFParserModule.default;
      
      return new Promise<string>((resolve, reject) => {
        const pdfParser = new PDFParser() as PDFParser;
        
        pdfParser.on('pdfParser_dataReady', () => {
          try {
            const text = pdfParser.getRawTextContent();
            if (!text || text.trim().length === 0) {
              reject(new Error('No text content found in PDF'));
            } else {
              resolve(text.trim());
            }
          } catch (error) {
            reject(new Error('Failed to extract text from PDF'));
          }
        });

        pdfParser.on('pdfParser_dataError', (error) => {
          console.error('PDF parsing error:', error);
          reject(new Error('Failed to parse PDF file. The file might be corrupted or password-protected.'));
        });

        // Convert file to ArrayBuffer and parse
        file.arrayBuffer().then(arrayBuffer => {
          pdfParser.parseBuffer(arrayBuffer);
        }).catch(error => {
          reject(new Error('Failed to read PDF file'));
        });
      });
    } catch (error) {
      console.error('PDF parsing error:', error);
      throw new Error('Failed to load PDF parser. Please try a different format.');
    }
  }

  /**
   * Parse DOCX file using mammoth
   */
  static async parseDOCX(file: File): Promise<string> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      
      if (result.messages.length > 0) {
        console.warn('DOCX parsing warnings:', result.messages);
      }
      
      return result.value.trim();
    } catch (error) {
      console.error('DOCX parsing error:', error);
      throw new Error('Failed to parse DOCX file. Please try a different format.');
    }
  }

  /**
   * Parse plain text file
   */
  static async parseText(file: File): Promise<string> {
    try {
      return await file.text();
    } catch (error) {
      console.error('Text parsing error:', error);
      throw new Error('Failed to read text file.');
    }
  }

  /**
   * Auto-detect file type and parse accordingly
   */
  static async parseFile(file: File): Promise<string> {
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();

    try {
      if (fileName.endsWith('.pdf') || fileType.includes('pdf')) {
        return await this.parsePDF(file);
      } else if (fileName.endsWith('.docx') || fileType.includes('wordprocessingml')) {
        return await this.parseDOCX(file);
      } else if (
        fileName.endsWith('.txt') || 
        fileName.endsWith('.md') || 
        fileType.includes('text/plain') ||
        fileType.includes('text/markdown')
      ) {
        return await this.parseText(file);
      } else {
        // Try to parse as text if type is unknown
        return await this.parseText(file);
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validate file type
   */
  static isValidFileType(file: File): boolean {
    const allowedExtensions = ['.pdf', '.docx', '.txt', '.md'];
    const fileName = file.name.toLowerCase();
    
    return allowedExtensions.some(ext => fileName.endsWith(ext)) || 
           file.type.includes('pdf') || 
           file.type.includes('wordprocessingml') ||
           file.type.includes('text');
  }

  /**
   * Get human-readable file type
   */
  static getFileTypeDescription(file: File): string {
    const fileName = file.name.toLowerCase();
    
    if (fileName.endsWith('.pdf') || file.type.includes('pdf')) {
      return 'PDF Document';
    } else if (fileName.endsWith('.docx') || file.type.includes('wordprocessingml')) {
      return 'Word Document';
    } else if (fileName.endsWith('.txt')) {
      return 'Text File';
    } else if (fileName.endsWith('.md')) {
      return 'Markdown File';
    } else {
      return 'Unknown File Type';
    }
  }
}
