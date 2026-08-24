import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { oneTap } from "better-auth/plugins";
import { db } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 hari masa aktif session (persistent cookie)
    updateAge: 60 * 60 * 24, // Perpanjang otomatis masa aktif sesi setiap 1 hari aktivitas (rolling session)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 menit cache cookie
    },
  },
  trustedOrigins: ["https://tilawahku.com", "https://www.tilawahku.com"],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    oneTap({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
});

