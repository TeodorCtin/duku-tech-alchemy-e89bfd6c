import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye, Calendar, Clock } from "lucide-react";
import postsData from "../data/posts.json";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  status: string;
  featured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

const BlogEditor = () => {
  const [posts, setPosts] = useState<BlogPost[]>(postsData);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSavePost = (postData: Partial<BlogPost>) => {
    if (editingPost) {
      // Update existing post
      const updatedPosts = posts.map(p => 
        p.id === editingPost.id 
          ? { 
              ...p, 
              ...postData, 
              updatedAt: new Date().toISOString(),
              publishedAt: postData.status === "published" && !p.publishedAt 
                ? new Date().toISOString() 
                : p.publishedAt
            }
          : p
      );
      setPosts(updatedPosts);
    } else {
      // Add new post
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: postData.title || "",
        slug: postData.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || "",
        excerpt: postData.excerpt || "",
        content: postData.content || "",
        author: "Duku Constantin",
        status: postData.status || "draft",
        featured: postData.featured || false,
        tags: postData.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: postData.status === "published" ? new Date().toISOString() : null
      };
      setPosts([...posts, newPost]);
    }
    
    setEditingPost(null);
    setIsDialogOpen(false);
  };

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const BlogPostForm = ({ post }: { post?: BlogPost }) => {
    const [formData, setFormData] = useState({
      title: post?.title || "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
      status: post?.status || "draft",
      featured: post?.featured || false,
      tags: post?.tags.join(", ") || ""
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleSavePost({
        ...formData,
        tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean)
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Blog post title"
            required
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Excerpt</label>
          <Textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
            placeholder="Brief description of the post"
            rows={2}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Content (Markdown)</label>
          <Textarea
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            placeholder="Write your blog post content here..."
            rows={10}
            className="font-mono text-sm"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium">Tags (comma-separated)</label>
          <Input
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
            placeholder="React, AI, Web Development, etc."
          />
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium">Status</label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({...formData, featured: e.target.checked})}
            />
            <label htmlFor="featured" className="text-sm font-medium">Featured</label>
          </div>
        </div>
        
        <div className="flex gap-2 pt-4">
          <Button type="submit" className="flex-1">
            {post ? "Update Post" : "Create Post"}
          </Button>
          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Blog Posts</h2>
          <p className="text-muted-foreground">Create and manage your blog content</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingPost(null)}>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
              </DialogTitle>
            </DialogHeader>
            <BlogPostForm post={editingPost || undefined} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <Badge variant={post.status === "published" ? "default" : "secondary"}>
                      {post.status}
                    </Badge>
                    {post.featured && (
                      <Badge variant="outline">Featured</Badge>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Created: {formatDate(post.createdAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Updated: {formatDate(post.updatedAt)}
                    </div>
                    {post.publishedAt && (
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Published: {formatDate(post.publishedAt)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingPost(post);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeletePost(post.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BlogEditor;