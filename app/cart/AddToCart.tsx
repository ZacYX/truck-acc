import { Product } from "@prisma/client";
import { useContext, useState } from "react";
import { CartContext } from "./CartProvider";

export default function AddToCart({
  product,
}: {
  product: Product,
}) {
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  // const NEXT_PUBLIC_API_URL = "http://localhost:8082";
  const [quantity, setQuantity] = useState<number>(1);
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error(`Cart context undefined`);
  }

  const { currentCart, setCurrentCart } = cartContext;

  const clickHandler = async () => {
    if (!currentCart) {
      return;
    }
    const existingItem = currentCart.items.find(item => item.productId === product.id);

    const response = await fetch(`${NEXT_PUBLIC_API_URL}/apishopping/carts/${currentCart.id}/items`, {
      method: existingItem ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json',
      },
      // credentials: "include",
      // mode: "no-cors",
      body: JSON.stringify({
        "id": existingItem?.id,
        "productId": product.id,
        "quantity": existingItem ? (quantity + existingItem.quantity) : quantity,
        "price": product.price
      })
    });
    if (response.ok) {
      const result = await response.json();
      setCurrentCart(result);
    }
  }

  return (
    <div
      className={`w-full p-4 flex flex-col justify-center items-center `}
    >
      <input
        className="w-full h-8 text-center rounded-xl border-orange-300 border-2 "
        type="number"
        min={1}
        defaultValue={1}
        onChange={(event) => (setQuantity(parseInt(event.currentTarget.value)))}
      />
      <button
        className={`w-full h-8 bg-orange-300 rounded-xl  m-2 text-sm`}
        disabled={(product.inventory === null || product.inventory < 1)}
        onClick={clickHandler}
      >
        Add to cart
      </button>
    </div>
  )
}