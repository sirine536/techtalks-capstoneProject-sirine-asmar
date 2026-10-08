import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { generateUniqueUsername } from "@/lib/generateUsername";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();

      // Check if user already exists in our database
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        // First time sign-in: create a new user document
        const username = await generateUniqueUsername(
          user.name || user.email!.split("@")[0]
        );

        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          username,
          githubId: account?.provider === "github" ? account.providerAccountId : undefined,
          googleId: account?.provider === "google" ? account.providerAccountId : undefined,
        });
      } else {
        // Existing user: link the new provider ID if not already linked
        if (account?.provider === "github" && !existingUser.githubId) {
          existingUser.githubId = account.providerAccountId;
          await existingUser.save();
        }
        if (account?.provider === "google" && !existingUser.googleId) {
          existingUser.googleId = account.providerAccountId;
          await existingUser.save();
        }
      }

      return true;
    },
    async session({ session }) {
      if (session.user?.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          // Attach our own username to the session so we can use it in the UI
          (session.user as any).username = dbUser.username;
          (session.user as any).id = dbUser._id.toString();
        }
      }
      return session;
    },
  },
});