import Image from "next/image"
import Link from "next/link"
import { Category, Picture, Product } from "@prisma/client"
import { useEffect, useState } from "react"
import { image } from "@nextui-org/theme"

export default function ProductCard({ product }: {
  product: Product & {
    categories: Category[],
    images: Picture[]
  }
}) {
  const { id, name, sku, price, salePrice, categories, images } = product;
  const [imagesToShow, setImagesToShow] = useState(images);

  useEffect(() => {
    if (images.length > 1) {
      const sortedImages = images.toSorted((a, b) => {
        if (!a.order || a.order === undefined) return 1;
        if (!b.order || b.order === undefined) return -1;
        return a.order.localeCompare(b.order);
      });
      setImagesToShow(sortedImages);
    }
  }, [])

  return (
    <div className="min-w-48 flex flex-col justify-between items-center gap-4 bg-zinc-100 p-2 rounded-md">
      <Link
        href={`/shop/${categories[0].id ?? "all"}/${id}`}
        className="h-full flex flex-col items-center gap-2"
      >
        <div className="w-full h-full flex justify-center items-center">
          <Image
            src={imagesToShow[0].url}
            width={imagesToShow[0].width ?? 200}
            height={imagesToShow[0].height ?? 200}
            alt={imagesToShow[0].alt ?? ""}
            className="hover:opacity-50 "
          />
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