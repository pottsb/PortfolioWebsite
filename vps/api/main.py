import time
import hashlib
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

SECRET = os.getenv("STREAM_SECRET")
STREAM_DOMAIN = os.getenv("STREAM_DOMAIN")
ALLOWED_ORIGIN = os.getenv("ALLOWED_ORIGIN")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGIN],
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/get-stream")
def get_stream():
    expires = int(time.time()) + 60
    token_string = f"{SECRET}{expires}"
    token = hashlib.md5(token_string.encode()).hexdigest()

    return {
        "url": f"https://{STREAM_DOMAIN}/hls/camera/index.m3u8?token={token}&expires={expires}"
    }