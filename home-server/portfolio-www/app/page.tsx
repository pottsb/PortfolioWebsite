import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Homelab } from '@/components/homelab'
import { InteractiveOrbs } from '@/components/interactive-orbs'
import { Navigation } from '@/components/navigation'
import { Projects } from '@/components/projects'

export default function Home() {
  return (
    <>
      <InteractiveOrbs />
      <Navigation />
      <main className="relative z-10 mx-auto min-w-0 max-w-6xl px-6 pt-20">
        <Hero />
        <About />
        <Projects />
        <Homelab />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
