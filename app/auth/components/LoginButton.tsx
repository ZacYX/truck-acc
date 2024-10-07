"use client"

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useRouter } from "next/navigation";

type LoginButtonProps = {
  children: React.ReactNode,
  mode?: "modal" | "redirect",
  asChild?: boolean,
}

export default function LoginButton({ children, mode = "redirect", asChild }: LoginButtonProps) {
  const router = useRouter();

  const onclick = () => {
    console.log("Login button clicked");
    router.push(DEFAULT_LOGIN_REDIRECT);

  }

  if (mode === "modal") {
    return (
      <span>
        Todo: implement modal
      </span>
    )
  }

  return (
    <span onClick={onclick} className="cursor-pointer">
      {children}
    </span>
  )
}