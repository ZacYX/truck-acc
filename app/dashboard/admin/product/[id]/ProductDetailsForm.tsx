"use client";

import { Button } from "@nextui-org/button";
import { Category, Picture, Product } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { FieldValue, FormProvider, useFieldArray, useForm } from "react-hook-form";
import ImageEditor from "../new/ImageEditor";

// type CategoryInfo = Omit<Category, "name" | "details">;
export type ProductDetails = Product & {
  categories: Category[],
  images: Picture[],
};

export const numberItems = [
  "inventory",
  "price",
  "salePrice",
  "width",
  "height",
]
const readOnlyItems = [
  "id",
  "createAt",
  "updateAt",
  "url",
  "height",
  "width",
];
const timeItems = [
  "createAt",
  "updateAt",
];
const OmitItems = [
  "details",
  "categories",
  "images",
]
export const requiredItems = [
  "sku",
  "name",
]

export type ChildRef = {
  remove: () => void,
}

export default function ProductDetailsForm({ id }: { id: string }) {
  const [allCategories, setAllCategories] = useState<Array<Category>>();
  const [product, setProduct] = useState<ProductDetails>();
  const imageEditorRef = useRef<ChildRef>(null);

  const methods = useForm<ProductDetails>({ defaultValues: product, });
  const { register, handleSubmit, reset } = methods;

  /**
   * fetched categories from database contains only exsiting categories.
   * this leads to only checkboxes at the begining to be checked.
   * {id: false} have to be add to categories to make category checkbox
   * display correctly
   * @param product 
   * @returns  
   */
  const updateCategorieInProduct = (product: ProductDetails) => {
    if (!product || product === undefined) {
      console.debug(`product is null or undefined`);
      return;
    }
    if (!allCategories || allCategories === undefined) {
      console.debug(`allCategories is null or undefined`);
      return product;
    }
    const tempCat = allCategories.map(catInAllCat => (
      !!product.categories.some(catInProduct => (catInAllCat.id === catInProduct.id))
        ? catInAllCat
        : { id: false }
    ))
    // console.debug(`tempCat: ${JSON.stringify(tempCat)}`);
    return { ...product, categories: tempCat as Category[] };
  }

  const fetchProduct = async () => {
    console.log(id);
    const response = await fetch(`/api/product?id=${id}`);
    if (!response.ok) {
      console.log(`fetch product ${id} failed`);
      return;
    }
    const productWithCatAndImg = await response.json();
    if (productWithCatAndImg.id !== parseInt(id)) {
      console.log(`fetch product ${id} failed`);
    }
    // productWithCatAndImg.createAt = productWithCatAndImg.createAt.toISOString().slice(0, 16);
    // productWithCatAndImg.updateAt = productWithCatAndImg.updateAt.toISOString().slice(0, 16);
    // console.log(JSON.stringify(productWithCatAndImg.categories));
    setProduct(updateCategorieInProduct(productWithCatAndImg));
  }

  const fetchAllCategories = async () => {
    const searchParams = new URLSearchParams();
    searchParams.set("page-size", "100");
    const response = await fetch(`/api/category?${searchParams}`);
    if (!response.ok) {
      console.error(`No response when fetching categories`);
      return;
    }
    const result = await response.json();
    if (!result) {
      console.error(`No category found in database`);
      return;
    }
    // console.debug(`allcategories: ${JSON.stringify(result)}`);
    setAllCategories(result)
  }

  const onSubmit = async (data: ProductDetails) => {
    console.log(`data submitted: ${JSON.stringify(data)}`);
    const { images, ...productToUpdate } = data;
    // update product and connect categories
    const response = await fetch(`/api/product`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productToUpdate),
    })
    if (!response.ok) {
      console.log(`update product failed`);
    }
    //prepare the image arrays to update or delete 
    const imagesToUpdate = images.map(item => ({
      ...item,
      productId: productToUpdate.id,
    }));
    const imagesToUpdateId = imagesToUpdate.map((item => item.id));
    const imagesToDelete = product?.images.filter((item) => (!imagesToUpdateId.includes(item.id)));
    //update images
    const imagesToUpdatePromises = imagesToUpdate.map(item => (
      fetch(`/api/picture`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(item),
      })
    ))
    const imagesUpdateResult = await Promise.allSettled(imagesToUpdatePromises);
  }

  useEffect(() => {
    if (!product || product === undefined) {
      // console.debug(`useEffect@allCategories product is null or undefined`);
      return;
    }
    setProduct(updateCategorieInProduct(product));
  }, [allCategories])

  useEffect(() => {
    fetchProduct();
  }, [id])

  useEffect(() => {
    fetchAllCategories();
  }, [])

  useEffect(() => {
    // console.debug(`useEffect product reset: ${JSON.stringify(product?.categories)}`)
    reset(product);
  }, [product])

  return (
    <FormProvider {...methods}>
      <div>
        <div className="border-b-2 py-2 mb-8 flex flex-row justify-between items-center">
          <h2 className="font-semibold">Product details</h2>
        </div>
        <form
          className={`flex flex-col`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap">
            {
              product &&
              Object.keys(product).map((key, index) => (
                !OmitItems.includes(key) &&
                <div className="flex flex-col pr-4" key={index} >
                  <label className="font-semibold">
                    {key[0].toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    className="border-b-2 outline-none focus:border-zinc-400"
                    type={numberItems.includes(key) ? "number" : "text"}
                    placeholder="Not set"
                    {...register(key as keyof Product)}
                    required={requiredItems.includes(key)}
                    readOnly={readOnlyItems.includes(key)}
                  />
                </div>
              ))
            }
          </div>
          <div className="flex flex-col" >
            <label className="font-semibold">Categories</label>
            <div className="flex flex-wrap">
              {
                allCategories?.map((item, index) => (
                  <div key={index} className="pr-4">
                    <input
                      className="border-b-2 outline-none focus:border-zinc-400"
                      type="checkbox"
                      value={item.id}
                      {...register(`categories.${index}.id`)}
                    />
                    <label>{item.name} {item.id} </label>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="flex flex-col" >
            <label className="font-semibold">Details</label>
            <textarea
              className="outline-none border-2"
              {...register("details")}
            />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col" >
            <label className="font-semibold">Images </label>
            <ImageEditor ref={imageEditorRef} />
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-row justify-center">
            <Button type="submit" >
              Save
            </Button>
          </div>
        </form >
      </div >
    </FormProvider>
  )
}

