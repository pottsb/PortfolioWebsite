'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'

const CONTACT_HASH = '#contact'
const PULSE_DURATION_MS = 1300
const PULSE_STAGGER_MS = 90
const SCROLL_SETTLE_MS = 140
const BOTTOM_TOLERANCE_PX = 2

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
    href: 'mailto:peter@bedfordit.co.uk',
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
  const scrollWaitRafIdRef = useRef<number | null>(null)

  const triggerPulse = useCallback(() => {
    setPulse(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPulse(true))
    })
  }, [])

  const cancelPendingScrollWait = useCallback(() => {
    if (scrollWaitRafIdRef.current === null) return
    cancelAnimationFrame(scrollWaitRafIdRef.current)
    scrollWaitRafIdRef.current = null
  }, [])

  const isAtPageBottom = useCallback((): boolean => {
    const doc = document.documentElement
    const bottom = window.scrollY + window.innerHeight
    return bottom >= doc.scrollHeight - BOTTOM_TOLERANCE_PX
  }, [])

  const triggerPulseAfterScrollSettlesAtBottom = useCallback(() => {
    cancelPendingScrollWait()

    let lastScrollY = window.scrollY
    let lastHeight = document.documentElement.scrollHeight
    let settledSince = performance.now()

    const check = (now: number) => {
      const currentY = window.scrollY
      const currentHeight = document.documentElement.scrollHeight
      const moved = Math.abs(currentY - lastScrollY) > 0.5 || currentHeight !== lastHeight

      if (moved) {
        lastScrollY = currentY
        lastHeight = currentHeight
        settledSince = now
      }

      if (now - settledSince >= SCROLL_SETTLE_MS) {
        scrollWaitRafIdRef.current = null
        if (window.location.hash === CONTACT_HASH && isAtPageBottom()) {
          triggerPulse()
        }
        return
      }

      scrollWaitRafIdRef.current = requestAnimationFrame(check)
    }

    scrollWaitRafIdRef.current = requestAnimationFrame(check)
  }, [cancelPendingScrollWait, isAtPageBottom, triggerPulse])

  useEffect(() => {
    if (!pulse) return
    const total = PULSE_DURATION_MS + PULSE_STAGGER_MS * (socialLinks.length - 1)
    const t = setTimeout(() => setPulse(false), total)
    return () => clearTimeout(t)
  }, [pulse])

  useEffect(() => {
    const schedulePulseIfContactHash = () => {
      if (window.location.hash !== CONTACT_HASH) return
      triggerPulseAfterScrollSettlesAtBottom()
    }

    schedulePulseIfContactHash()
    window.addEventListener('hashchange', schedulePulseIfContactHash)
    return () => {
      window.removeEventListener('hashchange', schedulePulseIfContactHash)
      cancelPendingScrollWait()
    }
  }, [cancelPendingScrollWait, triggerPulseAfterScrollSettlesAtBottom])

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
      triggerPulseAfterScrollSettlesAtBottom()
    }
    document.addEventListener('click', onClickCapture, true)
    return () => document.removeEventListener('click', onClickCapture, true)
  }, [triggerPulseAfterScrollSettlesAtBottom])

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
