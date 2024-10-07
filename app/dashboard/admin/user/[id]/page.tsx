import UserDetailsForm from "./UserDetailsForm";

export default function UserDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-white p-4">
      <UserDetailsForm id={params.id} />
    </div>
  )
}