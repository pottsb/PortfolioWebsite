#!/bin/sh
# Capture one JPEG per camera from internal HLS, on an interval.

set -eu

INTERVAL="${THUMB_INTERVAL_SEC:-300}"
HLS_BASE="${HLS_BASE:-http://wireguard:8888/hls}"
OUT_DIR="${THUMB_OUT_DIR:-/thumbs}"

mkdir -p "$OUT_DIR"

while true; do
  ffmpeg -hide_banner -loglevel error -nostdin -y \
    -i "${HLS_BASE}/camera1/index.m3u8" \
    -frames:v 1 -q:v 5 "${OUT_DIR}/camera1.jpg" || true

  ffmpeg -hide_banner -loglevel error -nostdin -y \
    -i "${HLS_BASE}/camera2/index.m3u8" \
    -frames:v 1 -q:v 5 "${OUT_DIR}/camera2.jpg" || true

  sleep "$INTERVAL"
done
