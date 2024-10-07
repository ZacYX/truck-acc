import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactElement } from "react";

export type SideBarSectionItem = {
  name: string,
  path: string,
  icon: ReactElement,
}

export type SideBarSectionProps = {
  name: string,
  items?: SideBarSectionItem[],
}

export default function SideBarSection({ name, items }: SideBarSectionProps) {
  const currentPath = usePathname();
  return (
    <div className="border-t-2">
      <div className="min-w-20 py-2">
        <p>{name}</p>
      </div>
      {items &&
        items.map((item, index) => (
          <div
            key={index}
            className={`w-full min-w-20 flex flex-row justify-start px-4 py-2 rounded-md
               hover:bg-zinc-200 transition-all ${currentPath === item.path ? "bg-zinc-200" : ""}`}>
            <Link
              href={item.path}
              className="flex flex-row items-center gap-2"
            >
              {item.icon}
              {item.name}
            </Link>
          </div>
        ))
      }
    </div>
  )
}