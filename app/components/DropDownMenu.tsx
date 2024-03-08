import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { menuItem } from "../constants/data";

export default function DropdownMenu() {

  const currentPath = usePathname();

  return (
    <div className="dropdown dropdown-hover z-10">
      <div tabIndex={0} className="m-1">
        <Link
          href={menuItem.link}
          className={`${currentPath === menuItem.link ? "text-orange-500" : "text-zinc-500"}  hover:text-orange-500 `}
        >
          <span className="hidden md:flex flex-row justify-center items-center">
            {menuItem.title} <IoIosArrowDown />
          </span>
          <menuItem.icon className="md:hidden" size={24} />
        </Link>
      </div>
      <ul className="dropdown-content z-[5] menu p-2 shadow bg-base-100 rounded-box w-52">
        {menuItem.categories.map((item, index) => (
          <li
            key={index}
          >
            <Link
              href={item.link}
              className={`${currentPath === item.link ? "text-orange-500" : "text-zinc-500"} hover:text-orange-500`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
