import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What are common symptoms of flu?",
  "How can I improve my sleep quality?",
  "What foods help boost immunity?",
  "When should I see a doctor for a headache?",
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI health assistant. I can help answer your health-related questions, explain medical terms, or provide general wellness advice. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getSimulatedResponse(message),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const getSimulatedResponse = (query: string): string => {
    const responses: Record<string, string> = {
      flu: "Common flu symptoms include fever, chills, muscle aches, cough, congestion, runny nose, headaches, and fatigue. Most symptoms improve within 3-7 days. Stay hydrated, rest, and consult a doctor if symptoms worsen or persist.",
      sleep: "To improve sleep quality: maintain a consistent sleep schedule, limit screen time before bed, keep your bedroom cool and dark, avoid caffeine after 2pm, and try relaxation techniques like deep breathing or meditation.",
      immunity: "Foods that help boost immunity include citrus fruits (vitamin C), red bell peppers, broccoli, garlic, ginger, spinach, yogurt with probiotics, almonds, turmeric, and green tea. A balanced diet with plenty of vegetables is key!",
      headache: "See a doctor for headaches if: they're severe or sudden, accompanied by fever/stiff neck/confusion, occur after head injury, worsen over time, or don't respond to over-the-counter medication. Recurring headaches also warrant medical attention.",
    };

    const lowerQuery = query.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
      if (lowerQuery.includes(key)) return value;
    }

    return "That's a great question! While I can provide general health information, I'd recommend consulting with a healthcare professional for personalized advice. Is there anything specific about this topic I can help clarify?";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-4 h-screen flex flex-col">
        <div className="container mx-auto px-4 flex-1 flex flex-col max-w-4xl">
          {/* Header */}
          <div className="py-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-vytal flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Health AI Assistant</h1>
                <p className="text-sm text-muted-foreground">Ask me anything about health & wellness</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "gradient-vytal text-primary-foreground"
                  }`}
                >
                  {message.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-md"
                      : "bg-card border border-border shadow-card rounded-tl-md"
                  }`}
                >
                  <p className="leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl gradient-vytal flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="bg-card border border-border shadow-card rounded-2xl rounded-tl-md p-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Suggested questions</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="px-4 py-2 rounded-full bg-accent text-sm hover:bg-accent/80 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="py-4 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-3"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your health question..."
                className="flex-1 h-12 rounded-xl"
                disabled={isLoading}
              />
              <Button type="submit" variant="hero" size="icon" className="h-12 w-12" disabled={isLoading || !input.trim()}>
                <Send className="w-5 h-5" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This AI provides general information only. Always consult a healthcare professional for medical advice.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
