"use client";

import { products } from "@/app/lib/data";
import Carousel from "@/app/shop/[category]/[productid]/Carousel";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

export default function ProductPage({ params }: { params: { category: string, productid: string } }) {
  const BREAKPOINT = 768;
  const [currentWidth, setCurrentWidth] = useState(0);

  let product: Product = products.findLast((p) => p.id === Number(params.productid)) ?? products[0];

  useEffect(() => {
    const updateWidth = () => {
      let width = globalThis.innerWidth;
      setCurrentWidth(width);
    }
    updateWidth();
    globalThis.addEventListener("resize", updateWidth);

    return () => globalThis.removeEventListener("resize", updateWidth);
  }, [])

  return (
    <div className="relative-box">
      <div className="flex-row ">
        <div className="w-full flex flex-col lg:flex-row gap-8">
          <p className="lg:hidden text-3xl py-4">{product.name}</p>
          <div className="w-full lg:w-2/3 h-[60vh] flex">
            <Carousel isLandscape={currentWidth > BREAKPOINT} />
          </div>
          <div className="w-full lg:w-1/3 lg:h-[60vh] flex flex-col justify-center items-start gap-8">
            <p className="hidden lg:block text-3xl py-4">{product.name}</p>
            <p>{product.details}</p>
            <div className="w-full flex flex-row justify-between text-3xl ">
              <p>Price</p>
              <p>${product.price}</p>
            </div>
            <div className="w-full flex flex-row justify-around">
              <label className="flex flex-row items-center gap-2">
                <input type="number" min={1} defaultValue="1" className="w-32 h-10 text-center rounded-md" />
              </label>
              <button className="btn btn-warning">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}