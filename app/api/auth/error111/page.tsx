"use client"

import { useSearchParams } from "next/navigation"

export default function AuthErrorPage() {
  const search = useSearchParams();
  const error = search.get("error");

  return (
    <div>
      <p>error: {error}</p>
    </div>
  )

}