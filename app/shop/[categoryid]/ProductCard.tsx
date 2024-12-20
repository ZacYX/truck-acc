import Image from "next/image"
import Link from "next/link"
import { Category, Picture, Product } from "@prisma/client"
import { useEffect, useState } from "react"

export default function ProductCard({ product }: {
  product: Product & {
    categories: Category[],
    images: Picture[]
  }
}) {
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { id, name, sku, price, salePrice, categories, images } = product;
  const [imageToShow, setImageToShow] = useState<Picture>();

  useEffect(() => {
    const getImageToShow = async () => {
      if (images.length > 1) {
        const sortedImages = images.toSorted((a, b) => {
          if (!a.order || a.order === undefined) return 1;
          if (!b.order || b.order === undefined) return -1;
          return a.order.localeCompare(b.order);
        });
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/upload?name=${sortedImages[0].url}`);
        const presignedUrl = await response.json();
        setImageToShow({
          ...sortedImages[0],
          url: presignedUrl
        });
      }
    }
    getImageToShow();
  }, [images])

  return (
    <div className="min-w-48 flex flex-col justify-between items-center gap-4 bg-zinc-100 p-2 rounded-md">
      <Link
        href={`/shop/${categories[0].id ?? "all"}/${id}`}
        className="h-full flex flex-col items-center gap-2"
      >
        <div className="w-full h-full flex justify-center items-center">
          {imageToShow &&
            <Image
              src={imageToShow.url}
              width={imageToShow.width ?? 200}
              height={imageToShow.height ?? 200}
              alt={imageToShow.alt ?? ""}
              className="hover:opacity-50 "
            />}
        </div>
        <p className="pb-1 hover:underline">{name}</p>
        <p className="pb-1 hover:underline">Price: {price} $CND</p>
        {
          salePrice &&
          <p className="pb-2 hover:underline text-red-500">Sale: {salePrice} $CND</p>

        }
      </Link>
      <button className="btn bg-orange-400">Add to cart</button>
    </div>
  )
}