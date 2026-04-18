import { Download, FileText, Video, BookOpen, Search, Star, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Material {
  id: number;
  title: string;
  subject: string;
  type: "pdf" | "video" | "notes";
  size?: string;
  duration?: string;
  starred: boolean;
}

const materials: Material[] = [
  { id: 1, title: "Mathematics Complete Formula Sheet", subject: "Mathematics", type: "pdf", size: "2.4 MB", starred: true },
  { id: 2, title: "Physics - Mechanics Video Lecture", subject: "Physics", type: "video", duration: "45 min", starred: false },
  { id: 3, title: "Organic Chemistry Summary Notes", subject: "Chemistry", type: "notes", size: "1.1 MB", starred: true },
  { id: 4, title: "Biology - Human Anatomy Diagrams", subject: "Biology", type: "pdf", size: "5.2 MB", starred: false },
  { id: 5, title: "Calculus - Integration Techniques", subject: "Mathematics", type: "video", duration: "32 min", starred: false },
  { id: 6, title: "Chemistry Lab Procedures Guide", subject: "Chemistry", type: "pdf", size: "3.1 MB", starred: true },
  { id: 7, title: "Physics - Electromagnetism Notes", subject: "Physics", type: "notes", size: "890 KB", starred: false },
  { id: 8, title: "Cell Biology Complete Course", subject: "Biology", type: "video", duration: "1h 20min", starred: true },
];

const typeIcon = { pdf: FileText, video: Video, notes: BookOpen };
const typeColor = { pdf: "text-destructive", video: "text-accent", notes: "text-success" };

export default function StudyMaterials() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = materials.filter((m) => {
    const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
    const matchTab = tab === "all" || m.type === tab || (tab === "starred" && m.starred);
    return matchSearch && matchTab;
  });

  return (
    <div className="page-container space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Study Materials</h1>
        <p className="text-sm text-muted-foreground mt-1">Access your notes, PDFs, and video lectures</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search materials..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pdf">PDFs</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="starred">⭐ Starred</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4">
          <div className="space-y-3">
            {filtered.map((material) => {
              const Icon = typeIcon[material.type];
              return (
                <div key={material.id} className="stat-card flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${typeColor[material.type]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate">{material.title}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-[10px]">{material.subject}</Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {material.size || material.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {material.starred && <Star className="w-4 h-4 text-primary fill-primary" />}
                    <button className="w-8 h-8 rounded-lg bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors">
                      {material.type === "video" ? (
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                      ) : (
                        <Download className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">No materials found</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
