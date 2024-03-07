"use client";

import ProductCard from "@/app/shop/[category]/ProductCard";
import { menuItem, products } from "@/app/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProductListPage({ params }: { params: { category: string } }) {
  const currentPath = usePathname();

  return (
    <div>
      <div className="relative-box h-[50vh] bg-[url('/images/sun-tent-s.jpg')] bg-cover bg-center"> </div>
      {/* Product display */}
      <div className="relative-box ">
        <div className="product-box flex-row justify-between gap-0 sm:gap-8">
          {/* Category panel */}
          <div className="">
            <div className="sticky top-24 hidden sm:flex flex-col justify-start w-1/4 min-w-60 bg-white rounded-md py-8 px-4">
              <p className="text-xl font-bold text-zinc-400 py-2">Products categories</p>
              {
                menuItem.categories.map((item) =>
                  <Link
                    key={item.title}
                    href={item.link}
                    className={`${currentPath === item.link ? "text-orange-500" : "text-zinc-800"} hover:text-orange-500 py-1`}>
                    {item.title}
                  </Link>
                )
              }
            </div>

          </div>
          {/* Products panel */}
          <div className="">
            <div className="flex flex-col lg:flex-row justify-between items-center pb-8 gap-8">
              <select className="select select-bordered w-full max-w-xs">
                <option>Default sorting</option>
                <option>Sort by popularity</option>
                <option>Sort by latest</option>
                <option>Sort by price: low to high</option>
                <option>Sort by price: high to low</option>
              </select>
              <p>Showing 10 of 13 results</p>
            </div>
            {/* Product list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((item) =>
                <ProductCard
                  key={item.id}
                  {...item}
                />
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}