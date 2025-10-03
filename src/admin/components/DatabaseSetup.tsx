import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';
import { Loader2, Database } from 'lucide-react';

const DatabaseSetup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const setupDatabase = async () => {
    setIsLoading(true);
    
    try {
      // Check if projects table exists and has data
      const { data: existingProjects, error: checkError } = await supabase
        .from('projects')
        .select('*')
        .limit(1);

      if (checkError) {
        throw new Error(`Database check failed: ${checkError.message}`);
      }

      if (existingProjects && existingProjects.length > 0) {
        toast({
          title: 'Database Already Setup',
          description: 'Sample projects already exist in the database.',
        });
        setIsLoading(false);
        return;
      }

      // Insert sample data
      const sampleProjects = [
        {
          title: 'Joben',
          description: 'A job board dedicated to white-collar roles, offering sourcing and online job promotion.',
          image: '',
          tech: ['WordPress', 'PHP', 'MySQL', 'Custom APIs'],
          github: '',
          demo: 'https://joben.eu',
          featured: true
        },
        {
          title: 'DiveIn',
          description: 'A project focused on professional development of a local community.',
          image: '',
          tech: ['React', 'Node.js', 'Python', 'OpenAI API'],
          github: '',
          demo: 'https://divein.ro',
          featured: true
        },
        {
          title: 'EDA Dent',
          description: 'Integrating AI into SEO strategies for dental clinics.',
          image: '',
          tech: ['Python', 'NLP', 'SEO Automation Tools'],
          github: '',
          demo: 'https://edadent.ro',
          featured: true
        }
      ];

      const { data, error } = await supabase
        .from('projects')
        .insert(sampleProjects)
        .select();

      if (error) {
        throw new Error(`Failed to insert projects: ${error.message}`);
      }

      toast({
        title: 'Success!',
        description: `Successfully created ${data?.length || 0} sample projects.`,
      });

      // Force refresh the page to reload data
      window.location.reload();

    } catch (error) {
      console.error('Setup error:', error);
      toast({
        title: 'Setup Failed',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-glass-bg backdrop-blur-sm border border-glass-border shadow-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Database className="w-6 h-6 text-primary" />
          <span className="bg-gradient-primary bg-clip-text text-transparent font-['Playfair_Display']">
            Database Setup
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Initialize the database with sample projects if no data exists.
        </p>
        <Button 
          onClick={setupDatabase} 
          disabled={isLoading}
          className="bg-gradient-primary hover:shadow-glow transition-smooth"
        >
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Setup Sample Data
        </Button>
      </CardContent>
    </Card>
  );
};

export default DatabaseSetup;