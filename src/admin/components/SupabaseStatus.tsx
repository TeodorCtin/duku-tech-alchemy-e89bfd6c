import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';

const SupabaseStatus = () => {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [projectCount, setProjectCount] = useState(0);
  const [error, setError] = useState<string>('');
  const [details, setDetails] = useState<string>('');

  const testConnection = async () => {
    setStatus('loading');
    setError('');
    setDetails('');
    
    try {
      console.log('Testing Supabase connection...');
      console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
      console.log('Key:', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...');

      // Test basic connection
      const { data, error, count } = await supabase
        .from('projects')
        .select('*', { count: 'exact' });

      console.log('Supabase response:', { data, error, count });

      // Also test featured projects specifically
      const { data: featuredData, error: featuredError } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true);
      
      console.log('Featured projects:', { featuredData, featuredError });

      if (error) {
        setStatus('error');
        setError(`${error.code}: ${error.message}`);
        setDetails(error.details || '');
      } else {
        setStatus('connected');
        setProjectCount(count || data?.length || 0);
        console.log('Projects found:', data);
        console.log('Featured projects found:', featuredData);
      }
    } catch (err) {
      console.error('Connection error:', err);
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <Card className="bg-glass-bg backdrop-blur-sm border border-glass-border shadow-elevated hover:shadow-glow transition-smooth">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {status === 'loading' && <Loader2 className="w-6 h-6 animate-spin text-primary" />}
            {status === 'connected' && <CheckCircle className="w-6 h-6 text-primary" />}
            {status === 'error' && <XCircle className="w-6 h-6 text-destructive" />}
            <span className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent font-['Playfair_Display']">
              Database Connection
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={testConnection}
            disabled={status === 'loading'}
            className="bg-glass-bg backdrop-blur-sm border-glass-border hover:bg-primary/10 hover:border-primary/30 transition-smooth"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Test Again
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Status:</span>
            <Badge 
              variant={status === 'connected' ? 'default' : status === 'error' ? 'destructive' : 'secondary'}
              className={`px-4 py-2 rounded-xl shadow-subtle ${
                status === 'connected' 
                  ? 'bg-gradient-primary text-primary-foreground shadow-glow' 
                  : status === 'error' 
                    ? 'bg-destructive/20 text-destructive border-destructive/30' 
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {status === 'loading' ? 'Connecting...' : status === 'connected' ? 'Connected' : 'Error'}
            </Badge>
          </div>
          
          {status === 'connected' && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Projects:</span>
              <Badge variant="outline" className="px-4 py-2 rounded-xl bg-card/50 border-primary/20 text-foreground shadow-subtle">
                {projectCount}
              </Badge>
            </div>
          )}
        </div>
        
        {status === 'error' && (
          <div className="space-y-3">
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
              <strong>Error:</strong> {error}
              {details && (
                <div className="mt-1 text-xs">{details}</div>
              )}
            </div>
            
            {error.includes('Invalid API key') && (
              <div className="text-sm text-blue-600 bg-blue-50 p-3 rounded">
                <strong>🔧 Setup Required:</strong>
                <ol className="mt-2 ml-4 list-decimal space-y-1 text-xs">
                  <li>Go to <a href="https://app.supabase.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">Supabase Dashboard</a></li>
                  <li>Select your project: <code className="bg-white px-1 rounded">dfkkvjltkwytsbtnudig</code></li>
                  <li>Navigate to Settings → API</li>
                  <li>Copy the <strong>anon/public</strong> key</li>
                  <li>Update <code className="bg-white px-1 rounded">.env.local</code> with the correct key</li>
                  <li>Run the <code className="bg-white px-1 rounded">database/setup.sql</code> script in SQL Editor</li>
                  <li>Restart the dev server</li>
                </ol>
              </div>
            )}
            
            {(error.includes('relation') || error.includes('does not exist')) && (
              <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded">
                <strong>📋 Database Setup Required:</strong>
                <p className="mt-1 text-xs">The projects table doesn't exist. Please run the SQL script in <code className="bg-white px-1 rounded">database/setup.sql</code> in your Supabase SQL Editor.</p>
              </div>
            )}
          </div>
        )}
        
        <div className="p-4 rounded-xl bg-card/30 border border-primary/10 backdrop-blur-sm">
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">Database URL:</span>
              <code className="text-primary/80">{import.meta.env.VITE_SUPABASE_URL}</code>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">API Key:</span>
              <code className="text-primary/80">{import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20)}...</code>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseStatus;