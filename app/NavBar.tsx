"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { GiCampingTent } from "react-icons/gi";
import { SiFacebook } from "react-icons/si";
import { IoLogoYoutube, IoPersonOutline } from "react-icons/io5";
import { BsCart2 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";

export default function NavBar() {
  const currentPath = usePathname();
  const navItems = [
    {
      title: "Shop",
      link: "/shop",
      categories: [
        { title: "RoofTop Tent", link: "/rooftop-tent" },
        { title: "Truck Topper", link: "/truck-topper" },
        { title: "Truck Rack", link: "/truck-rack" },
      ]
    },
    { title: "Blog", link: "/blog" },
    { title: "Contact", link: "/contact" },
    { title: "About us", link: "/aboutus" },
  ];

  return (
    <div className="relative flex flex-col justify-center items-center bg-white/50">
      {/* Nav bar  */}
      <div className="lg:w-[1024px] xl:w-[1280px] flex flex-row justify-between items-center h-24 ">
        {/*Nav bar logo */}
        <Link href="/"><GiCampingTent size={60} fill="orange" /></Link>
        {/**Nav bar items */}
        <div className="flex flex-row items-center space-x-8">
          {navItems.map((item) => (
            <Link className={`${currentPath === item.link ? "text-orange-500" : "text-zinc-500"} text-zinc-500 hover:text-orange-500 flex flex-row justify-between items-center `}
              key={item.title}
              href={item.link}
            >
              <CategoryMenu {...item} />
              {item.categories && <IoIosArrowDown />}
            </Link>
          ))}
        </div>
        {/**Login and shopping cart */}
        <div className="flex flex-row justify-end space-x-6">
          <IoPersonOutline size={24} className="hover:text-orange-500" />
          <BsCart2 size={24} className="hover:text-orange-500" />
        </div>
      </div>
    </div>
  );
}

// Dropdown menu for shop item of nav bar 
function CategoryMenu({ title, link, categories }: { title: string, link: string, categories?: { title: string, link: string }[] }) {
  const currentPath = usePathname();
  return (
    <div className="dropdown dropdown-hover z-10">
      <div tabIndex={0} className=" m-1">
        <Link href={link}>{title}</Link>
      </div>
      {categories &&
        <ul className="dropdown-content z-[5] menu p-2 shadow bg-base-100 rounded-box w-52">
          {categories?.map((item) => (
            <li
              key={item.title}
            >
              <Link
                href={item.link}
                className={`${currentPath === item.link ? "text-orange-500" : "text-zinc-500"} text-zinc-500 hover:text-orange-500`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>}
    </div>
  );
}