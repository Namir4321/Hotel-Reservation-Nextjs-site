import CredentailsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { access } from "fs";
export const authConfig = {
  providers: [
    // CredentailsProvider({
    //   credentials: {
    //     email: {},
    //     password: {},
    //   },
    //   async authorize(credentials) {
    //     if (credentials === null) return null;
    //     try {
    //     } catch (error) {
    //       throw new Error(error);
    //     }
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
};
