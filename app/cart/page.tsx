"use client";

import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { createId } from "@paralleldrive/cuid2";
import Cookies from "js-cookie";
import Cart from "./Cart";
import { CartContext } from "./CartProvider";

export default function CartPage() {
  // const NEXT_PUBLIC_API_URL = "http://localhost:8082";
  const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data: session } = useSession();
  const [cart, setCart] = useState<Cart>();
  const [cookieCart, setCookieCart] = useState<Cart>();

  //cart context
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error(`CartContext undefined`);
  }
  const { currentCart, setCurrentCart } = cartContext;

  //copy cart items to cart with user id, delete all item from cart with cookie user id
  useEffect(() => {
    const syncCarts = async () => {
      if (!cookieCart) {
        if (cart) {
          setCurrentCart(cart);
        }
        return;
      }
      //set cart id, cart with cookie id 
      if (!cart) {
        setCurrentCart(cookieCart);
        return;
      }
      //set cart id, cart with user id
      if (cookieCart.items.length > 0) {
        const promises = cookieCart.items.map((item) => (
          fetch(`${NEXT_PUBLIC_API_URL}/apishopping/carts/${cart.id}/items`, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          })
        ))
        const result = await Promise.allSettled(promises);
      }
    }
    syncCarts();
  }, [cart, cookieCart])

  //get cart by user id when logged in
  useEffect(() => {
    const getCart = async () => {
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
      setCookieCart(cart);
    }
    getCookieCart();
  }, [])

  return (
    <div>
      <div>
        <Cart />
      </div>

    </div>
  )
}