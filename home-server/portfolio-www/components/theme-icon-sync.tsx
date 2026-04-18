'use client'

import { useEffect } from 'react'

type ThemeName = 'dark' | 'light'

const faviconByTheme: Record<ThemeName, string> = {
  dark: '/icons/dark/favicon.ico',
  light: '/icons/light/favicon.ico',
}

function getActiveTheme(): ThemeName {
  if (document.documentElement.classList.contains('light')) return 'light'
  if (document.documentElement.classList.contains('dark')) return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function updateFavicon(theme: ThemeName) {
  const href = faviconByTheme[theme]
  const links = document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]')

  if (links.length === 0) {
    const fallbackFavicon = document.createElement('link')
    fallbackFavicon.rel = 'icon'
    fallbackFavicon.type = 'image/x-icon'
    fallbackFavicon.href = href
    document.head.appendChild(fallbackFavicon)
    return
  }

  links.forEach((link) => {
    link.href = href
  })
}

export function ThemeIconSync() {
  useEffect(() => {
    const root = document.documentElement
    const syncFavicon = () => updateFavicon(getActiveTheme())

    syncFavicon()

    const observer = new MutationObserver(syncFavicon)
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  return null
}
