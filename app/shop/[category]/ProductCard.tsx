import Image from "next/image"
import Link from "next/link"
import { Picture, Product } from "../../constants/types"
import { ProductCategory } from "@/app/constants/data"

export default function ProductCard({ id, category, name, pictures, price }: {
  id: number, category: ProductCategory, name: string, pictures: Picture[], price: number
}) {
  return (
    <div className="min-w-48 flex flex-col justify-between items-center gap-4 bg-zinc-100 p-2 rounded-md">
      <Link
        href={`/shop/${category}/${id}`}
        className="h-full flex flex-col items-center gap-2"
      >
        <div className="w-full h-full flex justify-center items-center">
          <Image
            src={pictures[0].url}
            width={pictures[0].width}
            height={pictures[0].height}
            alt={name}
            className="hover:opacity-50 "
          />
        </div>
        <p className="pb-1 hover:underline">{name}</p>
        <p className="pb-2 hover:underline">Price: {price} $CND</p>
      </Link>
      <button className="btn bg-orange-400">Add to cart</button>
    </div>
  )
}