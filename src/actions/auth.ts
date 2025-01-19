"use server";

import { signIn, signOut } from "@/auth";

export type AuthProvider = "github" | "google"

export const login = async (method: AuthProvider) => {
    await signIn(method);
};

export const logout = async () => {
    await signOut();
};