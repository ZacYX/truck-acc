import ConfirmModal from "@/app/dashboard/ConfirmModal";
import { useConfirm } from "@/app/hook/confirm";
import { NavbarItem } from "@prisma/client";
import { FormEvent } from "react";

export default function NavbarItemForms({ navbarItems, setNavbarItems }: {
  navbarItems: Array<NavbarItem>,
  setNavbarItems: (itmes: Array<NavbarItem>) => void
}) {
  const { confirm, isOpen, onConfirm, onCancel } = useConfirm();

  const formSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formdata = new FormData(form);
    const obj = Object.fromEntries(formdata.entries());
    console.debug(`Object: ${JSON.stringify(obj)}`);
    const submitEvent = event.nativeEvent as SubmitEvent;
    const clickedButton = submitEvent.submitter as HTMLButtonElement;
    //handle delete
    if (clickedButton.value === "delete") {
      const userConfirm = await confirm();
      if (!userConfirm) {
        console.debug(`User canceled`);
        return;
      }
      console.debug(`delete item id: ${obj.id}`)
      try {
        const response = await fetch(`/api/navbar?id=${obj.id}`, { method: "DELETE", });
        if (!response.ok) {
          console.error(`delete navbar item failed`);
          return;
        }
        const result = await response.json();
        if (result) {
          console.debug(`deleted item id: ${result.id}`);
          const nextNavbarItems = navbarItems.filter((item) => item.id !== result.id);
          console.debug(JSON.stringify(nextNavbarItems));
          nextNavbarItems.forEach((item) => console.debug(JSON.stringify(Object.entries(item))));
          setNavbarItems(nextNavbarItems);
        }
      } catch (error) {
        console.error(error);
      }
    }
    //handle update
    if (clickedButton.value === "update") {
      console.debug(`update button clicked`);
      try {
        const response = await fetch(`/api/navbar`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(obj)
        })
        if (!response.ok) {
          console.error(`update database failed to response`);
          return;
        }
        const result = await response.json();
        if (!result) {
          console.error(`update database failed`);
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <ul>
      {
        navbarItems?.map((item) => (
          //!!!!!!!! important !!!!!!!!!!! 
          // use id instead of index to solve the render issue
          //when using index as key, deleting the last but one 
          //lead to the last item being deleted on ui
          <li key={item.id} >
            <form
              onSubmit={formSubmitHandler}
              className="grid grid-cols-8 "
            >
              {
                Object.entries(item).map((entry, index) => (
                  <div
                    key={index}
                    className={`flex flex-row justify-center border-1 px-2
                        ${(entry[0] === "details" || entry[0] === "link")
                        ? "col-span-2" : ""}`}
                  >
                    <input
                      readOnly={entry[0] === "id"}
                      className={`w-full outline-none 
                               ${(entry[0] === "id") ? "" : " hover:border-zinc-400 border-b-1"}`}
                      type="text"
                      name={entry[0]}
                      defaultValue={entry[1]?.toString() ?? ""}
                    />
                  </div>
                ))
              }
              <div
                className={`flex flex-row justify-around border-1 `}
              >
                <button type="submit" name="updateButton" value="update" >Update</button>
                <button type="submit" name="deleteButton" value="delete" >Delete</button>
              </div>
            </form>
          </li>
        ))
      }

      <ConfirmModal
        isOpen={isOpen}
        onCancel={onCancel}
        onConfirm={onConfirm}
        header="Delete confirmation"
        body="Are you sure you want to delete this item?"
      />
    </ul>
  )
}