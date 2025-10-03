import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";

const MinimalContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple form handling - in a real app, this would send to an API
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-8 text-foreground">
            Contact
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-foreground">
              Let's connect
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              I'm always interested in new opportunities and collaborations. 
              Feel free to reach out if you'd like to work together.
            </p>
            
            <div className="space-y-4">
              <a 
                href="mailto:hello@dukuconstantin.dev" 
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="w-5 h-5 mr-3" />
                hello@dukuconstantin.dev
              </a>
              <a 
                href="https://linkedin.com/in/dukuconstantin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5 mr-3" />
                LinkedIn
              </a>
              <a 
                href="https://github.com/dukuconstantin" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5 mr-3" />
                GitHub
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-white border border-border">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-foreground">
                Send a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background border-border"
                  />
                </div>
                
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background border-border"
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    className="bg-background border-border resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-foreground text-background hover:bg-muted-foreground"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MinimalContact;