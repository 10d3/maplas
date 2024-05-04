import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    POSTGRES_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    AUTH_FACEBOOK_ID: z.string(),
    AUTH_FACEBOOK_SECRET: z.string(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    BLOB_READ_WRITE_TOKEN: z.string(),
    // OPEN_AI_API_KEY: z.string().min(1),
  },

  clientPrefix: "PUBLIC_",

  client: {

  },

  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
});