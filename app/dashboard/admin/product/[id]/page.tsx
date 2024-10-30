import ProductDetailsForm from "./ProductDetailsForm";

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-white p-4">
      <ProductDetailsForm id={params.id} />
    </div>
  )
}