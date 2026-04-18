import { useState } from "react";
import { Clock, CheckCircle, Play, Lock, Star, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Test {
  id: number;
  title: string;
  subject: string;
  questions: number;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "completed" | "available" | "locked";
  score?: number;
  bestScore?: number;
}

const tests: Test[] = [
  { id: 1, title: "Mathematics Mock Test #1", subject: "Mathematics", questions: 30, duration: "60 min", difficulty: "Medium", status: "completed", score: 85, bestScore: 85 },
  { id: 2, title: "Physics Unit Test - Mechanics", subject: "Physics", questions: 25, duration: "45 min", difficulty: "Easy", status: "completed", score: 72, bestScore: 78 },
  { id: 3, title: "Chemistry Full Mock", subject: "Chemistry", questions: 40, duration: "90 min", difficulty: "Hard", status: "available" },
  { id: 4, title: "Biology - Cell Division", subject: "Biology", questions: 20, duration: "30 min", difficulty: "Easy", status: "available" },
  { id: 5, title: "Physics - Thermodynamics", subject: "Physics", questions: 35, duration: "60 min", difficulty: "Hard", status: "available" },
  { id: 6, title: "Mathematics - Calculus", subject: "Mathematics", questions: 25, duration: "45 min", difficulty: "Medium", status: "locked" },
  { id: 7, title: "Chemistry - Organic Reactions", subject: "Chemistry", questions: 30, duration: "50 min", difficulty: "Hard", status: "locked" },
  { id: 8, title: "Full Length Mock Exam", subject: "All Subjects", questions: 100, duration: "180 min", difficulty: "Hard", status: "locked" },
];

const difficultyColor = {
  Easy: "bg-success/10 text-success",
  Medium: "bg-warning/10 text-warning",
  Hard: "bg-destructive/10 text-destructive",
};

export default function PracticeTests() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all" ? tests : tests.filter((t) => t.status === activeTab);

  return (
    <div className="page-container space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Practice Tests</h1>
          <p className="text-sm text-muted-foreground mt-1">Test your knowledge with curated mock exams</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-3.5 h-3.5" /> Filter
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Tests ({tests.length})</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="locked">Locked</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((test) => (
              <div key={test.id} className={`stat-card ${test.status === "locked" ? "opacity-60" : ""}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">{test.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{test.subject}</p>
                  </div>
                  <Badge variant="secondary" className={`text-[10px] ${difficultyColor[test.difficulty]}`}>
                    {test.difficulty}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {test.questions} Qs
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {test.duration}
                  </span>
                  {test.bestScore && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-primary" /> Best: {test.bestScore}%
                    </span>
                  )}
                </div>

                {test.status === "completed" && (
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-1 h-2 rounded-full bg-secondary">
                      <div
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{ width: `${test.score}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-primary">{test.score}%</span>
                  </div>
                )}

                <Button
                  size="sm"
                  className="w-full gap-2"
                  variant={test.status === "locked" ? "secondary" : test.status === "completed" ? "outline" : "default"}
                  disabled={test.status === "locked"}
                >
                  {test.status === "locked" && <Lock className="w-3.5 h-3.5" />}
                  {test.status === "available" && <Play className="w-3.5 h-3.5" />}
                  {test.status === "completed" && <CheckCircle className="w-3.5 h-3.5" />}
                  {test.status === "locked" ? "Unlock" : test.status === "completed" ? "Retake" : "Start Test"}
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
