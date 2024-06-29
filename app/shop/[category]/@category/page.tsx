"use client";

import { usePathname } from "next/navigation";
import { menuItem } from "@/app/lib/data";
import Link from "next/link";

export default function CategoryPage() {
  const currentPath = usePathname();

  return (
    <div className="">
      <div className="sticky top-24 hidden sm:flex flex-col justify-start w-1/4 min-w-60 bg-white rounded-md py-8 px-4">
        <p className="text-xl font-bold text-zinc-400 py-2">Products categories</p>
        {
          menuItem.categories.map((item, index) =>
            <Link
              key={index}
              href={item.link}
              className={`${currentPath === item.link ? "text-orange-500" : "text-zinc-800"} hover:text-orange-500 py-1`}>
              {item.title}
            </Link>
          )
        }
      </div>

    </div>
  )
}