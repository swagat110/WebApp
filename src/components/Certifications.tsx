import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle } from "lucide-react";

const Certifications = () => {
  const certifications = [
    {
      title: "Fundamentals of LLMs - The LLM Course",
      issuer: "Hugging Face",
      date: "Feb 2026",
      level: "Professional Certificate",
      verified: true,
      credentialId: "Verified",
    },
    {
      title: "AWS Certified AI Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "Nov 2025 - Nov 2028",
      level: "Foundational",
      verified: true,
      credentialId: "Credly Verified",
    },
    {
      title: "AI Agents Fundamentals",
      issuer: "Hugging Face",
      date: "Oct 2025",
      level: "Professional Certificate",
      verified: true,
      credentialId: "Verified",
    },
    {
      title: "AWS Certified Developer Associate",
      issuer: "Amazon Web Services (AWS)",
      date: "Mar 2018 - May 2021",
      level: "Associate",
      verified: true,
      credentialId: "BLGCKW12BERE1X9Z",
    },
    {
      title: "AWS Certified SysOps Administrator Associate",
      issuer: "Amazon Web Services (AWS)",
      date: "May 2018 - May 2021",
      level: "Associate (100% Score)",
      verified: true,
      credentialId: "3B4HMV4KJM4EQQS0",
    },
    {
      title: "AWS Certified Solutions Architect Associate",
      issuer: "Amazon Web Services (AWS)",
      date: "Jul 2017 - Jul 2020",
      level: "Associate",
      verified: true,
      credentialId: "64SG4WD21MEQ1D3V",
    },
    {
      title: "Certified Scrum Master",
      issuer: "Scrum Alliance",
      date: "2024",
      level: "Professional Certificate",
      verified: true,
      credentialId: "704001",
    },
    {
      title: "Design Patterns Thinking",
      issuer: "Project Management Institute",
      date: "2024",
      level: "Professional Certificate",
      verified: true,
    },
  ];

  return (
    <section id="certifications" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
            Certifications & Training
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Professional certifications and continuous learning achievements.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-medium transition-smooth hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Award className="text-accent" size={24} />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-primary">
                        {cert.title}
                      </h3>
                      {cert.verified && (
                        <CheckCircle className="text-accent flex-shrink-0" size={20} />
                      )}
                    </div>
                    <p className="text-muted-foreground font-medium mb-2">
                      {cert.issuer}
                    </p>
                    <div className="flex flex-col gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{cert.level}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {cert.date}
                      </span>
                      {cert.credentialId && (
                        <span className="text-xs text-muted-foreground">
                          ID: {cert.credentialId}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
