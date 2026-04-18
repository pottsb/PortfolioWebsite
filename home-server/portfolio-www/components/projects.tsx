import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

type Project = {
  title: string
  description: string
  tags: string[]
  image: string
  github: string
  live?: string
}

const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description:
      'A Next.js website to showcase my projects and skills. Deployed with Docker. Features a live stream of the servers that host it via VPS relay and Nginx secure links.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Docker', 'Nginx'],
    image: '/projects/portfoliowebsite.webp',
    github: 'https://github.com/pottsb/PortfolioWebsite',
  },
  {
    title: 'Open Beacon',
    description:
      'A React Native family location app built with a privacy first approach. All data is encrypted at rest and in transit. Still in development but we plan to release it on Android and iOS allowing for both self-hosted and cloud-hosted options.',
    tags: ['React Native', 'Expo', 'Prisma', 'PostgreSQL', 'S3'],
    image: '/projects/openbeacon.webp',
    github: 'https://github.com/LSP-Software/OpenBeacon',
  },
  {
    title: 'Network Administration Software',
    description: 'A Python based minimal dependency network administration software for computers on isolated networks. Supports WOL and shutting down groups of computers quickly and reliably.',
    tags: ['Python', 'PowerShell', 'Batch', 'Sockets'],
    image: '/projects/networkadministrationsoftware.webp',
    github: 'https://github.com/pottsb/UOD-Network-Administration-Software',
  },
  {
    title: 'Monitor Lizard',
    description: 'A server monitoring tool for windows and linux with a Next.JS frontend and FastAPI backend. Built for quick deployment and simple monitoring of servers. Built for a university group project.',
    tags: ['Next.js', 'Python', 'FastAPI', 'PowerShell', 'Bash', 'Cron', 'Systemd'],
    image: '/projects/monitorlizard.webp',
    github: 'https://github.com/UOD-team-project-2023/ML-monorepo/',
  },
]

export function Projects() {
  return (
    <section id="projects" className="pt-8 pb-12 md:pt-12">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Projects</h2>
        <p className="text-muted-foreground max-w-2xl">
          A selection of projects I&apos;ve worked on. Find even more on my GitHub!
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
              <div className="absolute inset-0 bg-transparent dark:bg-gradient-to-t dark:from-card-image-overlay/70 dark:to-transparent" />
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
