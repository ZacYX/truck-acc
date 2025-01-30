"use client";

import { useContext, useEffect, useState } from "react";
import CartItem from "./CartItem";
import { CartContext } from "./CartProvider";

export default function Cart() {
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const cartContext = useContext(CartContext);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const getSubtotal = () => {
      let total = 0;
      if (currentCart?.items) {
        currentCart.items.forEach((item => {
          total = total + item.price * item.quantity;
        }))
        setSubtotal(total);
      }
    }
    getSubtotal();
  }, [cartContext?.currentCart?.items])

  if (!cartContext) {
    return (<div>Cart not found</div>)
  }
  const { currentCart, setCurrentCart } = cartContext;

  const updateHandler = async (cartItem: CartItem) => {
    if (!currentCart) {
      console.log(`current cart id undefined`);
      return;
    }
    // const response = await fetch(`http://localhost:8082/apishopping/carts/${currentCart.id}/items`, {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/apishopping/carts/${currentCart.id}/items`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        "id": cartItem.id,
        "productId": cartItem.productId,
        "quantity": cartItem.quantity,
        "price": cartItem.price
      })
    });
    if (!response.ok) {
      console.error(`update response failed`);
      return;
    }
    const result = await response.json();
    setCurrentCart(result);
  }

  const deleteHandler = async (cartItemId: number) => {
    if (!currentCart) {
      console.log(`current cart id undefined`);
      return;
    }
    console.debug(`Delete shopping cart item from cart: ${currentCart.id}`);
    console.debug(`Delete shopping cart item: ${cartItemId}`);
    // const response = await fetch(`http://localhost:8082/apishopping/carts/${currentCart.id}/items/${cartItemId}`, {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/apishopping/carts/${currentCart.id}/items/${cartItemId}`, {
      method: "DELETE",
    })
    if (response.ok) {
      const result = await response.json();
      setCurrentCart(result);
    }
  }


  return (
    <div className="flex flex-col-reverse md:flex-row">
      {/* list of cart items  */}
      <div className="md:w-full bg-white p-2 m-3 divide-y-1">
        <div className="flex flex-col justify-start p-2">
          <div className="text-xl  ">
            Shopping Cart
          </div>
          <div className="hidden sm:flex justify-end text-sm ">
            Price
          </div>
        </div>
        {
          currentCart?.items?.map((item) => (
            <CartItem
              key={item.id}
              cartItem={item}
              deleteHandler={deleteHandler}
              updateHandler={updateHandler}
            />
          ))
        }
        <div
          className="flex justify-end p-2"
        >
          Subtotal({currentCart?.items?.length ?? 0} items): ${subtotal}
        </div>
      </div>
      {/* check out panel */}
      <div className="min-w-64 bg-white p-2 m-3 md:ml-0 flex flex-col justify-start">
        <div
          className=" p-2"
        >
          Subtotal({currentCart?.items?.length ?? 0} items): ${subtotal}
        </div>
        <div
          className="p-2"
        >
          <button
            className="bg-orange-300 rounded-2xl py-1 px-4 text-sm "
          >
            Proceed to Checkoout
          </button>
        </div>
      </div>
    </div>
  )
}