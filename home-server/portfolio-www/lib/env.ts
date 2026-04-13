import { z } from "zod";

const serverEnvSchema = z
  .object({
    STREAM_DOMAIN: z
      .string()
      .trim()
      .min(1, "STREAM_DOMAIN is required")
      .url("STREAM_DOMAIN must be a valid URL"),
    STREAM_SECRET: z
      .string()
      .trim()
      .min(1, "STREAM_SECRET is required"),
    LINK_EXPIRARY: z.preprocess(
      (v) => {
        if (v === undefined || v === null) return undefined;
        if (typeof v === "string" && v.trim() === "") return undefined;
        return v;
      },
      z.coerce.number().int().positive().optional(),
    ),
  })
  .transform((o) => ({
    STREAM_DOMAIN: o.STREAM_DOMAIN,
    STREAM_SECRET: o.STREAM_SECRET,
    linkExpirySeconds: o.LINK_EXPIRARY ?? 300,
  }));

export type Env = z.infer<typeof serverEnvSchema>;

export const env: Env = serverEnvSchema.parse({
  STREAM_DOMAIN: process.env.STREAM_DOMAIN,
  STREAM_SECRET: process.env.STREAM_SECRET,
  LINK_EXPIRARY: process.env.LINK_EXPIRARY,
});
