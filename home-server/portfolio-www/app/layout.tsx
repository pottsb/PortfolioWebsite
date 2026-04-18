import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

const siteUrl = 'https://bedfordit.co.uk'
const siteName = 'bedfordit.co.uk'
const title = 'Peter Bedford - Software Developer & System Administrator'
const description =
  'Software developer, system administrator, and self-hosting enthusiast. Building robust applications and maintaining the infrastructure that powers them. From code to server rack, I enjoy every layer of the stack.'
const socialDescription =
  "Peter Bedford's portfolio — software development, systems administration, and self-hosted infrastructure."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName,
    title,
    description: socialDescription,
    images: [
      {
        url: '/meta/narrow.png',
        width: 345,
        height: 158,
        alt: 'Peter Bedford — Software Developer and System Administrator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: socialDescription,
    images: ['/meta/narrow.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#f97316',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
