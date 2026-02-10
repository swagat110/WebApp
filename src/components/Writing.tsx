import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText } from "lucide-react";

const Writing = () => {
  const articles = [
    {
      title: "Installing Citrix Workspace App on Raspberry Pi 4",
      description: "A comprehensive guide on setting up Citrix Workspace App on Raspberry Pi 4, covering installation steps, troubleshooting, and optimization tips for running enterprise software on ARM-based systems.",
      date: "Published on Medium",
      link: "https://medium.com/@swagattripathy/installing-citrix-workspace-app-on-raspberry-pi-4b-e14399d4b9f3",
      tags: ["Raspberry Pi", "Citrix", "Linux", "Tutorial"],
    },
  ];

  return (
    <section id="writing" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
            Technical Writing
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Sharing knowledge and insights through detailed technical articles and tutorials.
          </p>

          <div className="space-y-6">
            {articles.map((article, index) => (
              <Card
                key={index}
                className="p-6 md:p-8 hover:shadow-medium transition-smooth hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <FileText className="text-accent" size={24} />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-semibold mb-2 text-primary">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{article.date}</p>
                    <p className="text-muted-foreground mb-4">{article.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" asChild>
                      <a
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Read Article
                        <ExternalLink size={16} />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://medium.com/@swagattripathy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                View All Articles
                <ExternalLink size={18} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Writing;
