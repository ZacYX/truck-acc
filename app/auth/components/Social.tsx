"use client"

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useContext, useEffect } from "react";
import { MessageContext } from "./CardWrapper";
import { useSearchParams } from "next/navigation";

export default function Social() {
  const { setMessage } = useContext(MessageContext);
  const searchParams = useSearchParams();

  const onClick = async (provider: "google" | "github") => {
    const result = await signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  }

  useEffect(() => {
    const errorCode = searchParams.get("error");
    if (errorCode) {
      setMessage!({ error: errorCode });
    }
  }, [])

  return (
    <div className="flex flex-row justify-between w-full gap-x-2">
      <button
        className="btn w-1/2"
        onClick={() => onClick("google")}
      >
        <FcGoogle className=" h-5 w-5" />
      </button>
      <button
        className="btn w-1/2"
        onClick={() => { onClick("github") }}
      >
        <FaGithub className=" h-5 w-5" />
      </button>
    </div>
  )
} 