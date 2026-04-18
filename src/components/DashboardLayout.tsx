import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          <header className="h-14 flex items-center border-b border-border bg-card px-4 gap-4 flex-shrink-0">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Exam in</span>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">14 days</span>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
