import Image from "next/image";

export default function Avatar() {
  return (
    <div className="avatar">
      <div className="w-12 rounded-full">
        <Image
          src="/avatar/blank-profile-picture-973460_1280.png"
          width={1280}
          height={1280}
          alt="avatar"
        />
      </div>
    </div>
  )
}