'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

const CONTACT_HASH = '#contact'
const PULSE_DURATION_MS = 1300
const PULSE_STAGGER_MS = 90

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/pottsb',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/peter-b-derbyshire',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:hello@example.com',
    icon: Mail,
  },
] as const

function linkGoesToContact(href: string | null): boolean {
  if (!href) return false
  if (href === '#contact' || href === '/#contact') return true
  return /#contact$/.test(href)
}

export function ContactSocialLinks() {
  const [pulse, setPulse] = useState(false)

  const triggerPulse = useCallback(() => {
    setPulse(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPulse(true))
    })
  }, [])

  useEffect(() => {
    if (!pulse) return
    const total = PULSE_DURATION_MS + PULSE_STAGGER_MS * (socialLinks.length - 1)
    const t = setTimeout(() => setPulse(false), total)
    return () => clearTimeout(t)
  }, [pulse])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const schedulePulseIfContactHash = () => {
      if (window.location.hash !== CONTACT_HASH) return
      if (timeoutId !== undefined) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        triggerPulse()
      }, 120)
    }

    schedulePulseIfContactHash()
    window.addEventListener('hashchange', schedulePulseIfContactHash)
    return () => {
      window.removeEventListener('hashchange', schedulePulseIfContactHash)
      if (timeoutId !== undefined) clearTimeout(timeoutId)
    }
  }, [triggerPulse])

  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      const el = e.target
      if (!el || !(el instanceof Element)) return
      const a = el.closest('a')
      const href = a?.getAttribute('href') ?? null
      if (!linkGoesToContact(href)) return
      if (window.location.hash !== CONTACT_HASH) return
      e.preventDefault()
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      triggerPulse()
    }
    document.addEventListener('click', onClickCapture, true)
    return () => document.removeEventListener('click', onClickCapture, true)
  }, [triggerPulse])

  return (
    <div className="flex flex-wrap gap-4">
      {socialLinks.map((link, i) => (
        <Button
          key={link.name}
          variant="social"
          asChild
          className={pulse ? 'animate-contact-social-pulse' : undefined}
          style={pulse ? { animationDelay: `${i * PULSE_STAGGER_MS}ms` } : undefined}
        >
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            <link.icon className="h-4 w-4" />
            <span className="text-sm font-medium">{link.name}</span>
          </a>
        </Button>
      ))}
    </div>
  )
}
