import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, BookOpen, Lightbulb, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { label: "Explain a concept", icon: BookOpen, prompt: "Can you explain the concept of electromagnetic induction?" },
  { label: "Solve a problem", icon: Lightbulb, prompt: "Help me solve: Find the integral of x²·sin(x) dx" },
  { label: "Study tips", icon: Sparkles, prompt: "What are the best strategies for last-minute exam preparation?" },
  { label: "Quiz me", icon: HelpCircle, prompt: "Give me 5 quick questions on organic chemistry reactions" },
];

const aiResponses: Record<string, string> = {
  default: "I'm your AI study assistant! I can help you understand concepts, solve problems, create study plans, and quiz you on any subject. What would you like to learn today?",
  concept: "**Electromagnetic Induction** is the process of generating an electromotive force (EMF) across a conductor when it is exposed to a changing magnetic field.\n\n**Key Points:**\n1. **Faraday's Law**: EMF = -dΦ/dt (rate of change of magnetic flux)\n2. **Lenz's Law**: The induced current opposes the change causing it\n3. **Applications**: Generators, transformers, induction motors\n\nWould you like me to explain any of these in more detail?",
  solve: "Let's solve ∫x²·sin(x) dx using **Integration by Parts** (twice):\n\n**Step 1:** Let u = x², dv = sin(x)dx\n→ du = 2x dx, v = -cos(x)\n→ -x²cos(x) + ∫2x·cos(x)dx\n\n**Step 2:** Apply IBP again on ∫2x·cos(x)dx\n→ Let u = 2x, dv = cos(x)dx\n→ 2x·sin(x) - ∫2·sin(x)dx\n→ 2x·sin(x) + 2cos(x)\n\n**Final Answer:** -x²cos(x) + 2x·sin(x) + 2cos(x) + C",
  tips: "## 📚 Last-Minute Exam Preparation Tips\n\n1. **Focus on weak areas** - Review topics you scored lowest in\n2. **Use active recall** - Test yourself instead of re-reading\n3. **Practice past papers** - Familiarize yourself with the exam format\n4. **Spaced repetition** - Review flashcards in intervals\n5. **Sleep well** - Your brain consolidates memory during sleep\n6. **Stay hydrated** - Drink water to maintain focus\n\nWant me to create a personalized study schedule?",
  quiz: "## 🧪 Quick Chemistry Quiz\n\n**Q1:** What is the general formula for alkanes?\n**Q2:** Name the reaction: R-OH + R'-COOH → ?\n**Q3:** What catalyst is used in Friedel-Crafts alkylation?\n**Q4:** Define nucleophilic substitution.\n**Q5:** What is Markovnikov's rule?\n\nTake your time, then ask me for answers! 🎯",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("explain") || lower.includes("concept")) return aiResponses.concept;
  if (lower.includes("solve") || lower.includes("integral") || lower.includes("calculate")) return aiResponses.solve;
  if (lower.includes("tips") || lower.includes("strateg") || lower.includes("prepare")) return aiResponses.tips;
  if (lower.includes("quiz") || lower.includes("question")) return aiResponses.quiz;
  return aiResponses.default;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", content: "Hello! 👋 I'm your AI exam preparation assistant. Ask me anything about your subjects, and I'll help you understand concepts, solve problems, and prepare effectively for your exams.", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", content: response, timestamp: new Date() }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">AI Study Assistant</h1>
            <p className="text-[10px] text-success flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success" /> Online
            </p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-card border border-border rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-card border border-border rounded-xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {messages.length <= 1 && (
        <div className="px-6 pb-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {quickPrompts.map((qp) => (
              <button
                key={qp.label}
                onClick={() => sendMessage(qp.prompt)}
                className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all text-center"
              >
                <qp.icon className="w-4 h-4 text-primary" />
                <span className="text-[11px] font-medium text-foreground">{qp.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-6 py-4 border-t border-border bg-card">
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your subjects..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" disabled={!input.trim() || isTyping} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
