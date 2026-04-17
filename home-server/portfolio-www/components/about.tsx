import { Code2, DatabaseIcon, Server, Terminal } from 'lucide-react'

const skills = [
  {
    category: 'Development',
    icon: Code2,
    items: [
      'JavaScript / TypeScript',
      'PHP',
      'Python',
      'C / C++',
      'Java',
      'LUA',
      'HTML, CSS',
      'Tailwind',
      'Bash',
      'PowerShell',
    ],
  },
  {
    category: 'Infrastructure',
    icon: Server,
    items: [
      'Linux & Windows Server',
      'Docker',
      'Proxmox',
      'ESXI',
      'Networking',
      'firewalls',
      'VPNs',
    ],
  },
  {
    category: 'DevOps',
    icon: Terminal,
    items: [
      'CI/CD pipelines',
      'GitHub Actions',
      'Automation & scripting',
      'Monitoring',
      'Logging & alerting',
    ],
  },
  {
    category: 'Data & Messaging',
    icon: DatabaseIcon,
    items: ['Prisma', 'MySQL', 'PostgreSQL', 'Redis', 'InfluxDB', 'MQTT'],
  },
]

export function About() {
  return (
    <section id="about" className="border-t border-border pt-24 pb-8 md:py-16">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Bio */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6">About Me</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I started out fixing computers, maintaining networks, and working with small
              businesses, both independently and in an MSP environment. That gave me experience
              across a wide range of systems early on, from troubleshooting individual machines to
              managing larger infrastructure. Since then, I’ve moved into backend development and
              Linux systems, building automation and tools to make systems easier to run and
              maintain.
            </p>

            <p>
              I got started by running my own servers and learning how systems fit together from the
              ground up. That hands-on experience shaped how I work today. I still run a homelab
              where I test ideas, try new tools, and host services for friends and family. It’s
              where I learn the most and keep improving what I do day to day.
            </p>

            <p>
              At the moment, I split my time between system administration consulting work and
              building projects with LSP Software, a small company I run with a few friends. We work
              on ideas and projects in our spare time, which gives me the chance to keep building
              and experimenting outside of day-to-day work. I’m currently looking for a full-time
              role where I can continue to learn, grow, and take the next step in my career.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-6">Skills &amp; Tools</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div key={skill.category}>
                <div className="flex items-center gap-2 mb-3">
                  <skill.icon className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">{skill.category}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
