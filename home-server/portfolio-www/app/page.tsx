import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Homelab } from "@/components/homelab"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { InteractiveOrbs } from "@/components/interactive-orbs"

export default function Home() {
  return (
    <>
      <InteractiveOrbs />
      <Navigation />
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-20">
        <Hero />
        <About />
        <Projects />
        <Homelab />
        <Contact />
      </main>
      <footer className="relative z-10 max-w-6xl mx-auto px-6">
        <Footer />
      </footer>
    </>
  )
}
