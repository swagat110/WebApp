import { Briefcase, GraduationCap, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            AI-driven DevOps Engineer passionate about automation and scalable architecture.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="p-6 hover:shadow-medium transition-smooth">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Experience</h3>
              <p className="text-muted-foreground">
                System Development Engineer II at Amazon (Oct 2021 – Present), building GenAI-powered RAG systems on AWS Bedrock, 
                automating security controls deployment, and scaling tier-1 infrastructure for high-traffic events.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medium transition-smooth">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Impact</h3>
              <p className="text-muted-foreground">
                Cut deployment time by 65%, reduced incident detection time by 50%, increased production velocity by 30%, 
                and delivered $200k+ annual cost savings on tier-1 systems.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-medium transition-smooth">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="text-accent" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expertise</h3>
              <p className="text-muted-foreground">
                AWS (Bedrock, SageMaker, RDS, CloudWatch, CDK), Java, Python, GenAI & RAG, MCP, DevOps, and incident response for large-scale systems.
              </p>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-br from-card to-muted/20">
            <p className="text-lg leading-relaxed text-foreground">
              At Amazon I design and deploy Generative AI–powered systems—including a RAG platform on AWS Bedrock that accelerates security control development—and 
              build automated pipelines that crawl SDKs, codebases, and CloudFormation schemas for LLM-driven control generation. I've built MCP servers for AI–RAG 
              integration, a GenAI Audit system for launch impact on security controls, and have optimized our deployment platform to serve 200,000+ customers while 
              cutting deployment time by 65%. I've scaled fleet infrastructure for Prime Day, Black Friday, and Cyber Monday; led a zero-downtime Postgres 10→12 upgrade 
              across 300+ RDS instances; and directed incident response for tier-1 systems using Java, Python, and Linux. I'm focused on harnessing GenAI and automation 
              to improve efficiency, reliability, and innovation in high-scale environments.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
