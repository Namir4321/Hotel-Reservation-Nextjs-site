import CredentailsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { access } from "fs";
import { findUserByEmail } from "./utils/action";
export const authConfig = {
  providers: [
    CredentailsProvider({
      async authorize(credentials) {
        try {
          if (credentials === null) return null;
          const { email, password } = credentials;
          const user = await findUserByEmail(email, password);
          if (user)   return user.userdetails;
          return null;
        } catch (error) {
          return { message: error || "something went wrong" };
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
};
