"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { GiCampingTent } from "react-icons/gi";
import { IoPersonOutline } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { navItems } from "../lib/data";
import DropDownCategory from "./DropDownCategory";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoginButton from "../(auth)/login/LoginButton";

export default function NavBar() {
  const router = useRouter()
  const currentPath = usePathname();

  return (
    <div className="relative-box flex-col bg-white">
      {/* Nav bar  */}
      <div className=" w-full page-padding max-content-w flex flex-row justify-between items-center h-24">
        {/*Nav bar logo */}
        <Link href="/"><GiCampingTent size={60} fill="orange" /></Link>
        <div className="flex flex-row space-x-8">
          {/* Shop menu */}
          <DropDownCategory />
          {/**Nav bar items */}
          <div className="hidden md:flex flex-row items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                className={`${currentPath === item.link ? "text-orange-500" : "text-zinc-500"} hover:text-orange-500 flex flex-row justify-between items-center `}
                key={index}
                href={item.link}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        {/**Login and shopping cart */}
        <div className="flex flex-row justify-end space-x-6">
          <LoginButton>
            <IoPersonOutline size={24} className="hover:text-orange-500" />
          </LoginButton>
          <BsCart2 size={24} className="hover:text-orange-500" />
        </div>
      </div>
    </div>
  );
}