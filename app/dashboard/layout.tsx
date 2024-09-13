"use client"

import { signIn, useSession } from "next-auth/react";
import SideBar from "./SideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    }
  })

  console.log("data: " + JSON.stringify(data?.user))
  console.log("status: " + JSON.stringify(status))

  // if (!data) {
  if (status !== "authenticated") {
    return (
      <div className=" flex flex-row justify-center items-center h-48 ">
        <p>Cheking if you are orthorized... </p>
      </div>
    )
  }
  return (
    <div className="flex flex-row p-4 gap-4">
      <SideBar />
      <div className="w-full flex flex-col gap-4">
        {children}
      </div>
    </div>
  )
}