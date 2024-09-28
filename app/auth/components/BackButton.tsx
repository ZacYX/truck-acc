import Link from "next/link"

type BackButtonProps = {
  href: string,
  label: string,
}
export default function BackButton({
  href,
  label
}: BackButtonProps) {
  return (
    <button
      className="font-normal w-full py-6 hover:underline">
      <Link href={href}>
        {label}
      </Link>
    </button>
  )

}