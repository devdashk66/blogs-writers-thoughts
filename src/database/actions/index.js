"use server";
import { signIn } from "@/auth";

export async function doSocialLogin(formData) {
  const provider = formData.get("provider");
  await signIn(provider, { redirectTo: "/profile" });
}
