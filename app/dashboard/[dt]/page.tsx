"use client";

import Link from "next/link";
import Pagination from "./Pagination";
import Search from "./Search";
import DataTable from "./DataTable";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DataType } from "@/app/lib/types";
import { userListTitle, roleListTitle, permissionListTitle, productListTitle, postListTitle } from "@/app/lib/data"

const ITEM_PER_PAGE = 10;

export default function Page({ params }: { params: { dt: string } }) {
  const route = params.dt;
  console.log("dynamic route: " + route);
  let tableTitle;
  switch (route) {
    case "user":
      tableTitle = userListTitle;
      break;
    case "role":
      tableTitle = roleListTitle;
      break;
    case "permission":
      tableTitle = permissionListTitle;
      break;
    case "product":
      tableTitle = productListTitle;
    case "post":
      tableTitle = postListTitle;
    default:
      console.log(`Not valid path`);
      return
  }
  const baseUrl = `/api/${route}?`;
  const [count, setCount] = useState<number>(0);
  const [searchWord, setSearchWord] = useState<string>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [data, setData] = useState<DataType[]>([]);
  // const [data, setData] = useState<GetDataType<typeof params.dt>[]>([]);

  const reqParams = new URLSearchParams();
  const fetchData = async () => {
    reqParams.set("keyword", searchWord ?? "");
    reqParams.set("page", currentPage.toString());
    reqParams.set("page-size", ITEM_PER_PAGE.toString());
    const response = await fetch(`${baseUrl}${reqParams}`, {
      method: "get",
      headers: { "content-type": "application/json" }
    });

    const { data, totalCount }: { data: DataType[], totalCount: number } = await response.json();
    // const { data, totalCount }: { data: GetDataType<typeof params.dt>[], totalCount: number } = await response.json();
    setData(data);
    setCount(totalCount);
  }

  useEffect(() => {
    fetchData();
  }, [searchWord, currentPage])

  //Pagination callback 
  const changeToPage = (nextPage: number): void => {
    setCurrentPage(nextPage);
    console.log("changeToPage: " + currentPage);
  }

  //Search box callback
  const getSearchWord = (data?: string): void => {
    console.log("getSearchWord: " + data);
    setSearchWord(data);
    setCurrentPage(1);
  }

  //Delete button handler
  const handleDelete = async (id: number) => {
    const params = new URLSearchParams();
    params.set("id", id.toString());
    const response = await fetch(`${baseUrl}${params}`, {
      method: "delete",
      headers: { "content-type": "application/json" }
    });
    if (response.ok) {
      if (Object.keys(data).length !== 0)
        setData(data?.filter((item) => item.id !== id));
    } else {
      alert(await response.json());
    }
  }

  //Edit button handler
  const router = useRouter();
  const currenUrl = usePathname();
  const handleEdit = async (id: number) => {
    router.push(`${currenUrl}/${id}`)
  }

  return (
    <div className="w-full bg-white rounded-md p-4 ">
      <div className="flex flex-row items-center justify-between bg-white rounded-md py-4">
        <Link href={`/dashboard/${route}/new`}>
          <button className="btn hover:bg-lime-500" >
            New {`${route[0].toUpperCase()}${route.substring(1).toLowerCase()}`}
          </button>
        </Link>
        <Search callback={getSearchWord} />
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        {
          data.length > 0 &&
          <DataTable<DataType>
            // <DataTable<GetDataType<typeof params.dt>>
            data={data}
            tableTitle={tableTitle}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        }
      </Suspense>
      <Pagination totalCount={count} currentPage={currentPage} pageSize={ITEM_PER_PAGE} setPageCallback={changeToPage} />
    </div>
  )
}