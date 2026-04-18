import { Bell, User, Moon, Shield, Globe, HelpCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="page-container space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <div className="stat-card space-y-4">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <User className="w-4 h-4 text-primary" /> Profile
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs">Full Name</Label>
            <Input defaultValue="Student" className="mt-1" />
          </div>
          <div>
            <Label className="text-xs">Email</Label>
            <Input defaultValue="student@example.com" className="mt-1" />
          </div>
          <div>
            <Label className="text-xs">Exam Name</Label>
            <Input defaultValue="Board Exams 2026" className="mt-1" />
          </div>
          <div>
            <Label className="text-xs">Exam Date</Label>
            <Input type="date" defaultValue="2026-04-10" className="mt-1" />
          </div>
        </div>
        <Button size="sm">Save Changes</Button>
      </div>

      <div className="stat-card space-y-4">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary" /> Notifications
        </h2>
        {[
          { label: "Daily study reminders", desc: "Get reminded to study every day", default: true },
          { label: "Test results", desc: "Notifications when results are ready", default: true },
          { label: "Weekly progress report", desc: "Summary of your weekly progress", default: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-[11px] text-muted-foreground">{item.desc}</p>
            </div>
            <Switch defaultChecked={item.default} />
          </div>
        ))}
      </div>

      <div className="stat-card space-y-4">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" /> Preferences
        </h2>
        {[
          { label: "Sound effects", desc: "Play sounds on quiz answers", default: true },
          { label: "Auto-advance flashcards", desc: "Move to next card automatically", default: false },
          { label: "Show timer in tests", desc: "Display countdown during practice tests", default: true },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-[11px] text-muted-foreground">{item.desc}</p>
            </div>
            <Switch defaultChecked={item.default} />
          </div>
        ))}
      </div>
    </div>
  );
}
