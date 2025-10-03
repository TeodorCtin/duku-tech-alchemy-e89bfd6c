import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  FolderOpen, 
  PenTool, 
  Settings, 
  Image,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  User,
  Star,
  Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@/services/authService";
import { toast } from "@/hooks/use-toast";
import ProjectManager from "./ProjectManager";
import BlogEditor from "./BlogEditor";
import ContentEditor from "./ContentEditor";
import ProjectsAdmin from "./ProjectsAdmin";
import SupabaseStatus from "./SupabaseStatus";
import DatabaseSetup from "./DatabaseSetup";
import { useProjects } from "@/hooks/useProjects";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { data: projects } = useProjects();

  const handleLogout = () => {
    AuthService.logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin/login");
  };

  const totalProjects = projects?.length || 0;
  const featuredProjects = projects?.filter(p => p.featured)?.length || 0;
  const draftProjects = totalProjects - featuredProjects;
  const lastUpdated = projects?.length > 0 ? "Today" : "Never";

  const stats = [
    { 
      title: "Total Projects", 
      value: totalProjects.toString(), 
      icon: FolderOpen,
      color: "from-amber-500 to-yellow-600",
      description: "All projects in database"
    },
    { 
      title: "Featured Projects", 
      value: featuredProjects.toString(), 
      icon: Star,
      color: "from-yellow-400 to-amber-500",
      description: "Shown on homepage"
    },
    { 
      title: "Draft Projects", 
      value: draftProjects.toString(), 
      icon: Edit,
      color: "from-slate-400 to-slate-600",
      description: "Not featured yet"
    },
    { 
      title: "Last Updated", 
      value: lastUpdated, 
      icon: Eye,
      color: "from-green-500 to-emerald-600",
      description: "Portfolio activity"
    }
  ];

  return (
    <div className="min-h-screen bg-hero p-6 relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/20 to-background/40" />
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full float-animation" />
      <div className="absolute top-40 right-20 w-6 h-6 bg-primary/10 rounded-full float-animation" />
      <div className="absolute bottom-20 left-20 w-8 h-8 bg-primary/5 rounded-full float-animation" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3 font-['Playfair_Display'] tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-lg font-light tracking-wide">Manage your portfolio content and settings</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.open('/', '_blank')}
              className="flex items-center gap-2 bg-glass-bg backdrop-blur-sm border-glass-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-smooth shadow-card"
            >
              <Home className="w-4 h-4" />
              View Site
            </Button>
            <div className="flex items-center gap-3 px-6 py-3 bg-glass-bg backdrop-blur-sm rounded-xl border border-glass-border shadow-card">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">duku@joben.eu</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-glass-bg backdrop-blur-sm border-glass-border hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-smooth shadow-card"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-10">
          {/* Navigation */}
          <div className="flex justify-center mb-10">
            <TabsList className="inline-flex bg-glass-bg backdrop-blur-sm rounded-2xl p-2 shadow-elevated border border-glass-border">
              <TabsTrigger value="dashboard" className="flex items-center gap-3 px-8 py-4 rounded-xl data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-smooth font-medium">
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-3 px-8 py-4 rounded-xl data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-smooth font-medium">
                <FolderOpen className="w-5 h-5" />
                <span>Projects</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-3 px-8 py-4 rounded-xl data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow transition-smooth font-medium">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dashboard Overview */}
          <TabsContent value="dashboard" className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="relative overflow-hidden hover:shadow-elevated transition-smooth hover:-translate-y-3 bg-glass-bg backdrop-blur-sm border border-glass-border shadow-card group">
                    <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-100 transition-smooth"></div>
                    <div className="relative p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-sm font-semibold text-muted-foreground mb-2 tracking-wide uppercase">
                            {stat.title}
                          </h3>
                          <p className="text-xs text-muted-foreground/70">
                            {stat.description}
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow group-hover:shadow-elevated transition-smooth">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 font-['Playfair_Display']">
                        {stat.value}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Recent Activity */}
            <Card className="bg-glass-bg backdrop-blur-sm border border-glass-border shadow-elevated hover:shadow-glow transition-smooth">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl font-semibold bg-gradient-primary bg-clip-text text-transparent font-['Playfair_Display']">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {totalProjects === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">📝</div>
                    <p className="text-muted-foreground mb-4">No activity yet</p>
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab("projects")}
                      className="hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 dark:hover:bg-amber-900/20 dark:hover:border-amber-800"
                    >
                      Create your first project
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/20 shadow-subtle">
                      <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-glow"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          Supabase connected successfully
                        </p>
                        <p className="text-xs text-muted-foreground">Just now</p>
                      </div>
                    </div>
                    {featuredProjects > 0 && (
                      <div className="flex items-center gap-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/10 shadow-subtle">
                        <div className="w-4 h-4 bg-primary/80 rounded-full shadow-subtle"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {featuredProjects} project{featuredProjects !== 1 ? 's' : ''} marked as featured
                          </p>
                          <p className="text-xs text-muted-foreground">Portfolio ready</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/10 shadow-subtle">
                      <div className="w-4 h-4 bg-primary/60 rounded-full shadow-subtle"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          Admin dashboard initialized
                        </p>
                        <p className="text-xs text-muted-foreground">Ready to manage content</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Management */}
          <TabsContent value="projects">
            <ProjectsAdmin />
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-8">
            <DatabaseSetup />
            <SupabaseStatus />
            <Card className="bg-glass-bg backdrop-blur-sm border border-glass-border shadow-elevated hover:shadow-glow transition-smooth">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl font-semibold bg-gradient-primary bg-clip-text text-transparent font-['Playfair_Display']">
                  Portfolio Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">⚙️</div>
                  <h3 className="text-lg font-semibold mb-2">Settings Coming Soon</h3>
                  <p className="text-muted-foreground mb-6">
                    Configure your portfolio preferences, contact information, and more.
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Personal information & bio</p>
                    <p>• Contact details & social links</p>
                    <p>• Portfolio theme & colors</p>
                    <p>• SEO settings & meta tags</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;