import { Home } from 'lucide-react'
import Link from 'next/link'

import { Footer } from '@/components/footer'
import { InteractiveOrbs } from '@/components/interactive-orbs'
import { Navigation } from '@/components/navigation'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <>
      <InteractiveOrbs />
      <Navigation />
      <main className="relative z-10 mx-auto min-w-0 max-w-6xl px-6 pt-20">
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
          {/* Decorative gradient orbs (match hero) */}
          <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/20 opacity-50 blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 -right-32 h-64 w-64 rounded-full bg-primary/10 opacity-50 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-lg">
            <p className="mb-2 font-mono text-sm text-muted-foreground opacity-0 animate-fade-in-up animation-delay-100">
              Error 404
            </p>
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl opacity-0 animate-fade-in-up animation-delay-200">
              <span className="text-foreground">Page </span>
              <span className="text-primary">not found</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground text-balance leading-relaxed opacity-0 animate-fade-in-up animation-delay-300">
              That URL does not exist on this site. You can head back to the homepage and continue
              from there.
            </p>
            <div className="flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in-up animation-delay-400">
              <Button variant="heroPrimary" asChild>
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Back home
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
