import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Linkedin, Github, FileText } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            I'm always interested in hearing about new opportunities, collaborations, or just having a chat about technology.
          </p>

          <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-muted/20">
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <a
                href="mailto:swagattripathy@example.com"
                className="flex items-center justify-center gap-3 p-4 bg-background rounded-lg hover:shadow-medium transition-smooth hover:-translate-y-1"
              >
                <Mail className="text-accent" size={24} />
                <span className="font-medium">Email Me</span>
              </a>
              <a
                href="https://www.linkedin.com/in/swagat-tripathy-110/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-4 bg-background rounded-lg hover:shadow-medium transition-smooth hover:-translate-y-1"
              >
                <Linkedin className="text-accent" size={24} />
                <span className="font-medium">LinkedIn</span>
              </a>
              <a
                href="https://github.com/swagat110"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-4 bg-background rounded-lg hover:shadow-medium transition-smooth hover:-translate-y-1"
              >
                <Github className="text-accent" size={24} />
                <span className="font-medium">GitHub</span>
              </a>
              <a
                href="https://medium.com/@swagattripathy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 p-4 bg-background rounded-lg hover:shadow-medium transition-smooth hover:-translate-y-1"
              >
                <FileText className="text-accent" size={24} />
                <span className="font-medium">Medium</span>
              </a>
            </div>

            <Button size="lg" className="shadow-glow" asChild>
              <a href="mailto:swagattripathy@example.com">
                Send Message
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
