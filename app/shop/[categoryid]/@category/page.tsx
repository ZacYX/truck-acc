"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Category } from "@prisma/client";

export default function CategoryPage() {
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
    <div className="">
      <div className="sticky top-24 hidden sm:flex flex-col justify-start w-1/4 min-w-60 bg-white rounded-md py-8 px-4">
        <p className="text-xl font-bold text-zinc-400 py-2">Products categories</p>
        {
          categories?.map((item, index) =>
            <Link
              key={index}
              href={`/shop/${item.id}`}
              className={`${currentPath === `/shop/${item.id}` ? "text-orange-500" : "text-zinc-800"} hover:text-orange-500 py-1`}>
              {item.name}
            </Link>
          )
        }
      </div>

    </div>
  )
}