'use client'

import { ArrowDown, Code2, Mail, Server } from 'lucide-react'

export function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center relative">
      {/* Decorative gradient orb */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative z-10">
        {/* Large name */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in-up animation-delay-100">
          <span className="text-balance text-foreground">Hi, I&apos;m </span>
          <span className="text-primary">Your Name</span>
        </h1>

        {/* Roles - smaller */}
        <h2 className="mb-6 flex flex-wrap items-center gap-3 text-xl text-muted-foreground sm:text-2xl opacity-0 animate-fade-in-up animation-delay-200">
          <Code2 className="h-6 w-6 text-primary" />
          Software Developer
          <span className="text-border">•</span>
          <Server className="h-6 w-6 text-primary" />
          System Administrator
        </h2>

        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed mb-8 opacity-0 animate-fade-in-up animation-delay-300">
          I build robust applications and maintain the infrastructure that powers them. From code to
          server rack, I enjoy every layer of the stack.
        </p>

        {/* CTA Links */}
        <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up animation-delay-400">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <Mail className="h-4 w-4" />
            Get in touch
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary border border-border text-secondary-foreground text-sm font-medium rounded-lg hover:bg-accent transition-colors dark:hover:text-black"
          >
            View projects
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up animation-delay-600">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs">Scroll</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
