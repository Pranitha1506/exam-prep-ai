import { TrendingUp, Target, Award, Calendar, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const weeklyData = [
  { day: "Mon", hours: 3, tests: 1 },
  { day: "Tue", hours: 4.5, tests: 2 },
  { day: "Wed", hours: 2, tests: 0 },
  { day: "Thu", hours: 5, tests: 1 },
  { day: "Fri", hours: 3.5, tests: 2 },
  { day: "Sat", hours: 6, tests: 3 },
  { day: "Sun", hours: 4, tests: 1 },
];

const subjectScores = [
  { subject: "Mathematics", current: 78, previous: 65, tests: 8 },
  { subject: "Physics", current: 72, previous: 60, tests: 6 },
  { subject: "Chemistry", current: 85, previous: 78, tests: 7 },
  { subject: "Biology", current: 68, previous: 55, tests: 5 },
];

const achievements = [
  { title: "First Test", desc: "Complete your first mock test", earned: true },
  { title: "7-Day Streak", desc: "Study 7 days in a row", earned: true },
  { title: "Score 90+", desc: "Score above 90% in any test", earned: false },
  { title: "All Subjects", desc: "Complete tests in all subjects", earned: false },
  { title: "100 Hours", desc: "Study for 100 total hours", earned: false },
  { title: "Perfect Score", desc: "Get 100% in a test", earned: false },
];

const maxHours = Math.max(...weeklyData.map((d) => d.hours));

export default function ProgressPage() {
  return (
    <div className="page-container space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Progress Tracker</h1>
        <p className="text-sm text-muted-foreground mt-1">Visualize your study journey and achievements</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Overall Score", value: "76%", icon: Target, color: "text-primary" },
          { label: "Improvement", value: "+14%", icon: TrendingUp, color: "text-success" },
          { label: "Tests Taken", value: "26", icon: BarChart3, color: "text-accent" },
          { label: "Study Days", value: "42", icon: Calendar, color: "text-warning" },
        ].map((stat) => (
          <div key={stat.label} className="stat-card text-center">
            <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="stat-card">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" />
            Weekly Study Hours
          </h2>
          <div className="flex items-end gap-2 h-40">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium text-foreground">{d.hours}h</span>
                <div
                  className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                  style={{ height: `${(d.hours / maxHours) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Subject Scores
          </h2>
          <div className="space-y-4">
            {subjectScores.map((s) => (
              <div key={s.subject}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-foreground">{s.subject}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground line-through">{s.previous}%</span>
                    <span className="text-xs font-bold text-primary">{s.current}%</span>
                    <span className="text-[10px] text-success">+{s.current - s.previous}%</span>
                  </div>
                </div>
                <Progress value={s.current} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="stat-card">
        <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Award className="w-4 h-4 text-primary" />
          Achievements
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {achievements.map((a) => (
            <div
              key={a.title}
              className={`flex flex-col items-center text-center p-3 rounded-lg border transition-all ${
                a.earned
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-secondary/30 opacity-50"
              }`}
            >
              <Award className={`w-6 h-6 mb-2 ${a.earned ? "text-primary" : "text-muted-foreground"}`} />
              <p className="text-[11px] font-medium text-foreground">{a.title}</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
