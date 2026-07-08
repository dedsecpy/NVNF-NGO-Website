import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { checkLoginRateLimit, resetLoginAttempts } from "./rate-limit";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const ip =
          (req?.headers?.["x-forwarded-for"] as string | undefined) ?? "unknown";

        if (!checkLoginRateLimit(ip)) {
          throw new Error("Too many login attempts. Try again in 15 minutes.");
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminEmail || !passwordHash) {
          throw new Error("Admin credentials not configured");
        }

        if (credentials?.email !== adminEmail) {
          return null;
        }

        const valid = await bcrypt.compare(
          credentials.password ?? "",
          passwordHash
        );

        if (!valid) return null;

        resetLoginAttempts(ip);
        return { id: "admin", email: adminEmail, name: "Admin" };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
