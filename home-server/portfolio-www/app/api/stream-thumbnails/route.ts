import { NextResponse } from 'next/server'
import { env } from '@/lib/env.ts'
import { getStreamLinkTokenAndExpires } from '@/lib/stream-link-token.ts'

export async function GET() {
  const streamDomain = env.STREAM_DOMAIN
  const { token, expires } = getStreamLinkTokenAndExpires()

  return NextResponse.json({
    cam1: `${streamDomain}/thumbs/camera1.jpg?token=${token}&expires=${expires}`,
    cam2: `${streamDomain}/thumbs/camera2.jpg?token=${token}&expires=${expires}`,
  })
}
