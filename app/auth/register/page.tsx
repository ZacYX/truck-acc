import CardWrapper from "../components/CardWrapper";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="h-svh flex flex-col justify-center items-center">
      <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        showSocial
      >
        <RegisterForm />
      </CardWrapper>
    </div>
  )
}