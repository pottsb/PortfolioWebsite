import { NextResponse } from 'next/server'
import { env } from '@/lib/env.ts'
import { getStreamLinkTokenAndExpires } from '@/lib/stream-link-token.ts'

export async function GET() {
  const streamDomain = env.STREAM_DOMAIN
  const { token, expires } = getStreamLinkTokenAndExpires()

  return NextResponse.json({
    cam1: `${streamDomain}/hls/camera1/index.m3u8?token=${token}&expires=${expires}`,
    cam2: `${streamDomain}/hls/camera2/index.m3u8?token=${token}&expires=${expires}`,
  })
}
