import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectToDB from "./database/connectToDB";
import { userModel } from "./database/models/userModel";
import mongoClientPromise from "./database/mongoClient";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.DB_NAME,
  }),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        await connectToDB();

        try {
          const user = await userModel.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User not found");
          }

          const matchPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (matchPassword) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (error) {
          console.error("Authorize Error:", error);
          throw new Error(error.message || "An unknown error occurred");
        }
      },
    }),
  ],
});
