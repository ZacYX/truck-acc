import LoginButton from "./login/LoginButton"

export default function AuthHome() {

  return (
    <div className="h-lvh flex flex-col items-center justify-center bg-gradient-to-r from-neutral-300 to-stone-400">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          🔐Auth
        </h1>
        <p className="text-white text-lg">
          Authentication Service
        </p>
        <button className="btn">
          Sign in
        </button>

      </div>
    </div>
  )

}