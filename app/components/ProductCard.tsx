import Link from "next/link"
import { Product } from "../constants/types"

export default function ProductCard({ id, category, name, description, image, quantity, price }: Product) {
  return (
    <div className="min-w-48 flex flex-col items-center">
      <Link
        href={`/shop/${category}/${id}`}
        className="flex flex-col items-center"
      >
        <img src={image} alt={name} className="pb-1 hover:opacity-50" />
        <p className="pb-1 hover:underline">{name}</p>
        <p className="pb-2 hover:underline">Price: {price} $CND</p>
      </Link>
      <button className="btn">Add to cart</button>
    </div>
  )
}