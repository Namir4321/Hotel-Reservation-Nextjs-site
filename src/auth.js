import NextAuth from "next-auth";
import { authConfig } from "./authConfig";
import {PrismaAdapter} from "@auth/prisma-adapter"
import db from "@/utils/db";
import { hashPassword } from "./utils/action";
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const existingUser = await db.profile.findUnique({
        where: { email: user?.email },
      });

      if (!existingUser) {
        const hashedPassword=hashPassword("123456789",10)
        await db.profile.create({
          data: {
            email: user.email,
            username: user.name,
            profileImage: user.image,
            password: hashedPassword,
          },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const existingUser = await db.profile.findUnique({
          where: { email: user.email },
        });
        if (existingUser) {
          token.sub = existingUser.id;
        }
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
