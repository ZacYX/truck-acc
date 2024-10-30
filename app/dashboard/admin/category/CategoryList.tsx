"use client";

import { Category } from "@prisma/client";
import { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/pagination";
import NewCategoryForm from "./NewCategoryForm";
import CategoryForms from "./CategoryForms";

export const ListItems = [
  "id",
  "name",
  "details",
]

const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export default function CategoryList() {
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_CURRENT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("page-size", pageSize.toString());
        searchParams.set("page", currentPage.toString());
        const response = await fetch(`/api/category?${searchParams}`);
        if (!response.ok) {
          console.error(`fetch categories failed`);
          return
        }
        const result = await response.json();
        setCategories(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, [currentPage, pageSize])

  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.set("count", "");
        const response = await fetch(`/api/category?${searchParams}`);
        if (!response.ok) {
          console.error(`fetch total count error`);
          return;
        }
        const result = await response.json()
        console.debug(`get total count: ${result}, pages: ${result / pageSize}`)
        setTotalCount(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTotalCount();

  }, [categories, pageSize])

  return (
    <div>
      <div className="border-b-2 py-2 mb-8 flex flex-row justify-between items-center">
        <h2 className="font-semibold">Category</h2>
      </div>
      {/* header */}
      <div className="grid grid-cols-6 ">
        {
          ListItems.map((item, index) => (
            <div
              key={index}
              className={`flex flex-row justify-center border-1 
                ${(item === "details") ? "col-span-3" : ""}`}
            >
              {item.toUpperCase()}
            </div>
          ))
        }
        <div
          className={`flex flex-row justify-center border-1 `}
        >
          ACTION
        </div>
      </div>
      {/* exsiting category list */}
      <CategoryForms
        categories={categories}
        setCategories={setCategories}
      />
      {/* create a new category */}
      <NewCategoryForm
        categories={categories}
        setCategories={setCategories}
      />
      <div className="flex flex-row justify-center pt-4 ">
        <Pagination
          isCompact
          total={Math.ceil(totalCount / pageSize)}
          initialPage={currentPage}
          page={currentPage}
          onChange={(page: number) => { setCurrentPage(page) }}
          classNames={{
            wrapper: "bg-transparent gap-0  h-8 rounded  ",
            item: "w-8 h-8 text-small rounded-none bg-transparent",
            cursor: "text-orange-400  bg-zinc-200",
          }}
        />
      </div>
    </div>
  )
}