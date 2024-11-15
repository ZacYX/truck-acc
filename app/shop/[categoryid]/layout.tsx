"use client";

import Image from "next/image";
import { Category, Picture, Product } from "@prisma/client";
import { shopData } from "@/app/lib/data";
import { useEffect, useState } from "react";

export default function ProductListPageLayout({ params, category, children }: {
  params: { category: string },
  category: React.ReactNode,
  children: React.ReactNode,
}) {

  const [shop, setShop] = useState(shopData);
  const fetchShop = async () => {
    const response = await fetch(`/api/web-info?name=shop`);
    if (!response.ok) {
      console.error(`fetch shop web info failed`);
      return;
    }
    const result = await response.json();
    if (!result) {
      console.error(`result of shop is empty`);
      return;
    }
    setShop(result);
  }
  useEffect(() => { fetchShop(); }, [])

  return (
    <div>
      <div className="relative w-full flex justify-center items-center " />
      {/* <Image
        src={shop.images[0].url}
        alt={shop.images[0].alt}
        width={shop.images[0].width}
        height={shop.images[0].height}
        className="absolute w-full h-full object-cover object-center"
      /> */}
      {/* Product display */}
      <div className="relative w-full flex justify-center items-center ">
        <div className="product-box flex-row justify-between gap-0 sm:gap-8">
          {/* Category panel */}
          {category}
          {/* Products panel */}
          {children}

        </div>
      </div>
    </div>
  )
}
