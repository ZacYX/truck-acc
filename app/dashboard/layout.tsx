"use client"

import { signIn, useSession } from "next-auth/react";
import SideBar from "./SideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {



  return (
    <div className="flex flex-row p-4 gap-4">
      <SideBar />
      <div className="w-full flex flex-col gap-4">
        {children}
      </div>
    </div>
  )
}