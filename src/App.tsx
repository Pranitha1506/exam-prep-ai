import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import PracticeTests from "./pages/PracticeTests";
import Flashcards from "./pages/Flashcards";
import StudyMaterials from "./pages/StudyMaterials";
import ProgressPage from "./pages/ProgressPage";
import AIAssistant from "./pages/AIAssistant";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function LayoutWrapper() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutWrapper />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/practice-tests" element={<PracticeTests />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/study-materials" element={<StudyMaterials />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
