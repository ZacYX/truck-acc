"use client"

import PermissionDetails from "./PermissionDetails";
import PostDetails from "./PostDetails";
import ProductDetails from "./ProductDetails";
import RoleDetails from "./RoleDetails";
import UserDetails from "./UserDetails";

export default function Page({ params }: { params: { dt: string, id: string } }) {

  const route = params.dt;
  if (
    route !== "user"
    && route !== "email"
    && route !== "post"
    && route !== "product"
    && route !== "role"
    && route !== "permission"
  ) {
    // throw new Error("wrong route!")
    console.log(`${route} is not valid.`)
  }

  return (
    <div>
      {params.dt === "product" && <ProductDetails />}
      {params.dt === "user" && <UserDetails />}
      {params.dt === "role" && <RoleDetails />}
      {params.dt === "permission" && <PermissionDetails />}
      {params.dt === "post" && <PostDetails />}
    </div>
  )

}