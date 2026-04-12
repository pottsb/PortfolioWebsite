import { z } from "zod";

const serverEnvSchema = z
  .object({
    STREAM_DOMAIN: z.string().trim().min(1, "STREAM_DOMAIN is required").url(),
    STREAM_BFRD_CLIENT_ID: z.string().trim().min(1, "STREAM_BFRD_CLIENT_ID is required"),
    LINK_EXPIRARY: z.number().int().positive().optional(),
  })
  .transform((o) => ({
    STREAM_DOMAIN: o.STREAM_DOMAIN,
    STREAM_BFRD_CLIENT_ID: o.STREAM_BFRD_CLIENT_ID,
    linkExpirySeconds:
      o.LINK_EXPIRARY === undefined || o.LINK_EXPIRARY === 0
        ? 300
        : o.LINK_EXPIRARY,
  }));

export type Env = z.infer<typeof serverEnvSchema>;

export const env: Env = serverEnvSchema.parse({
  STREAM_DOMAIN: process.env.STREAM_DOMAIN,
  STREAM_BFRD_CLIENT_ID: process.env.STREAM_BFRD_CLIENT_ID,
  LINK_EXPIRARY: process.env.LINK_EXPIRARY,
});
