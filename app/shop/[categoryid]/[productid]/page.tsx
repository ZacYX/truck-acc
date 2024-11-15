"use client";

import Carousel from "@/app/shop/[categoryid]/[productid]/Carousel";
import { useEffect, useState } from "react";
import { ExtProduct } from "../page";

const BREAKPOINT = 768;

export default function ProductPage({ params }: { params: { categoryid: string, productid: string } }) {
  const [currentWidth, setCurrentWidth] = useState(0);
  const [product, setProduct] = useState<ExtProduct>();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/product?id=${params.productid}`);
      if (!response.ok) {
        console.log(`fetch product failed`);
        return;
      }
      const result = await response.json();
      setProduct(result);
    }
    fetchProduct();
  }, [])

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
        {
          product &&
          <div className="w-full flex flex-col lg:flex-row gap-8">
            <p className="lg:hidden text-3xl py-4">{product.name}</p>
            <div className="w-full lg:w-2/3 h-[60vh] flex">
              <Carousel
                isLandscape={currentWidth > BREAKPOINT}
                images={product.images}
              />
            </div>
            <div className="w-full lg:w-1/3 lg:h-[60vh] flex flex-col justify-center items-start gap-8">
              <p className="hidden lg:block text-3xl py-4">{product.name}</p>
              <p>{product.details}</p>
              <div className="w-full flex flex-row justify-between text-2xl ">
                <p>Price</p>
                <p>${product.price}</p>
              </div>
              {
                product.salePrice &&
                <div className="w-full flex flex-row justify-between text-2xl text-red-500">
                  <p>Sale</p>
                  <p>${product.salePrice}</p>
                </div>

              }
              <div className="w-full flex flex-row justify-around">
                <label className="flex flex-row items-center gap-2">
                  <input type="number" min={1} defaultValue="1" className="w-32 h-10 text-center rounded-md" />
                </label>
                <button className="btn btn-warning">Add to cart</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}