"use client"

import { useEffect, useState } from "react"
import { Server, Wifi, WifiOff, Eye } from "lucide-react"

interface StreamUrls {
  cam1: string
  cam2: string
}

async function fetchStreamUrls(): Promise<StreamUrls | null> {
  try {
    const response = await fetch("https://stream.bfrd.uk/api/get-stream", {
      method: "GET",
      headers: {
        "client-id": "mysecurityistopnotch"
      }
    })

    if (!response.ok) {
      throw new Error("API request failed")
    }

    const data = await response.json()
    return data
  } catch (err) {
    console.error("Failed to fetch stream URLs:", err)
    return null
  }
}

export function ServerStreams() {
  const [streamUrls, setStreamUrls] = useState<StreamUrls | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeView, setActiveView] = useState<"front" | "back">("front")
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    fetchStreamUrls().then((data) => {
      setStreamUrls(data)
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="relative">
      {/* Live indicator */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-2 bg-card/90 backdrop-blur-sm px-4 py-1.5 rounded-full border border-border">
          {streamUrls ? (
            <>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span className="text-xs font-medium text-foreground">LIVE</span>
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Offline</span>
            </>
          )}
        </div>
      </div>

      {/* Main container with ambient glow */}
      <div 
        className="relative rounded-2xl overflow-hidden animate-ambient-glow"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Stream view */}
        <div className="relative aspect-video bg-secondary/50 rounded-2xl overflow-hidden border border-border">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Server className="h-12 w-12 text-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">Connecting to homelab...</span>
              </div>
            </div>
          ) : streamUrls ? (
            <>
              <img
                src={activeView === "front" ? streamUrls.cam1 : streamUrls.cam2}
                alt={`Server rack ${activeView} view`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              
              {/* Info overlay */}
              <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-70'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {activeView === "front" ? "Front Panel" : "Rear Connections"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs text-muted-foreground font-mono">stream.bfrd.uk</span>
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
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setActiveView("front")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeView === "front"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/80 text-secondary-foreground hover:bg-secondary"
              }`}
            >
              Front
            </button>
            <button
              onClick={() => setActiveView("back")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeView === "back"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/80 text-secondary-foreground hover:bg-secondary"
              }`}
            >
              Back
            </button>
          </div>
        )}
      </div>

      {/* Self-hosted badge */}
      <div className="mt-4 flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
          <Server className="h-4 w-4 text-primary" />
          <span className="text-sm text-foreground">
            This website is hosted on this server
          </span>
          <span className="flex h-2 w-2">
            <span className="animate-pulse-glow relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
        </div>
      </div>
    </div>
  )
}
