"use client"

import { Suspense } from "react";
import CardWrapper from "../components/CardWrapper";
import VerifyForm from "../components/VerifyForm";


export default function VerifyEmailPage() {

  return (
    <div className="h-svh flex flex-col justify-center items-center">
      <CardWrapper
        headerLabel="Verify your email"
        backButtonLabel="Back to login"
        backButtonHref="/auth/login"
        showSocial={false} >
        <Suspense>
          <VerifyForm />
        </Suspense>
      </CardWrapper>
    </div>
  )

}