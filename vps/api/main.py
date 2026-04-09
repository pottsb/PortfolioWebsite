import base64
import hashlib
import os
import time
from fastapi import FastAPI

app = FastAPI()

SECRET = os.getenv("STREAM_SECRET")
STREAM_DOMAIN = os.getenv("STREAM_DOMAIN")

@app.get("/get-stream")
def get_stream():
    expires = int(time.time()) + 300
    token_string = f"{SECRET}{expires}"
    digest = hashlib.md5(token_string.encode()).digest()
    # nginx secure_link expects base64url (no padding), not hex — see ngx_http_secure_link_module
    token = base64.urlsafe_b64encode(digest).decode("ascii").rstrip("=")

    return {
        "cam1": f"https://{STREAM_DOMAIN}/hls/camera1/index.m3u8?token={token}&expires={expires}",
        "cam2": f"https://{STREAM_DOMAIN}/hls/camera2/index.m3u8?token={token}&expires={expires}",
    }