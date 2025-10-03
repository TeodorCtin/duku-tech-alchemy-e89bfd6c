import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, RefreshCw } from "lucide-react";
import contentData from "../data/content.json";

interface ContentData {
  site: {
    title: string;
    description: string;
    author: string;
    email: string;
    linkedin: string;
    github: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  about: {
    title: string;
    content: string;
  };
  skills: {
    development: string[];
    ai: string[];
    management: string[];
  };
}

const ContentEditor = () => {
  const [content, setContent] = useState<ContentData>(contentData);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleContentChange = (section: keyof ContentData, field: string, value: string | string[]) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSkillsChange = (category: keyof ContentData['skills'], value: string) => {
    const skills = value.split(',').map(s => s.trim()).filter(Boolean);
    setContent(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: skills
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasChanges(false);
      console.log('Content saved:', content);
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all changes?')) {
      setContent(contentData);
      setHasChanges(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Content Management</h2>
          <p className="text-muted-foreground">Edit website content and information</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Site Information */}
        <Card>
          <CardHeader>
            <CardTitle>Site Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Site Title</label>
              <Input
                value={content.site.title}
                onChange={(e) => handleContentChange('site', 'title', e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={content.site.description}
                onChange={(e) => handleContentChange('site', 'description', e.target.value)}
                rows={3}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Author</label>
              <Input
                value={content.site.author}
                onChange={(e) => handleContentChange('site', 'author', e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={content.site.email}
                onChange={(e) => handleContentChange('site', 'email', e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">LinkedIn URL</label>
              <Input
                value={content.site.linkedin}
                onChange={(e) => handleContentChange('site', 'linkedin', e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">GitHub URL</label>
              <Input
                value={content.site.github}
                onChange={(e) => handleContentChange('site', 'github', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Main Title</label>
              <Input
                value={content.hero.title}
                onChange={(e) => handleContentChange('hero', 'title', e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Subtitle</label>
              <Input
                value={content.hero.subtitle}
                onChange={(e) => handleContentChange('hero', 'subtitle', e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={content.hero.description}
                onChange={(e) => handleContentChange('hero', 'description', e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>About Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input
                value={content.about.title}
                onChange={(e) => handleContentChange('about', 'title', e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={content.about.content}
                onChange={(e) => handleContentChange('about', 'content', e.target.value)}
                rows={6}
                placeholder="Write about yourself, your experience, and what you do..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Skills Section */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Skills Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Development Skills (comma-separated)</label>
              <Input
                value={content.skills.development.join(', ')}
                onChange={(e) => handleSkillsChange('development', e.target.value)}
                placeholder="HTML, CSS, JavaScript, React, etc."
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">AI & Data Skills (comma-separated)</label>
              <Input
                value={content.skills.ai.join(', ')}
                onChange={(e) => handleSkillsChange('ai', e.target.value)}
                placeholder="Machine Learning, NLP, etc."
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Management Skills (comma-separated)</label>
              <Input
                value={content.skills.management.join(', ')}
                onChange={(e) => handleSkillsChange('management', e.target.value)}
                placeholder="Agile/Scrum, Product Strategy, etc."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {hasChanges && (
        <div className="fixed bottom-6 right-6 bg-card border rounded-lg p-4 shadow-lg">
          <p className="text-sm text-muted-foreground mb-2">You have unsaved changes</p>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} disabled={isSaving}>
              Save Now
            </Button>
            <Button size="sm" variant="outline" onClick={handleReset}>
              Discard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentEditor;