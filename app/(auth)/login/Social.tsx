"use client"

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Social() {
  return (
    <div className="flex flex-row justify-between w-full gap-x-2">
      <button
        className="btn w-1/2"
        onClick={() => { }}
      >
        <FcGoogle size="lg" className=" h-5 w-5" />
      </button>
      <button
        className="btn w-1/2"
        onClick={() => { }}
      >
        <FaGithub size="lg" className=" h-5 w-5" />
      </button>
    </div>
  )
} 