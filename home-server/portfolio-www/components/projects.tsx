import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const projects = [
  {
    title: 'Project Alpha',
    description:
      'A full-stack web application built with Next.js and PostgreSQL. Features real-time updates and user authentication.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind'],
    image: '/projects/project-alpha.jpg',
    github: '#',
    live: '#',
  },
  {
    title: 'Infrastructure Monitor',
    description:
      'Custom monitoring dashboard for homelab infrastructure. Tracks server health, network status, and resource usage.',
    tags: ['Python', 'Grafana', 'Prometheus', 'Docker'],
    image: '/projects/infra-monitor.jpg',
    github: '#',
    live: '#',
  },
  {
    title: 'API Gateway',
    description:
      'Self-hosted API gateway with rate limiting, authentication, and request logging for microservices architecture.',
    tags: ['Go', 'Redis', 'Docker', 'Nginx'],
    image: '/projects/api-gateway.jpg',
    github: '#',
  },
  {
    title: 'Automation Scripts',
    description:
      'Collection of automation scripts for server provisioning, backup management, and system maintenance.',
    tags: ['Bash', 'Ansible', 'Python', 'Cron'],
    image: '/projects/automation.jpg',
    github: '#',
  },
]

export function Projects() {
  return (
    <section id="projects" className="pt-8 pb-12 md:py-24">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Projects</h2>
        <p className="text-muted-foreground max-w-2xl">
          A selection of projects I&apos;ve worked on, from web applications to infrastructure
          tooling.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className="group relative bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Screenshot */}
            <div className="relative h-48 w-full overflow-hidden bg-secondary">
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-1 bg-secondary text-secondary-foreground rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                {project.github && (
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <a href={project.github}>
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}
                {project.live && (
                  <Button variant="primary" size="sm" asChild className="flex-1">
                    <a href={project.live}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
