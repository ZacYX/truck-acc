"use client";

import ProductCard from "@/app/shop/[categoryid]/ProductCard";
import { Category, Picture, Product } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";

export type ExtProduct = Product & {
  categories: Category[];
  images: Picture[]
}

export default function ProductsByCategoryPage({ params }: {
  params: { categoryid: string }
}) {
  const [products, setProducts] = useState<ExtProduct[]>();

  const url = `/api/product?${params.categoryid === "all" ? "" : `category=${params.categoryid}`}`;
  const productsResult = useMemo(async () => {
    const productsResponse = await fetch(url);
    console.debug(`fetching products`);
    if (!productsResponse.ok) {
      console.error(`fetch products failed`);
      return;
    }
    const result = await productsResponse.json();
    if (!result) {
      console.error(`products are empty`);
      return;
    }
    return result;
  }, [url]);

  useEffect(() => {
    const getProducts = async () => {
      const result = await productsResult;
      setProducts(result);
    }
    getProducts();
  }, [url])

  return (
    <div className="" id="product">
      {/* <div className="flex flex-col lg:flex-row justify-between items-center pb-8 gap-8">
        <select className="select select-bordered w-full max-w-xs">
          <option>Default sorting</option>
          <option>Sort by popularity</option>
          <option>Sort by latest</option>
          <option>Sort by price: low to high</option>
          <option>Sort by price: high to low</option>
        </select>
        <p>Showing 10 of 13 results</p>
      </div> */}
      {/* Product list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((item, index) =>
          <ProductCard
            key={index}
            product={item}
          />
        )}
      </div>
    </div>
  )
}