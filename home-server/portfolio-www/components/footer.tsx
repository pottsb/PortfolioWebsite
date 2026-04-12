import { Server } from 'lucide-react'

export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} · Built with Next.js</p>
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-primary" />
          <span>Self-hosted on my homelab</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
        </div>
      </div>
    </footer>
  )
}
