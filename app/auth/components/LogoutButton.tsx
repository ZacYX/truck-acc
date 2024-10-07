"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { DEFAULT_LOGOUT_REDIRECT } from "@/routes";

type LogoutButtonProps = {
  children: React.ReactNode,
  mode?: "modal" | "redirect",
  aschild?: boolean,
}

export default function LogoutButton({ children, mode = "redirect", aschild }: LogoutButtonProps) {
  const router = useRouter();

  const onClick = async () => {
    console.log("Logout button clicked");
    await signOut({
      callbackUrl: DEFAULT_LOGOUT_REDIRECT
    });
  }

  if (mode === "modal") {
    return (
      <span>
        Todo: implent modal
      </span>
    )
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}