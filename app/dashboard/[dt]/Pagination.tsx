"use client";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function Pagination({
  totalCount,
  currentPage,
  pageSize,
  setPageCallback
}: {
  totalCount: number,
  currentPage: number,
  pageSize: number,
  setPageCallback: (nextPage: number) => void,
}) {

  const pages: number[] = [];
  for (let i = 0; i < totalCount / pageSize; i++) {
    pages.push(i + 1);
  }

  return (
    <form className="w-full flex flex-row justify-center items-center gap-4 py-4 ">
      <button
        className="hover:text-orange-500 disabled:text-zinc-400"
        disabled={currentPage === 1}
        formAction={() => setPageCallback(currentPage - 1)}
        type="submit"
      >
        <MdKeyboardArrowLeft />
      </button>
      <div className="flex flex-wrap gap-2">
        {
          pages.map((page, index) => (
            <button
              key={index}
              className={`hover:text-orange-500 visited:text-zinc-200 ${currentPage === page ? "text-orange-500" : ""}`}
              formAction={() => setPageCallback(page)}
              type="submit"
            >
              {page}
            </button>
          ))
        }
      </div>
      <button
        className="hover:text-orange-500 disabled:text-zinc-400"
        disabled={currentPage === pages.length}
        formAction={() => setPageCallback(currentPage + 1)}
        type="submit"
      >
        <MdKeyboardArrowRight />
      </button>
    </form>
  )
}