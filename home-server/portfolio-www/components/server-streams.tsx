'use client'

import { clsx } from 'clsx'
import Hls from 'hls.js'
import { Eye, Loader2, Server, Wifi, WifiOff } from 'lucide-react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { z } from 'zod'
import { Button } from '@/components/ui/button'

const streamCamUrlsSchema = z.object({
  cam1: z.string().url(),
  cam2: z.string().url(),
})

type StreamCamUrls = z.infer<typeof streamCamUrlsSchema>

const STREAM_URL_REFETCH_MS = 250_000

/** cam1 = rear rack, cam2 = front rack */
function urlForView(view: 'front' | 'back', urls: StreamCamUrls): string {
  return view === 'front' ? urls.cam2 : urls.cam1
}

async function fetchStreamCamUrls(path: string): Promise<StreamCamUrls | null> {
  try {
    const response = await fetch(path, { method: 'GET' })

    if (!response.ok) {
      throw new Error('API request failed')
    }

    const raw: unknown = await response.json()
    const parsed = streamCamUrlsSchema.safeParse(raw)
    if (!parsed.success) {
      console.error(`Invalid stream API response from ${path}:`, parsed.error.flatten())
      return null
    }
    return parsed.data
  } catch (err) {
    console.error(`Failed to fetch ${path}:`, err)
    return null
  }
}

function HlsLiveVideo({
  src,
  poster,
  className,
  onStreamFramesVisible,
}: {
  src: string
  poster?: string
  className?: string
  onStreamFramesVisible?: (visible: boolean) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const onFramesVisibleRef = useRef(onStreamFramesVisible)
  onFramesVisibleRef.current = onStreamFramesVisible

  useEffect(() => {
    onFramesVisibleRef.current?.(false)
    const video = videoRef.current
    if (!video) return

    const markVisible = () => onFramesVisibleRef.current?.(true)

    let hls: Hls | null = null

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      })
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls?.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls?.recoverMediaError()
              break
            default:
              onFramesVisibleRef.current?.(false)
              hls?.destroy()
              hls = null
              break
          }
        }
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    }

    video.addEventListener('loadeddata', markVisible)
    video.addEventListener('playing', markVisible)

    void video.play().catch(() => {})

    return () => {
      video.removeEventListener('loadeddata', markVisible)
      video.removeEventListener('playing', markVisible)
      onFramesVisibleRef.current?.(false)
      hls?.destroy()
      video.removeAttribute('src')
      video.load()
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      poster={poster}
      className={twMerge(clsx('h-full w-full object-cover', className))}
      playsInline
      muted
      autoPlay
    />
  )
}

export function ServerStreams() {
  const [streamUrls, setStreamUrls] = useState<StreamCamUrls | null>(null)
  const [thumbUrls, setThumbUrls] = useState<StreamCamUrls | null>(null)
  const [urlsLoading, setUrlsLoading] = useState(true)
  const [activeView, setActiveView] = useState<'front' | 'back'>('front')
  const [streamFramesVisible, setStreamFramesVisible] = useState(false)

  useEffect(() => {
    let cancelled = false

    void fetchStreamCamUrls('/api/stream-thumbnails').then((urls) => {
      if (!cancelled) setThumbUrls(urls)
    })
    void fetchStreamCamUrls('/api/stream-urls').then((streams) => {
      if (cancelled) return
      setStreamUrls(streams)
      setUrlsLoading(false)
    })

    const intervalId = window.setInterval(() => {
      void fetchStreamCamUrls('/api/stream-thumbnails').then((urls) => {
        if (!cancelled && urls != null) setThumbUrls(urls)
      })
      void fetchStreamCamUrls('/api/stream-urls').then((streams) => {
        if (!cancelled && streams != null) setStreamUrls(streams)
      })
    }, STREAM_URL_REFETCH_MS)

    return () => {
      cancelled = true
      window.clearInterval(intervalId)
    }
  }, [])

  const streamSrc = streamUrls != null ? urlForView(activeView, streamUrls) : null
  const poster = thumbUrls != null ? urlForView(activeView, thumbUrls) : undefined

  const handleStreamFramesVisible = useCallback((visible: boolean) => {
    setStreamFramesVisible(visible)
  }, [])

  // Intentionally re-run when the HLS URL changes so LIVE never flashes for the wrong camera.
  // biome-ignore lint/correctness/useExhaustiveDependencies: streamSrc is the reset trigger only
  useLayoutEffect(() => {
    setStreamFramesVisible(false)
  }, [streamSrc])

  const showLiveBadge = streamUrls != null && streamFramesVisible && !urlsLoading
  const showStreamBufferSpinner = !urlsLoading && streamUrls != null && !streamFramesVisible
  const showOfflineBadge = !urlsLoading && streamUrls == null

  return (
    <div className="relative">
      <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
        <span
          className="flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1.5 backdrop-blur-sm"
          aria-live="polite"
        >
          <span className="sr-only">
            {showLiveBadge ? 'Stream live' : showOfflineBadge ? 'Stream offline' : 'Stream loading'}
          </span>
          {showLiveBadge ? (
            <>
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
              </span>
              <span className="text-xs font-medium text-foreground">LIVE</span>
            </>
          ) : showOfflineBadge ? (
            <>
              <WifiOff className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Offline</span>
            </>
          ) : urlsLoading || showStreamBufferSpinner ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" aria-hidden />
          ) : null}
        </span>
      </div>
      {/* Ambient glow: outer overflow stays visible so box-shadow paints; inner shell clips the stream. */}
      <div className="group animate-ambient-glow relative rounded-2xl">
        {/* Stream view */}
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-secondary/50">
          {urlsLoading ? (
            <div
              className="h-full w-full bg-cover bg-center"
              style={poster ? { backgroundImage: `url(${poster})` } : undefined}
              role="img"
              aria-label="Camera thumbnail preview"
            />
          ) : streamUrls && streamSrc ? (
            <>
              <HlsLiveVideo
                key={streamSrc}
                src={streamSrc}
                poster={poster}
                onStreamFramesVisible={handleStreamFramesVisible}
              />

              {/* Overlay gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stream-overlay/80 via-transparent to-transparent" />

              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-70 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {activeView === 'front' ? 'Rack Front' : 'Rack Rear'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="h-3.5 w-3.5 text-primary" />
                    <span className="font-mono text-xs text-muted-foreground">
                      VPS Stream Relay
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-muted-foreground">
                <WifiOff className="h-12 w-12" />
                <span className="text-sm">Stream unavailable</span>
              </div>
            </div>
          )}
        </div>

        {/* View toggle */}
        {streamUrls && (
          <div className="absolute right-4 top-4 flex gap-2">
            <Button
              type="button"
              variant={activeView === 'front' ? 'streamActive' : 'streamInactive'}
              onClick={() => setActiveView('front')}
            >
              Front
            </Button>
            <Button
              type="button"
              variant={activeView === 'back' ? 'streamActive' : 'streamInactive'}
              onClick={() => setActiveView('back')}
            >
              Back
            </Button>
          </div>
        )}
      </div>

      {/* Self-hosted badge */}
      <div className="mt-4 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
          <Server className="h-4 w-4 text-primary" />
          <span className="text-sm text-foreground">This website is hosted on these servers</span>
          <span className="flex h-2 w-2">
            <span className="animate-pulse-glow relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
        </div>
      </div>
    </div>
  )
}
