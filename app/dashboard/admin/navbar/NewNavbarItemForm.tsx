import { NavbarItem } from "@prisma/client";
import { FormEvent } from "react";
import { ListItems } from "./NavbarItemList";

export default function NewNavbarItemForm({ navbarItems, setNavbarItems }:
  {
    navbarItems: Array<NavbarItem>,
    setNavbarItems: (items: Array<NavbarItem>) => void
  }
) {
  const newNavbarItemHandler = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formdata = new FormData(form);
    const obj = Object.fromEntries(formdata.entries());
    formdata.forEach((key, value) => {
      console.debug(`formdata: ${key}: ${value}`)
    });
    console.debug(`Object: ${JSON.stringify(obj)}`);

    try {
      const response = await fetch(`/api/navbar`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(obj)
      })
      if (!response.ok) {
        console.error(`write database failed`);
        return;
      }
      const result = await response.json();
      if (!result) {
        console.error(`write database failed`);
        return;
      }
      form.reset();
      setNavbarItems([...navbarItems, result]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    < form
      onSubmit={newNavbarItemHandler}
      className="grid grid-cols-8 " >
      {
        ListItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-row justify-center border-1 px-2 
                ${(item === "details" || item === "link") ? "col-span-2" : ""}`}
          >
            <input
              disabled={item === "id"}
              className={`w-full outline-none 
                  ${(item === "id") ? "" : " hover:border-zinc-400 border-b-1"}`}
              type="text"
              name={item}
              defaultValue={item === "id" ? "New" : ""}
            />
          </div>
        ))
      }
      < div
        className={`flex flex-row justify-around border-1 `
        }
      >
        <button type="submit">Save</button>
        <button type="reset">Reset</button>
      </div >
    </form >
  )

}