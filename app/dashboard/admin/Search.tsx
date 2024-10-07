"use client";

import { CiSearch } from "react-icons/ci";

export default function Search({ callback, className }: {
  callback?: (data: string) => void,
  className?: string
}) {

  const handleSubmit = (formData: FormData) => {
    if (!callback) {
      console.log("No callback function");
      return;
    }
    callback(formData.get("search")?.toString() ?? "");
  }

  return (
    <form action={handleSubmit}>
      <label className={`input input-bordered flex items-center gap-2 ${className}`}>
        <input name="search" type="text" className="grow" placeholder="Search" />
        <button type="submit">
          <CiSearch className="hover:cursor-pointer" />
        </button>
      </label>
    </form>
  )
}