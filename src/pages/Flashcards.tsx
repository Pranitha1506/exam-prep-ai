import { useState } from "react";
import { RotateCcw, ChevronLeft, ChevronRight, Shuffle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Flashcard {
  id: number;
  front: string;
  back: string;
  subject: string;
  mastered: boolean;
}

const flashcards: Flashcard[] = [
  { id: 1, front: "What is Newton's Second Law of Motion?", back: "F = ma. The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.", subject: "Physics", mastered: false },
  { id: 2, front: "Define the derivative of a function", back: "The derivative f'(x) = lim(h→0) [f(x+h) - f(x)] / h. It represents the instantaneous rate of change of the function.", subject: "Mathematics", mastered: true },
  { id: 3, front: "What is Le Chatelier's Principle?", back: "When a system at equilibrium is disturbed, it shifts in the direction that tends to reduce the effect of the disturbance.", subject: "Chemistry", mastered: false },
  { id: 4, front: "Explain Mitosis vs Meiosis", back: "Mitosis: 1 division → 2 identical cells (growth/repair). Meiosis: 2 divisions → 4 unique haploid cells (reproduction).", subject: "Biology", mastered: false },
  { id: 5, front: "State the Pythagorean Theorem", back: "In a right triangle, a² + b² = c², where c is the hypotenuse and a, b are the other two sides.", subject: "Mathematics", mastered: true },
  { id: 6, front: "What is Ohm's Law?", back: "V = IR. Voltage equals Current times Resistance. It describes the relationship between voltage, current, and resistance in an electrical circuit.", subject: "Physics", mastered: false },
];

const subjects = ["All", "Physics", "Mathematics", "Chemistry", "Biology"];

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("All");

  const filtered = selectedSubject === "All" ? flashcards : flashcards.filter((f) => f.subject === selectedSubject);
  const card = filtered[currentIndex] || filtered[0];

  const goNext = () => {
    setIsFlipped(false);
    setCurrentIndex((i) => (i + 1) % filtered.length);
  };
  const goPrev = () => {
    setIsFlipped(false);
    setCurrentIndex((i) => (i - 1 + filtered.length) % filtered.length);
  };
  const shuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * filtered.length));
  };

  return (
    <div className="page-container space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Flashcards</h1>
        <p className="text-sm text-muted-foreground mt-1">Review key concepts with spaced repetition</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => { setSelectedSubject(subject); setCurrentIndex(0); setIsFlipped(false); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedSubject === subject
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {subject}
          </button>
        ))}
      </div>

      {card && (
        <div className="flex flex-col items-center">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full max-w-lg min-h-[280px] cursor-pointer perspective-1000"
          >
            <div
              className={`stat-card flex flex-col items-center justify-center text-center p-8 min-h-[280px] transition-all duration-500 ${
                isFlipped ? "bg-primary/5 border-primary/20" : ""
              }`}
            >
              <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-4">
                {card.subject}
              </span>
              {!isFlipped ? (
                <>
                  <BookOpen className="w-6 h-6 text-muted-foreground mb-3" />
                  <p className="text-base font-semibold text-foreground">{card.front}</p>
                  <p className="text-[11px] text-muted-foreground mt-3">Click to reveal answer</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-foreground leading-relaxed">{card.back}</p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <Button variant="outline" size="icon" onClick={goPrev}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-xs text-muted-foreground min-w-[60px] text-center">
              {currentIndex + 1} / {filtered.length}
            </span>
            <Button variant="outline" size="icon" onClick={goNext}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={shuffle}>
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setIsFlipped(false)}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
        <div className="stat-card text-center">
          <p className="text-lg font-bold text-foreground">{flashcards.length}</p>
          <p className="text-[10px] text-muted-foreground">Total Cards</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-lg font-bold text-success">{flashcards.filter((f) => f.mastered).length}</p>
          <p className="text-[10px] text-muted-foreground">Mastered</p>
        </div>
        <div className="stat-card text-center">
          <p className="text-lg font-bold text-warning">{flashcards.filter((f) => !f.mastered).length}</p>
          <p className="text-[10px] text-muted-foreground">To Review</p>
        </div>
      </div>
    </div>
  );
}
