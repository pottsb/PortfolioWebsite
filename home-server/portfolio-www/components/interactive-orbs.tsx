'use client'

import { type CSSProperties, useEffect, useRef, useState } from 'react'

interface Orb {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseSize: number
  hue: number
  isDragging: boolean
}

export function InteractiveOrbs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const orbsRef = useRef<Orb[]>([])
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | undefined>(undefined)
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Initialize orbs
    const numOrbs = 8
    const orbs: Orb[] = []

    for (let i = 0; i < numOrbs; i++) {
      orbs.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 60 + Math.random() * 80,
        baseSize: 60 + Math.random() * 80,
        hue: 35 + Math.random() * 20, // Warm amber/orange hues
        isDragging: false,
      })
    }
    orbsRef.current = orbs

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY

    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX
        mouseRef.current.y = e.touches[0].clientY
      }
    }

    // Animation loop
    const animate = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      orbsRef.current.forEach((orb) => {
        if (orb.isDragging) return

        // Mouse interaction - gentle push away
        const dx = orb.x - mouseRef.current.x
        const dy = orb.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 150 && dist > 0) {
          const force = ((150 - dist) / 150) * 0.3
          orb.vx += (dx / dist) * force
          orb.vy += (dy / dist) * force
        }

        // Apply velocity with damping
        orb.x += orb.vx
        orb.y += orb.vy
        orb.vx *= 0.98
        orb.vy *= 0.98

        // Bounce off edges with padding
        const padding = orb.size / 2
        if (orb.x < padding) {
          orb.x = padding
          orb.vx *= -0.5
        }
        if (orb.x > width - padding) {
          orb.x = width - padding
          orb.vx *= -0.5
        }
        if (orb.y < padding) {
          orb.y = padding
          orb.vy *= -0.5
        }
        if (orb.y > height - padding) {
          orb.y = height - padding
          orb.vy *= -0.5
        }

        // Pulsate size slightly
        orb.size = orb.baseSize + Math.sin(Date.now() / 1000 + orb.id) * 5
      })

      forceUpdate((n) => n + 1)
      animationRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="interactive-orbs fixed inset-0 pointer-events-auto z-0 overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      {orbsRef.current.map((orb) => (
        <div
          key={orb.id}
          className="interactive-orb-sphere absolute rounded-full transition-transform duration-75"
          style={
            {
              '--orb-hue': orb.hue,
              left: orb.x - orb.size / 2,
              top: orb.y - orb.size / 2,
              width: orb.size,
              height: orb.size,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
