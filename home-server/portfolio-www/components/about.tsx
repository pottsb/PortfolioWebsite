"use client"

import { Code2, Server, Terminal, Wrench } from "lucide-react"

const skills = [
  {
    category: "Development",
    icon: Code2,
    items: ["TypeScript", "React", "Next.js", "Python", "Go", "Node.js"],
  },
  {
    category: "Infrastructure",
    icon: Server,
    items: ["Linux", "Docker", "Kubernetes", "Proxmox", "Ansible", "Terraform"],
  },
  {
    category: "DevOps",
    icon: Terminal,
    items: ["CI/CD", "GitHub Actions", "Nginx", "Monitoring", "Logging", "Backup"],
  },
  {
    category: "Networking",
    icon: Wrench,
    items: ["TCP/IP", "DNS", "VPN", "Firewalls", "VLANs", "Load Balancing"],
  },
]

export function About() {
  return (
    <section id="about" className="py-24 border-t border-border">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Bio */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6">About Me</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a software developer and system administrator with a passion for 
              building things that work reliably. Whether it&apos;s a web application 
              or a server cluster, I care deeply about clean code and solid infrastructure.
            </p>
            <p>
              My journey started with curiosity about how things work under the hood. 
              That curiosity led me from writing my first scripts to running my own 
              homelab with multiple servers, learning something new with every project.
            </p>
            <p>
              When I&apos;m not coding or tinkering with servers, you&apos;ll find me exploring 
              new technologies, contributing to open source, or documenting what I&apos;ve learned 
              to help others on similar paths.
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
