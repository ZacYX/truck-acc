"use client";

import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { createId } from "@paralleldrive/cuid2";
import { json } from "stream/consumers";

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
  const [cart, setCart] = useState<Cart>();
  const [cookieCart, setCookieCart] = useState<Cart>();

  useEffect(() => {
    const syncCarts = async () => {
      //set cart id, cart with cookie id 
      if (!cart) {
        setCurrentCart(cookieCart);
        return;
      }
      if (!cookieCart) {
        setCurrentCart(cart);
        return;
      }
      //set cart id, cart with user id
      if (cookieCart.items.length > 0) {
        const promises = cookieCart.items.map((item) => {
          const existingItem = cart.items.find((cartItem) => cartItem.productId === item.productId);
          return fetch(`${NEXT_PUBLIC_API_URL}/apishopping/carts/${cart.id}/items`, {
            method: existingItem ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...item,
              quantity: item.quantity + (existingItem ? existingItem.quantity : 0)
            }),
          })
        })
        const result = await Promise.allSettled(promises);
        const response = await fetch(`${NEXT_PUBLIC_API_URL}/apishopping/carts/${cart.id}`);
        const cartResult = await response.json();
        console.debug(`current cart: ${JSON.stringify(cart)}`);
        setCurrentCart(cartResult);
        return;
      }
      setCurrentCart(cart);
    }
    syncCarts();
  }, [cart, cookieCart])

  //get cart by user id when logged in
  useEffect(() => {
    const getCart = async () => {
      console.debug(`session.user: ${JSON.stringify(session?.user)}`);
      if (!session?.user) {
        console.log(`User has not logged in`);
        return;
      }
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/apishopping/carts/user/${session.user.id}`);
      if (!response.ok) {
        console.error(`Get cart by user ID failed!`);
        return;
      }
      const cart = await response.json();
      console.debug(`user cart: ${JSON.stringify(cart)}`);
      setCart(cart);
    }
    getCart();
  }, [session?.user.id])

  //get cart by id in cookies
  useEffect(() => {
    const getCookieCart = async () => {
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
      const cart = await response.json();
      console.debug(`cookie cart: ${JSON.stringify(cart)}`);
      setCookieCart(cart);
    }
    getCookieCart();
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