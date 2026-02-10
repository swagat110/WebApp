import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { fetchPinnedRepos, type PinnedProject } from "@/lib/github";

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME ?? "swagat110";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const FALLBACK_PROJECTS: PinnedProject[] = [
  {
    title: "MoonRAG",
    description:
      "A Retrieval-Augmented Generation (RAG) project leveraging advanced AI techniques for intelligent document retrieval and response generation.",
    tech: ["Python", "RAG", "AI", "Machine Learning"],
    github: "https://github.com/swagat110/MoonRAG",
  },
];

const Projects = () => {
  const { data: projects = [], isLoading, isError } = useQuery({
    queryKey: ["github-pinned-repos", GITHUB_USERNAME],
    queryFn: () => fetchPinnedRepos(GITHUB_USERNAME, GITHUB_TOKEN),
    enabled: Boolean(GITHUB_TOKEN?.trim()),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const displayProjects =
    projects.length > 0 ? projects : FALLBACK_PROJECTS;

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            A selection of projects showcasing expertise in cloud computing, AI,
            and software development.
          </p>

          {isLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}

          {!isLoading && (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {displayProjects.map((project, index) => (
                <Card
                  key={`${project.title}-${index}`}
                  className="flex flex-col h-full p-6 hover:shadow-medium transition-smooth hover:-translate-y-1"
                >
                  <h3 className="text-xl font-semibold mb-2 text-primary">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-4 min-h-[4.5rem]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github size={16} />
                        Code
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {isError && (
            <p className="text-center text-muted-foreground text-sm mb-4">
              Showing saved projects. Add VITE_GITHUB_TOKEN to load pinned repos
              from GitHub.
            </p>
          )}

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                View All Projects
                <ExternalLink size={18} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
