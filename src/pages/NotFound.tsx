import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 px-6 max-w-2xl">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold gradient-text-animated">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold">Page Not Found</h2>
          <p className="text-lg text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm text-muted-foreground/80">
            Path: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button 
            size="lg" 
            onClick={() => navigate(-1)}
            variant="outline"
            className="button-premium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button 
            size="lg" 
            onClick={() => navigate('/')}
            className="button-premium glow-effect"
          >
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Button>
        </div>

        <div className="pt-8">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Search className="w-4 h-4" />
            Looking for something specific? Check the navigation menu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
