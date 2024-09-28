"use server";

import { z } from "zod";
import { resetPasswordSchema } from "../lib/validation";
import { generateToken, sendToken } from "./generate-send-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function resetPassword(values: z.infer<typeof resetPasswordSchema>) {
  const validationFields = resetPasswordSchema.safeParse(values);
  if (!validationFields.success) {
    console.log("Validate reset password schema failed!");
    return { error: "Validate Failed" };
  }
  const { email } = validationFields.data;

  //Check if this email is a valid email in database
  try {
    const userResponse = await fetch(`${API_URL}/api/user?email=${email}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
    if (!userResponse.ok) {
      console.log("Get user form database failed!");
      return { error: "Get user form database failed!" };
    }
    const exsitingUser = await userResponse.json();
    if (!exsitingUser || exsitingUser.email !== email) {
      console.log("Email does not exsit!");
      return { error: "Email does not exsit!" };
    }
    //Generate token 
    const generatedToken = await generateToken(email);
    if (!generatedToken) {
      console.log("Create token failed");
      return { error: "Create token failed" };
    }

    //Send email
    const resetLink = `${API_URL}/auth/new-password?token=${generatedToken}`;
    const emailContent = `<p>Click <a href=${resetLink}>here</a> to reset your email</p>`;
    const emailParcel = {
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset your email",
      html: emailContent,
    };
    const retMessage = await sendToken(emailParcel);
    return retMessage;

  } catch (error) {
    console.log("Internal error when sending resetpassword email!");
    console.log(error);
  }

  return { success: "Reset password email sent!" };
}