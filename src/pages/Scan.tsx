import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileImage, Send, Sparkles, X, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  preview?: string;
}

const Scan = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    const newFiles: UploadedFile[] = [];
    Array.from(uploadedFiles).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        newFiles.push({
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type,
          preview: event.target?.result as string,
        });
        setFiles((prev) => [...prev, ...newFiles]);
      };
      reader.readAsDataURL(file);
    });

    toast({
      title: "File Uploaded",
      description: "Your scan has been uploaded successfully!",
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleAnalyze = () => {
    if (files.length === 0) {
      toast({
        title: "No files uploaded",
        description: "Please upload a scan or report first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis(`Based on the uploaded scan, here's what I found:

**Overview:**
The scan appears to be a standard diagnostic report. Here are some key observations:

**Key Findings:**
• All major indicators appear within normal reference ranges
• No immediate areas of concern detected
• Some values may benefit from monitoring over time

**Recommendations:**
1. Schedule a follow-up consultation with your healthcare provider
2. Maintain current lifestyle and medication regimen
3. Consider retesting in 3-6 months for comparison

**Questions to Ask Your Doctor:**
- What do these specific values mean for my condition?
- Are there any lifestyle changes I should consider?
- When should I schedule my next check-up?

*Note: This is an AI-generated analysis for informational purposes only. Always consult with a qualified healthcare professional for medical advice.*`);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl gradient-vytal flex items-center justify-center mx-auto mb-4">
              <FileImage className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Scan & Report Analysis</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Upload your medical scans or reports and get AI-powered insights to better understand your health data.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload Scan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="block">
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-accent/50 transition-colors">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-1">Drop files here or click to upload</p>
                    <p className="text-sm text-muted-foreground">
                      Supports: JPG, PNG, PDF (max 10MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    multiple
                    onChange={handleFileUpload}
                  />
                </label>

                {/* Uploaded Files */}
                {files.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Uploaded Files:</p>
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-secondary"
                      >
                        {file.type.startsWith("image") ? (
                          <img
                            src={file.preview}
                            alt={file.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary" />
                          </div>
                        )}
                        <span className="flex-1 text-sm truncate">{file.name}</span>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-1 hover:bg-background rounded"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Question Input */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Ask a question about your scan (optional)
                  </label>
                  <Textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g., What do my cholesterol levels mean?"
                    className="min-h-[100px]"
                  />
                </div>

                <Button
                  variant="hero"
                  className="w-full"
                  onClick={handleAnalyze}
                  disabled={files.length === 0 || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Analyze Scan
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analysis ? (
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {analysis.split("\n").map((line, i) => {
                        if (line.startsWith("**") && line.endsWith("**")) {
                          return (
                            <h4 key={i} className="font-semibold mt-4 mb-2 text-foreground">
                              {line.replace(/\*\*/g, "")}
                            </h4>
                          );
                        }
                        if (line.startsWith("•")) {
                          return (
                            <p key={i} className="ml-4 text-muted-foreground">
                              {line}
                            </p>
                          );
                        }
                        if (line.match(/^\d\./)) {
                          return (
                            <p key={i} className="ml-4 text-muted-foreground">
                              {line}
                            </p>
                          );
                        }
                        if (line.startsWith("*")) {
                          return (
                            <p key={i} className="text-xs text-muted-foreground mt-4 italic">
                              {line.replace(/\*/g, "")}
                            </p>
                          );
                        }
                        return (
                          <p key={i} className="text-muted-foreground">
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-4">
                      <FileImage className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-muted-foreground">
                      Upload a scan and click "Analyze" to get AI-powered insights
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Scan;
