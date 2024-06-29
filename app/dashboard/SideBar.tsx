"use client";

import { dashboardItems } from "@/app/lib/items";
import Link from "next/link";
import Avatar from "./Avatar";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const currentPath = usePathname();

  return (
    <div className="min-w-64 flex flex-col justify-start items-start bg-white rounded-md p-4">
      <div className="w-full flex flex-row py-4">
        <Avatar />
        <div className="px-4 ">
          <p className="font-bold">User Name</p>
          <p className="text-xs">User Role</p>
        </div>
      </div>
      <div className="w-full py-2">
        <div className="min-w-20 py-2">
          <p>Pages</p>
        </div>
        {
          dashboardItems.map((item, index) => (
            <div
              key={index}
              className={`w-full min-w-20 flex flex-row justify-start px-4 py-2 rounded-md hover:bg-zinc-200 transition-all ${currentPath === item.url ? "bg-zinc-200" : ""}`}>
              <Link
                href={item.url}
                className="flex flex-row items-center gap-2"
              >
                {item.icon}
                {item.name}
              </Link>
            </div>
          ))
        }

      </div>
    </div>
  )
}