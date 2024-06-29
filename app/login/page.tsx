"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthClient() {
  const router = useRouter()
  // const { data: session } = useSession()
  const { data, status } = useSession()

  console.log("data: session: " + JSON.stringify(data))
  console.log("data: session: " + JSON.stringify(status))

  if (data) {
    console.log("data: session: " + JSON.stringify(data))
    console.log("data: session: " + JSON.stringify(status))
    return (
      <div>
        <div className="flex flex-row justify-between px-6 py-6">
          <div className="flex gap-4">
            <button onClick={() => router.push("/dashboard")}>Go to Dashboard</button>
            <button onClick={() => router.push("/")}>Home</button>
          </div>
          <div>
            <button
              onClick={() => {
                signOut()
                router.push("/")
              }}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <button>Sign up</button>
      <button onClick={() => signIn()}>Log In</button>
    </div>
  )

}