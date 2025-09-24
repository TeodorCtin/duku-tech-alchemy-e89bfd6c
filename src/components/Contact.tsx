import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();
  const revealRef = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the form data to a backend
    toast({
      title: "Message sent successfully!",
      description: "I'll get back to you as soon as possible.",
    });
    
    // Reset form
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
        <div ref={revealRef} className="text-center mb-16 animate-reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="gradient-text-animated">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's discuss how we can work together to bring your digital vision to life.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="card-gradient border-border hover-lift hover-glow animate-reveal">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-muted/30 border-border focus:border-primary transition-all duration-300 hover:border-primary/50"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-muted/30 border-border focus:border-primary transition-all duration-300 hover:border-primary/50"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-muted/30 border-border focus:border-primary resize-none transition-all duration-300 hover:border-primary/50"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full button-premium glow-effect"
                  size="lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Social Links */}
          <div className="space-y-6 animate-reveal" style={{ animationDelay: "0.3s" }}>
            <div className="card-gradient p-6 rounded-xl shadow-card hover-lift">
              <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
              <div className="space-y-4">
                <a 
                  href="https://linkedin.com/in/duku-constantin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 group magnetic"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">LinkedIn Profile</span>
                </a>
                <a 
                  href="https://github.com/duku-constantin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 group magnetic"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">GitHub Profile</span>
                </a>
              </div>
            </div>
            
            <div className="card-gradient p-6 rounded-xl shadow-card hover-lift">
              <h3 className="text-xl font-semibold mb-2">Let's collaborate</h3>
              <p className="text-muted-foreground">
                Open to discussing new opportunities, partnerships, and innovative projects that push the boundaries of technology and business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;