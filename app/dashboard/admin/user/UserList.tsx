"use client";

import { ReactNode, useEffect, useState } from "react"
import Pagination from "../Pagination"
import Search from "../Search"
import { User } from "@prisma/client";
import Link from "next/link";
import { useConfirm } from "@/app/hook/confirm";
import ConfirmModal from "@/app/dashboard/ConfirmModal";

const ListItems = [
  "ID",
  "NAME",
  "EMAIL",
  "VERIFIED",
  "IMAGE",
  "ROLE",
  "ACTION"
]
const DEFAULT_CURRENT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export default function UserList() {
  const [users, setUsers] = useState<Array<User>>();
  const [count, setCount] = useState();
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_CURRENT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { confirm, isOpen, onCancel, onConfirm } = useConfirm();

  const setPageCallback = (nextCurrentPage: number) => {
    setCurrentPage(nextCurrentPage);
  }

  const deleteHandler = async (id: string) => {
    const isConfirmed = await confirm();
    if (isConfirmed) {
      try {
        const response = await fetch(`/api/user?id=${id}`, { method: "DELETE" });
        const result = await response.json();
        if (result.id === id) {
          setUsers((users) => users?.filter((user) => (user.id !== id)));
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
      fetch("/api/user?count"),
      fetch(`/api/user?${searchParams}`),
    ];
    const fetchUsersAndCount = async () => {
      try {
        const responses = await Promise.all(requests);
        const results = await Promise.all(responses.map((response => response.json())));
        setCount(results[0]);
        setUsers(results[1]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsersAndCount();
  }, [currentPage, pageSize])

  return (
    <div className="">
      <ConfirmModal
        isOpen={isOpen}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
      <div className="border-b-2 py-2 mb-8 flex flex-row justify-between items-center">
        <h2 className="font-semibold">User</h2>
        <Search className="h-8" />
      </div>
      {/* Table header */}
      <div className="grid grid-cols-7 gap-0 ">
        {ListItems.map((item, index) => (
          <div key={index}
            className="border-1 flex flex-row justify-center">
            {item}
          </div>
        ))}
      </div>
      {/* Table content, user list */}
      {
        (Array.isArray(users) && users.length > 0)
          ? users.map((user, index) => (
            <div key={index} className="grid grid-cols-7 gap-0 ">
              {Object.entries(user).map((entry, index2) => (
                !(entry[0] === "password") &&
                <div key={index2}
                  className="overflow-hidden whitespace-nowrap border-1 flex flex-row justify-around px-2"
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
                  <Link href={`/dashboard/admin/user/${user.id}`} > Edit </Link>
                </button>
                <button
                  className="hover:bg-slate-200 px-4 rounded-md"
                  onClick={() => deleteHandler(user.id)}
                >Delete</button>
              </div>
            </div>
          ))
          : <p>No user found {users?.length}</p>
      }
      <div className="flex flex-row justify-center">
        <Pagination
          totalCount={count}
          currentPage={currentPage}
          pageSize={pageSize}
          setPageCallback={setPageCallback}
        />
      </div>
    </div>
  )
}