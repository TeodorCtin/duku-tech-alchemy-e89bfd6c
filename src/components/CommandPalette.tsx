import { useEffect, useState, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Command, Github, Linkedin, Mail, Home, User, Briefcase, Code, MessageSquare } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  icon: React.ElementType;
  action: () => void;
  keywords: string[];
}

/**
 * Elite command palette (CMD+K / CTRL+K)
 * For quick navigation and actions
 */
const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
    setSearch("");
  }, []);

  const commands: CommandItem[] = [
    {
      id: "home",
      label: "Go to Home",
      icon: Home,
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      keywords: ["home", "top", "start"]
    },
    {
      id: "about",
      label: "Go to About",
      icon: User,
      action: () => scrollToSection("about"),
      keywords: ["about", "bio", "info"]
    },
    {
      id: "projects",
      label: "Go to Projects",
      icon: Briefcase,
      action: () => scrollToSection("projects"),
      keywords: ["projects", "work", "portfolio"]
    },
    {
      id: "skills",
      label: "Go to Skills",
      icon: Code,
      action: () => scrollToSection("skills"),
      keywords: ["skills", "tech", "stack"]
    },
    {
      id: "contact",
      label: "Go to Contact",
      icon: MessageSquare,
      action: () => scrollToSection("contact"),
      keywords: ["contact", "email", "message"]
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      icon: Linkedin,
      action: () => {
        window.open("https://www.linkedin.com/in/duku-constantin/", "_blank");
        setOpen(false);
      },
      keywords: ["linkedin", "social", "profile"]
    },
    {
      id: "github",
      label: "Open GitHub",
      icon: Github,
      action: () => {
        window.open("https://github.com/teodor-vladconstantin", "_blank");
        setOpen(false);
      },
      keywords: ["github", "code", "repos"]
    }
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.keywords.some(kw => kw.includes(search.toLowerCase()))
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {/* Floating hint button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-3 bg-black/80 backdrop-blur-2xl border border-primary/30 rounded-full text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-105 shadow-gold group hidden md:flex"
        aria-label="Open command palette"
      >
        <Command className="w-4 h-4 group-hover:text-primary transition-colors" />
        <span className="font-medium">
          <kbd className="px-2 py-0.5 bg-muted/30 rounded text-xs">⌘</kbd>
          <kbd className="px-2 py-0.5 bg-muted/30 rounded text-xs ml-1">K</kbd>
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-black/95 backdrop-blur-2xl border-primary/30 shadow-gold-strong p-0 gap-0 max-w-2xl">
          <DialogHeader className="p-6 pb-4 border-b border-primary/10">
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Command className="w-5 h-5 text-primary" />
              Quick Navigation
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-4">
            <Input
              placeholder="Type a command or search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-muted/20 border-primary/20 focus:border-primary h-12 text-base"
              autoFocus
            />
          </div>

          <div className="max-h-96 overflow-y-auto px-2 pb-4">
            {filteredCommands.length > 0 ? (
              <div className="space-y-1">
                {filteredCommands.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 text-left transition-all duration-200 group hover:scale-[1.02]"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {cmd.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No commands found</p>
                <p className="text-sm mt-2">Try searching for: home, projects, skills, contact</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-primary/10 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-muted/30 rounded">↑</kbd>
                <kbd className="px-2 py-1 bg-muted/30 rounded">↓</kbd>
                <span className="ml-1">Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-muted/30 rounded">↵</kbd>
                <span className="ml-1">Select</span>
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-muted/30 rounded">ESC</kbd>
              <span className="ml-1">Close</span>
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommandPalette;
