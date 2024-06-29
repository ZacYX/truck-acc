"use client";

import { CiSearch } from "react-icons/ci";

export default function Search({ callback }: {
  callback: (data: string) => void
}) {

  const handleSubmit = (formData: FormData) => {
    callback(formData.get("search")?.toString() ?? "");
  }

  return (
    <form action={handleSubmit}>
      <label className="input input-bordered flex items-center gap-2">
        <input name="search" type="text" className="grow" placeholder="Search" />
        <button type="submit">
          <CiSearch className="hover:cursor-pointer" />
        </button>
      </label>
    </form>
  )
}