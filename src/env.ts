import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    POSTGRES_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    AUTH_FACEBOOK_ID: z.string(),
    AUTH_FACEBOOK_SECRET: z.string()
    // OPEN_AI_API_KEY: z.string().min(1),
  },

  clientPrefix: "PUBLIC_",

  client: {

  },

  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
});