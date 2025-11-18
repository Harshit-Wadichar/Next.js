import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
});