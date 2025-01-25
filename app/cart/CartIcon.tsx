import { useContext, useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from "./CartProvider";

export default function CartIcon() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return (<IoCartOutline size={26} className="hover:text-orange-500" />)
  }

  const { currentCart } = cartContext;

  return (
    <div
      className="relative"
    >
      <p
        className="absolute bottom-4 left-5 z-10 text-orange-300 text-sm"
      >
        {currentCart?.items.length}
      </p>
      <IoCartOutline
        size={26}
        className="hover:text-orange-500"
      />
    </div>
  )
}