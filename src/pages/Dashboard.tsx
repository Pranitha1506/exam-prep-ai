import { BookOpen, Brain, CheckCircle, Clock, Target, TrendingUp, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const stats = [
  { label: "Tests Completed", value: "24", change: "+3 this week", icon: CheckCircle, color: "text-success" },
  { label: "Study Hours", value: "86h", change: "+12h this week", icon: Clock, color: "text-accent" },
  { label: "Avg. Score", value: "78%", change: "+5% improvement", icon: Target, color: "text-primary" },
  { label: "Streak", value: "7 days", change: "Keep going!", icon: Zap, color: "text-warning" },
];

const subjects = [
  { name: "Mathematics", progress: 72, total: 45, completed: 32, color: "bg-primary" },
  { name: "Physics", progress: 58, total: 38, completed: 22, color: "bg-accent" },
  { name: "Chemistry", progress: 85, total: 42, completed: 36, color: "bg-success" },
  { name: "Biology", progress: 45, total: 35, completed: 16, color: "bg-warning" },
];

const recentActivity = [
  { title: "Completed Physics Mock Test #5", time: "2 hours ago", score: "82%", icon: CheckCircle },
  { title: "Reviewed Chemistry Flashcards", time: "4 hours ago", score: "45 cards", icon: Brain },
  { title: "Started Mathematics Chapter 8", time: "Yesterday", score: "In Progress", icon: BookOpen },
  { title: "Completed Biology Quiz", time: "Yesterday", score: "91%", icon: CheckCircle },
];

export default function Dashboard() {
  return (
    <div className="page-container space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, <span className="gradient-text">Student</span> 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here's your study progress overview. Keep up the great work!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{stat.change}</p>
              </div>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 stat-card">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Subject Progress
          </h2>
          <div className="space-y-5">
            {subjects.map((subject) => (
              <div key={subject.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{subject.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {subject.completed}/{subject.total} topics
                  </span>
                </div>
                <Progress value={subject.progress} className="h-2" />
                <p className="text-[11px] text-muted-foreground mt-1">{subject.progress}% complete</p>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <h2 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{activity.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground">{activity.time}</span>
                    <span className="text-[10px] font-medium text-primary">{activity.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="stat-card">
        <h2 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Start Mock Test", icon: Target, desc: "Full-length exam" },
            { label: "Review Flashcards", icon: Brain, desc: "Spaced repetition" },
            { label: "AI Doubt Solver", icon: Zap, desc: "Ask anything" },
            { label: "Study Plan", icon: BookOpen, desc: "Today's schedule" },
          ].map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-secondary/50 hover:bg-primary/10 transition-colors group"
            >
              <action.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs font-medium text-foreground">{action.label}</span>
              <span className="text-[10px] text-muted-foreground">{action.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
