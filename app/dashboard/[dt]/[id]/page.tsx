"use client";

import PostDetails from "./PostDetails";
import ProductDetails from "./ProductDetails";
import RoleDetails from "./RoleDetails";
import UserDetails from "./UserDetails";

export default function Page({ params }: { params: { dt: string, id: string } }) {

  return (
    <div>
      {params.dt === "product" && <ProductDetails />}
      {params.dt === "user" && <UserDetails />}
      {params.dt === "role" && <RoleDetails />}
      {params.dt === "post" && <PostDetails />}
    </div>
  )

}