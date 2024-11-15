"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiCampingTent } from "react-icons/gi";
import { IoPersonOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import DropDownCategory from "./dashboard/DropDownCategory";
import LoginButton from "./auth/components/LoginButton";
import { useEffect, useState } from "react";
import { NavbarItem } from "@prisma/client";

export default function NavBar() {
  const currentPath = usePathname();

  const [navbarItems, setNavbarItems] = useState<NavbarItem[]>([]);

  useEffect(() => {
    const getNavbarItems = async () => {
      const response = await fetch(`/api/navbar`);
      if (!response.ok) {
        console.log(`Found no navbar items`);
        return;
      }
      const result: NavbarItem[] = await response.json();
      if (result && result.length > 1) {
        result.sort((a, b) => {
          if (!a.order || a.order === undefined) return 1;
          if (!b.order || b.order === undefined) return -1;
          return a.order.localeCompare(b.order);

        });
      }
      setNavbarItems(result);
    }
    getNavbarItems();
  }, [])

  return (
    <div className="relative-box flex-col bg-white">
      {/* Nav bar  */}
      <div className=" w-full page-padding max-content-w flex flex-row justify-between items-center h-24">
        {/*Nav bar logo */}
        <Link href="/"><GiCampingTent size={60} fill="orange" /></Link>
        <div className="flex flex-row space-x-8">
          {/* Shop menu */}
          <DropDownCategory />
          {/**Dynamic Nav bar items */}
          <div className="hidden md:flex flex-row items-center space-x-8">
            {navbarItems.map((item, index) => (
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
          <div>
            <IoCartOutline size={26} className="hover:text-orange-500" />
          </div>
        </div>
      </div>
    </div>
  );

}