"use server"

import { z } from "zod";

import { registerSchema } from "../lib/validation";
import bcrypt from "bcryptjs";
import { generateToken, sendToken } from "./generate-send-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUser(values: z.infer<typeof registerSchema>) {
  try {
    const validationFields = registerSchema.safeParse(values);

    if (!validationFields.success) {
      console.log("validate failed")
      return { error: "Invalid fields!" };
    }

    const { name, email, password } = validationFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    //Check weather email has been used
    const reqParams = new URLSearchParams();
    reqParams.set("email", email);
    const userResponse = await fetch(`${API_URL}/api/user?${reqParams}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
    if (userResponse.ok) {
      const existingUser = await userResponse.json();
      console.log(`existUser: ${JSON.stringify(existingUser)}`);
      if (existingUser?.email === email) {
        console.log("Email has been used!");
        return { error: "Email has been used!" };
      }
    }

    //if email has not been used, create new user with the email
    const createResponse = await fetch(`${API_URL}/api/user`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email, password: hashedPassword })
    })
    if (!createResponse.ok) {
      return { error: "Create user failed!" };
    }

    //After successfully creating user, verify the email
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
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirm your email",
      html: emailContent,
    };
    const retMessage = await sendToken(emailParcel);
    return retMessage;

  } catch (error) {
    console.log(error)
  }
}