"use client";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Pagination({
  totalCount,
  currentPage,
  pageSize,
  setPageCallback
}: {
  totalCount?: number,
  currentPage?: number,
  pageSize?: number,
  setPageCallback?: (nextPage: number) => void,
}) {
  const localTotalCount = totalCount ?? 1;
  const localCurrentPage = currentPage ?? 1;
  const localPageSize = pageSize ?? 10;
  const localSetPageCallback = setPageCallback ?? (() => { console.log("No callback set") });

  const pages: number[] = [];
  for (let i = 0; i < localTotalCount / localPageSize; i++) {
    pages.push(i + 1);
  }

  return (
    <form className="w-full flex flex-row justify-center items-center gap-4 py-4 ">
      <button
        className="hover:text-orange-500 disabled:text-zinc-400"
        disabled={localCurrentPage === 1}
        formAction={() => localSetPageCallback(localCurrentPage - 1)}
        type="submit"
      >
        <MdKeyboardArrowLeft />
      </button>
      <div className="flex flex-wrap gap-2">
        {
          pages.map((page, index) => (
            <button
              key={index}
              className={`hover:text-orange-500 visited:text-zinc-200 ${localCurrentPage === page ? "text-orange-500" : ""}`}
              formAction={() => localSetPageCallback(page)}
              type="submit"
            >
              {page}
            </button>
          ))
        }
      </div>
      <button
        className="hover:text-orange-500 disabled:text-zinc-400"
        disabled={localCurrentPage === pages.length}
        formAction={() => localSetPageCallback(localCurrentPage + 1)}
        type="submit"
      >
        <MdKeyboardArrowRight />
      </button>
    </form>
  )
}