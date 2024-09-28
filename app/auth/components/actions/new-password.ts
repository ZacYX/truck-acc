"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { newPasswordSchema } from "../lib/validation";
import { error } from "console";
import { ApiError } from "next/dist/server/api-utils";
import { deleteToken } from "./generate-send-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function newPassword(
  values: z.infer<typeof newPasswordSchema>,
  token: string | null
) {
  const validationFields = newPasswordSchema.safeParse(values);
  if (!validationFields.success) {
    console.log("Validate new password schema failed");
    return { error: "Validate new password schema failed" };
  }
  const { password } = validationFields.data;
  const passwordEncrypt = await bcrypt.hash(password, 10);

  try {
    //Find token from database
    const tokenResponse = await fetch(`${API_URL}/api/token?token=${token}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
    if (!tokenResponse.ok) {
      console.log("Fetch token from database failed!");
      return { error: "Fetch token from database failed!" };
    }
    const existingToken = await tokenResponse.json();
    if (!existingToken || !existingToken.token || !existingToken.email) {
      console.log("Get token from database failed!");
      return { error: "Get token from database failed!" };
    }
    //Check token expired on not
    if (new Date(existingToken.expires) < new Date()) {
      console.log("Token has expired");
      deleteToken(existingToken.token);
      return { error: "Token has expired" };
    }
    //Find user from database
    const userResponse = await fetch(`${API_URL}/api/user?email=${existingToken.email}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
    if (!userResponse.ok) {
      console.log("Fetch user from database failed");
      return { error: "Fetch user from database failed" };
    }
    const existingUser = await userResponse.json();
    if (!existingUser) {
      console.log("Get user from database failed");
      return { error: "Get user from database failed" };
    }
    //update user with new password
    const updateResponse = await fetch(`${API_URL}/api/user`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: existingToken.email,
        password: passwordEncrypt,
      })
    })
    if (!updateResponse.ok) {
      console.log("Update user password failed");
      return { error: "Update user password failed" };
    }
    deleteToken(existingToken.token);

  } catch (error) {
    console.log("Interal error when setting new password ");
    console.log(error);
  }

  return { success: "New password set" };
}
