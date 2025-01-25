"use client";

import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { createId } from "@paralleldrive/cuid2";

export type CartContextType = {
  currentCart?: Cart,
  setCurrentCart: (cart: Cart) => void,
}
export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartProvider({ children }: { children: ReactNode }) {
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  // const NEXT_PUBLIC_API_URL = "http://localhost:8082";
  const { data: session } = useSession();
  const [currentCart, setCurrentCart] = useState<Cart>();

  useEffect(() => {
    const getCart = async () => {
      //in case of not logged in, get cart by id in cookies
      if (!session?.user) {
        let sessionUserId = Cookies.get("tempUserId");
        console.debug(`Get tempUserId: ${sessionUserId}`);
        if (!sessionUserId) {
          sessionUserId = createId();
          console.debug(`Session id created: ${sessionUserId}`);
          const result = Cookies.set("tempUserId", sessionUserId, { path: "/", expires: 365 });
          console.debug(`Set cookies: ${result} `);
        }
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/apishopping/carts/user/${sessionUserId}`);
        if (!response.ok) {
          console.error(`Get cart by session ID failed!`);
          return;
        }
        const cookieCart = await response.json();
        console.debug(`cookie cart id: ${cookieCart.id}`);
        setCurrentCart(cookieCart);
        return;
      }
      //get cart  by user id when logged in
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/apishopping/carts/user/${session.user.id}`);
      if (!response.ok) {
        console.error(`Get cart by user ID failed!`);
        return;
      }
      const cart = await response.json();
      console.debug(`Get cart by logged uer id: ${session.user.id}`);
      setCurrentCart(cart);
    }
    getCart();
  }, [session?.user.id])

  return (
    <CartContext.Provider
      value={{
        currentCart,
        setCurrentCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )

}