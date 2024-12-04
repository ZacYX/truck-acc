"use server"

import { z } from "zod";

import { loginSchema } from "../lib/validation";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { generateToken, sendToken } from "./generate-send-token";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function loginUser(values: z.infer<typeof loginSchema>) {
  const validationFields = loginSchema.safeParse(values);
  if (!validationFields.success) {
    console.log("validate failed")
    return { error: "Validate failed!" };
  }

  const { email, password } = validationFields.data;

  //check if credential user email verified or not
  //unverified user not allowed to login and send a verification email
  try {
    const searchParams = new URLSearchParams();
    searchParams.set("email", email);
    const response = await fetch(`${API_URL}/api/user?${searchParams}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    if (!response.ok) {
      console.log(`respone: `, JSON.stringify(response.status))
      return { error: "No email matched (1)!" };
    }
    const exsitingUser = await response.json();
    if (!exsitingUser || !exsitingUser.email || !exsitingUser.password) {
      return { error: "No email matched (2)!" }
    }

    if (!exsitingUser.emailVerified) {
      //Generate Token and store it in database
      const generateTokenResult = await generateToken(email);
      if (!generateTokenResult) {
        console.log("Create token failed!");
        return { error: "Create token failed!" };
      }
      //Send token by email
      const confirmLink = `${API_URL}/auth/verification?token=${generateTokenResult}`;
      const emailContent = `<p>Click <a href=${confirmLink}>here</a> to confirm your email!</p>`;
      const emailParcel = {
        from: "noreply@mail.goxmore.com",
        to: email,
        subject: "Confirm your email",
        html: emailContent,
      };
      const retMessage = await sendToken(emailParcel);
      return retMessage;
    }

  } catch (error) {
    console.log(`Interal error when matching email!`);
    console.log(error);
  }

  //Log in
  //redirect in signIn does not work, use client side router instead
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
      // redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
  }

  return { success: "Login success!" };
}