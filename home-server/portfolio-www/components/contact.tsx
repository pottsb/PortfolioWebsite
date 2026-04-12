'use client'

import { Github, Linkedin, Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:hello@example.com',
    icon: Mail,
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-border">
      <div className="max-w-xl">
        <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Have a project in mind or just want to chat about tech? I&apos;m always happy to connect
          and discuss ideas.
        </p>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4">
          {socialLinks.map((link) => (
            <Button key={link.name} variant="social" asChild>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                <link.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{link.name}</span>
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
