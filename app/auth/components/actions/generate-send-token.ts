type Email = {
  from: string,
  to: string,
  subject: string,
  html: string,
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateToken(email: string) {
  //Generate token and store it in database
  const tokenResponse = await fetch(`${API_URL}/api/token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email }),
  })
  if (!tokenResponse.ok) {
    console.log("Generate verification token failed!");
    return;
  }
  const data = await tokenResponse.json();
  return data.token;
}

export async function sendToken(email: Email) {
  const emailResponse = await fetch(`${API_URL}/api/send`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...email })
  })
  if (!emailResponse.ok) {
    console.log("Send email failed!");
    return { error: "Send email failed!" };
  }
  return { success: "Confirm email sent!" };
}


export async function deleteToken(token: string) {
  try {
    const response = await fetch(`${API_URL}/api/token?token=${token}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    })
    if (!response.ok) {
      console.log("Delete token failed");
      return { error: "Delete token failed" };
    }
    return { success: "Delete token success" };

  } catch (error) {
    console.log(error);

  }

}
