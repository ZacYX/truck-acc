import CardWrapper from "../components/CardWrapper";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="h-svh flex flex-col justify-center items-center">
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
      >
        <LoginForm />
      </CardWrapper>
    </div>
  )
}