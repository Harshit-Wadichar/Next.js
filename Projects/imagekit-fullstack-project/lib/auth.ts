// lib/auth.ts (or wherever you keep it)
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // defensive: must exist
        if (!credentials?.email || !credentials?.password) {
          // return null for invalid auth (don't throw)
          return null;
        }

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email }).lean();

          if (!user) {
            return null;
          }

          // <-- IMPORTANT: use the correct field name from your DB here.
          // most schemas call it `user.password` or `user.hashedPassword`.
          const hashed = (user as any).password; // change 'password' if your schema uses another name

          // defensive check: hashed must be a string
          if (typeof hashed !== "string" || hashed.length === 0) {
            console.error("Auth: missing/invalid hashed password for user:", user.email);
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, hashed);
          if (!isValid) {
            return null;
          }

          // successful login
          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (err) {
          console.error("Auth error:", err);
          // return null to indicate failure (avoid throwing)
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
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
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
