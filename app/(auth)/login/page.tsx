import CardWrapper from "./CardWrapper";

export default function AuthPage() {
  return (
    <div className="h-svh flex flex-col justify-center items-center">
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/register"
        showSocial
      >
        Auth
      </CardWrapper>
    </div>
  )
}