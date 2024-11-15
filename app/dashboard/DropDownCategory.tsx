import Link from "next/link"
import { menuItem } from "../lib/data"
import { IoIosArrowDown } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Category } from "@prisma/client";

export default function DropDownCategory({ className }: { className?: string }) {
  const currentPath = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(`/api/category`)
      if (!response.ok) {
        console.error(`fetch categories failed`);
        return;
      }
      const result = await response.json();
      if (!result) {
        console.log(`No category found`);
        return;
      }
      setCategories(result);
    }
    getCategories();
  }, [])

  return (
    <div className={`${className} group relative `}>
      <Link
        href={menuItem.link}
        className={` flex flex-row justify-center items-center 
          ${currentPath === menuItem.link ? "text-orange-500" : "hover:text-orange-500"}`}
      >
        {menuItem.title}
        <IoIosArrowDown />
      </Link>
      <ul className={` invisible group-hover:visible transition-all absolute top-8 min-w-40 bg-white/80 rounded-md `}>
        {categories?.map((item, index) => (
          <li key={index} className="p-2">
            <Link
              href={`/shop/${item.id}`}
              className={`${currentPath === `/shop/${item.id}` ? "text-orange-500" : "hover:text-orange-500"}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}