import { createHash } from "node:crypto";
import { env } from "@/lib/env.ts";

export function getStreamLinkTokenAndExpires(): { token: string; expires: number } {
  const clientId = env.STREAM_SECRET;
  const linkExpirySeconds = env.linkExpirySeconds;

  const expires = Math.floor(Date.now() / 1000) + linkExpirySeconds;
  const tokenString = `${clientId}${expires}`;
  const md5digest = createHash("md5").update(tokenString, "utf8").digest();

  const token = md5digest
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return { token, expires };
}
