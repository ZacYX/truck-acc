import { GoBook } from "react-icons/go";
import { TbPigMoney } from "react-icons/tb";
import { FiTruck } from "react-icons/fi";
import { IconType } from "react-icons";
import { CiMenuBurger } from "react-icons/ci";

type LinkType = {
  title: string,
  link: string,
}

const navItems: LinkType[] = [
  { title: "Blog", link: "/blog" },
  { title: "Contact", link: "/contact" },
  { title: "About us", link: "/aboutus" },
];

const menuItem: {title: string, icon: IconType, link: string, categories: LinkType[]} = {
    title: "Shop",
    icon:  CiMenuBurger,
    link: "/shop",
    categories: [
      { title: "RoofTop Tent", link: "/rooftop-tent" },
      { title: "Truck Topper", link: "/truck-topper" },
      { title: "Truck Rack", link: "/truck-rack" },
    ]
  };

const night = {
  title: "Good Prices, Good Quality",
  content: "Here we make it our duty to be the most affordable option on the market and offer you more! You’re guaranteed to get your money’s worth. If you find it's not in Canada with equivalent options, we’ll match it.",
};

const green = {
  title: "Environment Canada issued a heavy ",
  context: "Environment Canada issued a heavy snowfall warning for the Edmonton area Saturday.  According to the agency, heavy snowfall is expected to start in Edmonton, St. Albert and Sherwood Park on Sunday.  Between 10 and 20 centimetres is expected, although some areas west of Edmonton may",
};

const cards: { icon: IconType, title: string, content: string }[] = [
  {
    icon: GoBook,
    title: "Environment Canada issued",
    content: "Environment Canada issued a heavy snowfall warning for the Edmonton area Saturday.  According to the agency, heavy snowfall is expected to start in Edmonton, St. Albert and Sherwood Park on Sunday.  Between 10 and 20 centimetres is expected, although some areas west of Edmonton may",
  },
  {
    icon: TbPigMoney,
    title: "Environment Canada issued ",
    content: "Environment Canada issued a heavy snowfall warning for the Edmonton area Saturday.  According to the agency, heavy snowfall is expected to start in Edmonton, St. Albert and Sherwood Park on Sunday.  Between 10 and 20 ",
  },
  {
    icon: FiTruck,
    title: "Environment Canada issued ",
    content: "Environment Canada issued a heavy snowfall warning for the Edmonton area Saturday.  According to the agency, heavy snowfall is expected to start in Edmonton, St. Albert and Sherwood Park on Sunday.  Between 10 and 20 centimetres is expected, although ",
  },
];

const showCases = [
  {
    index: 0,
    title: "Truck Toppers",
    content: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    pic: "/images/topper.jpg",
  },
  {
    index: 1,
    title: "Rooftop Tents",
    content: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    pic: "/images/rooftop3.jpg",
  },
  {
    index: 2,
    title: "Truck Racks",
    content: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    pic: "/images/rack2.jpg",
  },
]


export { navItems, menuItem, night, green, cards, showCases };