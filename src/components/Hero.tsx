import { Button } from "@/components/ui/button";
import { Github, Linkedin, FileText, ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-primary opacity-5"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 animate-fade-in">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              Software Engineer
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Swagat Tripathy
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Building scalable systems and solving complex problems at Amazon. 
            Passionate about cloud infrastructure, automation, and innovative solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up delay-300">
            <Button size="lg" asChild className="shadow-glow">
              <a href="#projects">View My Work</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 animate-fade-in-up delay-400">
            <a
              href="https://github.com/swagat110"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-smooth"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/swagat-tripathy-110/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-smooth"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://medium.com/@swagattripathy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-smooth"
            >
              <FileText size={24} />
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-accent transition-smooth animate-bounce"
      >
        <ArrowDown size={32} />
      </a>
    </section>
  );
};

export default Hero;
