'use client'

import { useEffect, useRef, useState } from 'react'

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
  const draggedOrbRef = useRef<number | null>(null)
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

      if (draggedOrbRef.current !== null) {
        const orb = orbsRef.current[draggedOrbRef.current]
        if (orb) {
          orb.x = e.clientX
          orb.y = e.clientY
          orb.vx = 0
          orb.vy = 0
        }
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true

      // Check if clicking on an orb
      for (let i = orbsRef.current.length - 1; i >= 0; i--) {
        const orb = orbsRef.current[i]
        const dx = e.clientX - orb.x
        const dy = e.clientY - orb.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < orb.size / 2) {
          draggedOrbRef.current = i
          orb.isDragging = true
          break
        }
      }
    }

    const handleMouseUp = () => {
      mouseRef.current.isDown = false

      if (draggedOrbRef.current !== null) {
        const orb = orbsRef.current[draggedOrbRef.current]
        if (orb) {
          orb.isDragging = false
          // Give it a little velocity based on recent movement
          orb.vx = (Math.random() - 0.5) * 2
          orb.vy = (Math.random() - 0.5) * 2
        }
        draggedOrbRef.current = null
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX
        mouseRef.current.y = e.touches[0].clientY

        if (draggedOrbRef.current !== null) {
          const orb = orbsRef.current[draggedOrbRef.current]
          if (orb) {
            orb.x = e.touches[0].clientX
            orb.y = e.touches[0].clientY
            orb.vx = 0
            orb.vy = 0
          }
        }
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.isDown = true
        const touch = e.touches[0]

        for (let i = orbsRef.current.length - 1; i >= 0; i--) {
          const orb = orbsRef.current[i]
          const dx = touch.clientX - orb.x
          const dy = touch.clientY - orb.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < orb.size / 2) {
            draggedOrbRef.current = i
            orb.isDragging = true
            break
          }
        }
      }
    }

    const handleTouchEnd = () => {
      mouseRef.current.isDown = false

      if (draggedOrbRef.current !== null) {
        const orb = orbsRef.current[draggedOrbRef.current]
        if (orb) {
          orb.isDragging = false
          orb.vx = (Math.random() - 0.5) * 2
          orb.vy = (Math.random() - 0.5) * 2
        }
        draggedOrbRef.current = null
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

        // Gentle drift
        orb.vx += (Math.random() - 0.5) * 0.02
        orb.vy += (Math.random() - 0.5) * 0.02

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
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-auto z-0 overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      {orbsRef.current.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full transition-transform duration-75 cursor-grab active:cursor-grabbing"
          style={{
            left: orb.x - orb.size / 2,
            top: orb.y - orb.size / 2,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle at 30% 30%, 
              oklch(0.8 0.12 ${orb.hue} / 0.15), 
              oklch(0.6 0.15 ${orb.hue} / 0.08) 50%, 
              oklch(0.5 0.1 ${orb.hue} / 0.02) 100%)`,
            boxShadow: orb.isDragging
              ? `0 0 40px 10px oklch(0.75 0.16 ${orb.hue} / 0.3), inset 0 0 20px oklch(0.8 0.12 ${orb.hue} / 0.2)`
              : `0 0 30px 5px oklch(0.75 0.16 ${orb.hue} / 0.15), inset 0 0 15px oklch(0.8 0.12 ${orb.hue} / 0.1)`,
            transform: orb.isDragging ? 'scale(1.1)' : 'scale(1)',
            backdropFilter: 'blur(2px)',
          }}
        />
      ))}

      {/* Hint text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-muted-foreground/40 text-xs pointer-events-none select-none opacity-0 animate-[fade-in-up_1s_ease-out_2s_forwards]">
        Try dragging the orbs
      </div>
    </div>
  )
}
