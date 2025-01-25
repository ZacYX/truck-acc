import { Category, Picture, Product } from "@prisma/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";


export default function CartItem({
  cartItem,
  deleteHandler,
  updateHandler
}: {
  cartItem: CartItem,
  deleteHandler: (param: number) => void,
  updateHandler: (item: CartItem) => void,
}) {
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>();
  const [picture, setPicture] = useState<Picture>();

  useEffect(() => {
    const getProductInfo = async () => {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/product?id=${cartItem.productId}`);
      if (!response.ok) {
        console.error(`fetch product failed`);
        return;
      }
      const { images, categories, ...item } = await response.json();
      if (images && images.length > 1) {
        images.sort((a: Picture, b: Picture) => {
          if (!a.order || a.order === undefined) return 1;
          if (!b.order || b.order === undefined) return -1;
          return a.order.localeCompare(b.order);
        });
      }
      const urlResponse = await fetch(`/api/upload?name=${images[0].url}`);
      const presignedUrl = await urlResponse.json();
      // const presignedUrl = "/images/rack-truck.jpg";
      setProduct(item);
      setCategories(categories);
      setPicture({
        ...images[0],
        url: presignedUrl
      });
    }
    getProductInfo();
  }, [])

  return (
    <div className="bg-white p-2 pb-4 flex flex-col sm:flex-row ">
      <div className="w-36 flex justify-center items-center">
        {
          picture &&
          <Image
            src={picture.url}
            alt={picture.alt ?? ""}
            width={picture.width ?? 200}
            height={picture.height ?? 200}
          />
        }
      </div>
      <div className="w-full sm:mx-4 flex flex-col justify-between">
        {
          product && categories &&
          <Link href={`/shop/${categories[0].id}/${product.id}`}>
            {product?.name}
          </Link>

        }
        <div
          className="flex flex-row items-center"
        >
          <input
            className="w-28 text-center rounded-xl border-orange-300 border-2"
            type="number"
            min={1}
            defaultValue={cartItem.quantity}
            onChange={(e) => updateHandler({
              ...cartItem,
              quantity: parseInt(e.target.value)
            })}
          />
          <RxDividerVertical className="mx-2" />
          <button
            className=" text-sm text-blue-900"
            onClick={() => deleteHandler(cartItem.id)}
          >
            Delete
          </button>
          <RxDividerVertical className="mx-2" />
          <button
            className=" text-sm text-blue-900"
          >
            Save for later
          </button>

        </div>
      </div>
      <div className="w-20 flex justify-end">
        ${product?.price}
      </div>
    </div>
  )
}