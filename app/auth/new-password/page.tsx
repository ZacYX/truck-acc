import { Suspense } from "react";
import CardWrapper from "../components/CardWrapper";
import NewPasswordForm from "../components/NewPasswordForm";

export default function NewPasswordPage() {
  return (
    <div className="h-svh flex flex-col justify-center items-center">
      <CardWrapper
        headerLabel="Forgot your password"
        backButtonLabel="Go back to login"
        backButtonHref="/auth/login"
      >
        <Suspense>
          <NewPasswordForm />
        </Suspense>
      </CardWrapper>
    </div>
  )
}