import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { triggerConfetti } from "./ConfettiEffect";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const revealRef = useScrollReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Comprehensive validation with inline errors
    const errors = {
      name: "",
      email: "",
      message: ""
    };
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email address";
      }
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    
    // If there are errors, show them inline
    if (errors.name || errors.email || errors.message) {
      setFormErrors(errors);
      toast({
        title: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual backend endpoint or service (Formspree, EmailJS, etc.)
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Trigger celebration effect
      triggerConfetti();
      
      toast({
        title: "🎉 Message sent successfully!",
        description: "I'll get back to you as soon as possible.",
      });
      
      // Reset form and errors
      setFormData({ name: "", email: "", message: "" });
      setFormErrors({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    
    // Real-time email validation
    if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setFormErrors(prev => ({
          ...prev,
          email: "Please enter a valid email address"
        }));
      }
    }
  };

  return (
    <section id="contact" className="py-12 md:py-20 section-premium" aria-labelledby="contact-heading">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div ref={revealRef} className="text-center mb-16 animate-reveal">
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-display font-bold mb-4">
            Get in <span className="gradient-text-animated">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's discuss how we can work together to bring your digital vision to life.
          </p>
        </div>
        
        <div className="flex flex-col items-center max-w-2xl mx-auto space-y-12">
          {/* Social Links - Centered */}
          <div className="w-full space-y-6">
            <div className="bg-background border border-primary/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary text-center">Connect with me</h3>
              <div className="space-y-4">
                <a 
                  href="https://linkedin.com/in/duku-constantin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg text-foreground hover:bg-primary/20 transition-all"
                >
                  <Linkedin className="w-5 h-5 text-primary" />
                  <span>LinkedIn Profile</span>
                </a>
                <a 
                  href="https://github.com/teodor-vladconstantin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg text-foreground hover:bg-primary/20 transition-all"
                >
                  <Github className="w-5 h-5 text-primary" />
                  <span>GitHub Profile</span>
                </a>
                <a 
                  href="mailto:duku@joben.eu" 
                  className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg text-foreground hover:bg-primary/20 transition-all"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <span>duku@joben.eu</span>
                </a>
              </div>
            </div>
            
            <div className="bg-background border border-primary/20 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2 text-primary text-center">Let's collaborate</h3>
              <p className="text-muted-foreground text-center">
                Open to discussing new opportunities, partnerships, and innovative projects.
              </p>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default Contact;