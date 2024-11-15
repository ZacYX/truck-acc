"use client";

import { ReactNode, useEffect, useState } from "react"
import Pagination from "../Pagination"
import Search from "../Search"
import { Product } from "@prisma/client";
import Link from "next/link";
import { VscNewFile } from "react-icons/vsc";
import { useConfirm } from "@/app/hook/confirm";
import ConfirmModal from "@/app/dashboard/ConfirmModal";

const ListItems = [
  "id",
  // "sku",
  "name",
  // "brand",
  "inventory",
  "price",
  "salePrice",
  // "createAt",
  // "updateAt",
  "action"
]
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export default function ProductList() {
  const [products, setProducts] = useState<Array<Product>>();
  const [count, setCount] = useState();
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_CURRENT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { confirm, isOpen, onCancel, onConfirm } = useConfirm();

  const setPageCallback = (nextCurrentPage: number) => {
    setCurrentPage(nextCurrentPage);
  }

  const deleteHandler = async (id: number) => {
    const isConfirmed = await confirm();
    if (isConfirmed) {
      try {
        const response = await fetch(`/api/product?id=${id}`, { method: "DELETE" });
        const result = await response.json();
        if (result.id === id) {
          setProducts(products?.filter((product) => (product.id !== result.id)));
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.debug(`Operation canceled`);
    }
  }

  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set("page-size", pageSize.toString());
    searchParams.set("page", currentPage?.toString());
    const requests = [
      fetch("/api/product?count="),
      fetch(`/api/product?${searchParams}`),
    ];
    const fetchProductsAndCount = async () => {
      try {
        const responses = await Promise.all(requests);
        const results = await Promise.all(responses.map((response => response.json())));
        setCount(results[0]);
        setProducts(results[1]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProductsAndCount();
  }, [currentPage, pageSize])

  return (
    <div className="flex flex-col">
      <div className="border-b-2 py-2 mb-8 flex flex-row justify-between items-center">
        <div className="flex flex-row">
          <h2 className="pr-2 font-semibold rounded-md">Product</h2>
          <button className="px-2 font-semibold  hover:bg-slate-200">
            <Link href={`/dashboard/admin/product/new`}><VscNewFile /></Link>
          </button>
        </div>
        <Search className="h-8" />
      </div>
      {/* Table header */}
      <div className={`grid ${`grid-cols-${ListItems.length}`}  `}>
        {/* <div className={`grid grid-cols-6  `}> */}
        {ListItems.map((item, index) => (
          <div key={index}
            className="border-1 flex flex-row justify-center">
            {item[0].toUpperCase() + item.slice(1)}
          </div>
        ))}
      </div>
      {/* Table content, user list */}
      {
        (Array.isArray(products) && products.length > 0)
          ? products.map((product, index) => (
            <div key={index} className={`grid grid-cols-${ListItems.length} hover:opacity-50`}>
              {Object.entries(product).map((entry, index2) => (
                ListItems.includes(entry[0]) &&
                <div key={index2}
                  className="overflow-hidden whitespace-nowrap border-1 flex flex-row 
                  justify-around px-2 "
                >
                  {entry[1] as ReactNode}
                </div>
              ))}
              <div
                className="overflow-hidden whitespace-nowrap border-1 flex flex-row justify-around"
              >
                <button
                  className="hover:bg-slate-200 px-4 rounded-md"
                >
                  <Link href={`/dashboard/admin/product/${product.id}`} > Edit </Link>
                </button>
                <button
                  className="hover:bg-slate-200 px-4 rounded-md"
                  onClick={() => deleteHandler(product.id)}
                >Delete</button>
              </div>
            </div>
          ))
          : <p>No product found {products?.length}</p>
      }
      <div className="flex flex-row justify-center">
        <Pagination
          totalCount={count}
          currentPage={currentPage}
          pageSize={pageSize}
          setPageCallback={setPageCallback}
        />
      </div>
      <ConfirmModal
        isOpen={isOpen}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </div>
  )
}