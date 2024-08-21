import NextAuth from "next-auth"
import { authConfig } from "./authConfig";
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
        await db.profile.create({
          data: {
            email: user.email,
            username: user.name,
            profileImage: user.image,
            password: "123456789",
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
    async jwt({ token }) {
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
