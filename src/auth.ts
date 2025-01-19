import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db";

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [Github, Google],
});
