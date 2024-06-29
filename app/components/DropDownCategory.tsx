import Link from "next/link"
import { menuItem } from "../lib/data"
import { IoIosArrowDown } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import React from "react";

export default function DropDownCategory({ className }: { className?: string }) {
  const currentPath = usePathname();

  return (
    <div className={`${className} group relative `}>
      <Link
        href={menuItem.link}
        // ref={elementRef}
        className={` flex flex-row justify-center items-center ${currentPath === menuItem.link ? "text-orange-500" : "hover:text-orange-500"}`}
      >
        {menuItem.title}
        <IoIosArrowDown />
      </Link>
      <ul className={` invisible group-hover:visible transition-all absolute top-8 min-w-40 bg-white/80 rounded-md `}>
        {menuItem.categories.map((item, index) => (
          <li key={index} className="p-2">
            <Link
              href={item.link}
              className={`${currentPath === item.link ? "text-orange-500" : "hover:text-orange-500"}`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}