import ProductCard from "@/app/shop/[category]/ProductCard";
import { products } from "@/app/lib/data";

export default function ProductsByCategoryPage({ params }: { params: { category: string } }) {
  return (
    <div className="" id="product">
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
        {products.map((item, index) =>
          <ProductCard
            key={index}
            {...item}
          />
        )}
      </div>
    </div>
  )
}