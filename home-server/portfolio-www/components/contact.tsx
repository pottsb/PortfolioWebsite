"use client"

import { Mail, Github, Linkedin, Twitter } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
  },
  {
    name: "Email",
    href: "mailto:hello@example.com",
    icon: Mail,
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-border">
      <div className="max-w-xl">
        <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Have a project in mind or just want to chat about tech? 
          I&apos;m always happy to connect and discuss ideas.
        </p>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <link.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
