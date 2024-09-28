"use server"

import { deleteToken } from "./generate-send-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function verifyEmail(token: string) {
  try {
    const tokenResponse = await fetch(`${API_URL}/api/token?token=${token}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const existingToken = await tokenResponse.json();
    if (existingToken.token !== token) {
      console.log("Token not match!");
      return { error: "Token not match!" };
    }
    //compare expire time of the token in database with current time
    //to see if token expires
    if (new Date(existingToken.expires) < new Date()) {
      console.log("Token has expired");
      const deleteTokenresult = await deleteToken(token);
      return { error: "Token has expired" };
    }
    //update user's email verificatio time in database
    const updateUserResponse = await fetch(`${API_URL}/api/user`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: existingToken.email,
        emailVerified: new Date(),
      })
    })
    if (!updateUserResponse.ok) {
      console.log("Update user email status failed");
      return { error: "Update user email status failed" };
    }

    //delete token in database
    const deleteResult = await deleteToken(token);
    if (deleteResult?.error) {
      console.log("Delete token failed");
      return deleteResult;
    }

    return { success: "Email verification success" };

  } catch (error) {
    console.log("Interal error when reading token")
    console.log(error);
    return { error: "Interal error when reading token" };
  }

}