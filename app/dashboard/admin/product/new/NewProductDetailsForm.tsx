"use client";

import { Button } from "@nextui-org/button"
import { Category, Picture, Product } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form"
import ImageEditor from "./ImageEditor";

const newProductItems = [
  "sku",
  "name",
  "brand",
  "inventory",
  "price",
  "salePrice",
] as const;

export const readOnlyItems = [
  "id",
  "createAt",
  "updateAt",
  "url",
  "height",
  "width",
];

export const numberItems = [
  "inventory",
  "price",
  "salePrice",
  "width",
  "height",
]

export const requiredItems = [
  "sku",
  "name",
]

export type PictureInfo = Omit<Picture, "productId" | "createAt">;
export type ProductInfo = Omit<Product, "id" | "createAt" | "updateAt">;
export type ProductDetails = ProductInfo & {
  categories: { id: number }[],
  images: PictureInfo[],
};
export type ChildRef = {
  remove: () => void,
}

export default function NewProductDetailsForm() {
  const [categories, setCategories] = useState<Array<Category>>();
  const methods = useForm<ProductDetails>({
    defaultValues: {
      images: []
    },
  });
  const { register, handleSubmit, control, reset, formState: { errors } } = methods;
  const imageEditorRef = useRef<ChildRef>(null);

  const onSubmit = async (data: FieldValues) => {
    const { images, categories, ...product } = data;
    try {
      //write product info in to database
      const productResponse = await fetch(`/api/product`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!productResponse.ok) {
        console.error(`No response when write product into database`);
        return;
      }
      const productResult = await productResponse.json();
      if (!productResult) {
        console.error(`create product in database failed`);
        return;
      }
      //connect product with category in database
      const connectProductWithCatResponse = await fetch(`/api/product`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: productResult.id,
          categories: categories,
        }),
      })
      if (!connectProductWithCatResponse.ok) {
        console.debug(`Connect categories with product in database failed`);
        return;
      }
      //write images info in to database
      const imagesWithProductId = images?.map((image: Picture) => ({
        ...image,
        productId: productResult.id,
      }));
      const updatePromises = imagesWithProductId.map((item: Picture) => (
        fetch(`/api/picture`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(item),
        })
      ));
      const updateResponses: PromiseSettledResult<any>[] = await Promise.allSettled(updatePromises);
      updateResponses.forEach((item) => {
        if (item.status !== 'fulfilled') {
          console.log(`update image failed: ${JSON.stringify(item.reason)}`);
          return;
        }
      });

      //clear all data after submit sucessully
      reset();
      imageEditorRef.current?.remove();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("page-size", "100");
    const fetchCategories = async () => {
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
      setCategories(result);
    }
    fetchCategories();
  }, [])

  return (
    <FormProvider {...methods}>
      <div className="bg-white p-4">
        <div className="border-b-2 py-2 mb-4 flex flex-row justify-between items-center">
          <h2 className="font-semibold">New product</h2>
        </div>
        <form
          className={`flex flex-col`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap pr-4">
            {
              newProductItems.map((item, index) => (
                <div className="flex flex-col" key={index} >
                  <label className="font-semibold">
                    {item[0].toUpperCase() + item.slice(1)}
                  </label>
                  <input
                    className="border-b-2 outline-none focus:border-zinc-400"
                    type={numberItems.includes(item) ? "number" : "text"}
                    placeholder="Not set"
                    defaultValue={undefined}
                    {...register(item)}
                    required={requiredItems.includes(item)}
                    readOnly={readOnlyItems.includes(item)}
                  />
                </div>
              ))
            }
          </div>
          <div className="flex flex-col" >
            <label className="font-semibold">Categories</label>
            <div className="flex flex-wrap">
              {
                categories?.map((category, index) => (
                  <div key={category.id} className="pr-4">
                    <input
                      className="border-b-2 outline-none focus:border-zinc-400"
                      type="checkbox"
                      value={category.id}
                      {...register(`categories.${index}.id`)}
                    />
                    <label>{category.name}</label>
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

          <div className="col-span-1 md:col-span-2 flex flex-row justify-around">
            <Button
              type="reset"
              onClick={
                () => {
                  imageEditorRef.current?.remove();
                }}
            >
              Reset
            </Button>
            <Button type="submit" > Save </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}