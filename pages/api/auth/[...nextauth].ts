import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../model/User";
import dbConnect from "../../../config/dbConnect";
import { IUser, IUserObj } from "../../../types";

export default NextAuth({
  // session: {
  //   jwt: true,
  // },
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        await dbConnect();

        //Check if email and password is entrered
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email or password");
        }

        //Find user in database
        const user = await User.findOne({ email: credentials?.email }).select(
          "+password"
        );
        if (!user) {
          throw new Error("Invalid email or password");
        }

        //Check if password is correct or not
        const isPasswordMatched = await user.comparePassword(
          credentials.password
        );

        if (!isPasswordMatched) {
          throw new Error("Invalid email or password");
        }

        return Promise.resolve(user);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.user = user;
      }
      return Promise.resolve(token);
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.

      session.user = token.user as any;
      return Promise.resolve(session);
    },
  },
});
