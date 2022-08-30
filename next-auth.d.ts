import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userName: string;
      image?: string;
      email: string;
      password: string;
    };
  }
}
