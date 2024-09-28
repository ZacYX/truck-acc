import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="bg-white rounded-md">
      {JSON.stringify(session)}
    </div>
  )
}