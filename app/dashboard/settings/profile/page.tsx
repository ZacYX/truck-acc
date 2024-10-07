import { currentUser } from "@/app/lib/auth";
import ProfileForm from "./ProfileForm"
// import { useSession } from "next-auth/react";

export default async function SettingsPage() {
  // const { data: session } = useSession();
  const user = await currentUser();

  return (
    <div className="bg-white p-4 ">
      <div className="border-b-2 py-4 mb-8 font-bold">
        Profile
      </div>
      <ProfileForm />
    </div>

  )
}