export default function ProductListPage({ params, category, children }: {
  params: { category: string },
  category: React.ReactNode,
  children: React.ReactNode,
}) {

  return (
    <div>
      <div className="relative-box h-[50vh] bg-[url('/images/sun-tent-s.jpg')] bg-cover bg-center" />
      {/* Product display */}
      <div className="relative-box ">
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