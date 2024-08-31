"use server";
import { signIn, signOut } from "@/auth";
import axios from "axios";
import {
  RegisterSchema,
  SignImSchema,
  validateZodSchema,
} from "@/utils/FormValidation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { hashPassword } from "@/utils/action";
import db from "@/utils/db";
export const handleGithubLogin = async () => {
  await signIn("github");
};
export const handleGoogleLogin = async () => {
  await signIn("google");
};
export const handleLogout = async () => {
  await signOut();
};

export const handleCredentialsLogin = async (prevState, formData) => {
  const rawData = Object.fromEntries(formData);
  const validatedFields = await validateZodSchema(SignImSchema, rawData);
  const { email, password } = validatedFields;
  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid Credentials!", redirect: "/signin" };
        default:
          return { message: "Something went wrong" };
      }
    }
    throw error;
  }
};
export const handleSignupAction = async (prevState, formData) => {
  const rawData = Object.fromEntries(formData);
  try {
    const validatedFields = await validateZodSchema(RegisterSchema, rawData);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_PRODUCTION_WEBSITE_URL}api/auth/signup`,
      validatedFields,
    );
    // return { message: "Signup successful!", redirect: "/" };
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message };
    }
    return { message: "Something went wrong" };
  }
  redirect("/signin");
};
