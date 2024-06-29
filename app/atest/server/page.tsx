import { auth } from "@/auth";

export default async function AuthServer() {
  const session = await auth();

  if (session) {
    return (
      <div>
        <p>Access Token: {session?.user?.email}</p>
        <p>Access Token: {session?.user?.id}</p>
      </div>
    )
  }

  return (
    <div>
      <p> No session!  </p>
    </div>
  )
}