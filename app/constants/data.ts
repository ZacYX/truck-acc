import { GoBook } from "react-icons/go";
import { TbPigMoney } from "react-icons/tb";
import { FiTruck } from "react-icons/fi";
import { IconType } from "react-icons";
import { CiMenuBurger } from "react-icons/ci";

import { LinkType, Product, Photo } from "./types";


const navItems: LinkType[] = [
  { title: "Contact", link: "/contact" },
  { title: "Blog", link: "/blog" },
  { title: "About us", link: "/aboutus" },
];

const menuItem: { title: string, icon: IconType, link: string, categories: types.LinkType[] } = {
  title: "Shop",
  icon: CiMenuBurger,
  link: "/shop/all",
  categories: [
    { title: "RoofTop Tent", link: "/shop/rooftop-tent" },
    { title: "Truck Topper", link: "/shop/truck-topper" },
    { title: "Truck Rack", link: "/shop/truck-rack" },
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
    pic: "/images/rooftop-topper.jpg",
  },
  {
    index: 2,
    title: "Truck Racks",
    content: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    pic: "/images/rack-truck.jpg",
  },
]

enum ProductCategory {
  ROOTTOP_TENT,
  TRUCK_TOPPER,
  TRUCK_RACK,
}

const products: Product[] = [
  {
    id: 1,
    category: ProductCategory.ROOTTOP_TENT,
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    image: "/images/rooftop-topper.jpg",
    quantity: 5,
    price: 3000,
  },
  {
    id: 2,
    category: ProductCategory.ROOTTOP_TENT,
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    image: "/images/rooftop-topper.jpg",
    quantity: 5,
    price: 3000,
  },
  {
    id: 3,
    category: ProductCategory.ROOTTOP_TENT,
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    image: "/images/rooftop-topper.jpg",
    quantity: 5,
    price: 3000,
  },
  {
    id: 4,
    category: ProductCategory.ROOTTOP_TENT,
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    image: "/images/rooftop-topper.jpg",
    quantity: 5,
    price: 3000,
  },
  {
    id: 5,
    category: ProductCategory.ROOTTOP_TENT,
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    image: "/images/rooftop-topper.jpg",
    quantity: 5,
    price: 3000,
  },
  {
    id: 6,
    category: ProductCategory.ROOTTOP_TENT,
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    image: "/images/rooftop-topper.jpg",
    quantity: 5,
    price: 3000,
  },
  {
    id: 7,
    category: ProductCategory.ROOTTOP_TENT,
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    image: "/images/rooftop-topper.jpg",
    quantity: 5,
    price: 3000,
  },
  {
    id: 8,
    category: ProductCategory.ROOTTOP_TENT,
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    image: "/images/rooftop-topper.jpg",
    quantity: 5,
    price: 3000,
  },

]

const carouselImages: Photo[] = [
  {
    id: 1,
    title: "cloud-tent-family-s",
    path: "/images/cloud-tent-family-s.jpg",
    width: 2400,
    height: 1800,
  },
  {
    id: 2,
    title: "desert-tent-man-s",
    path: "/images/desert-tent-man-s.jpg",
    width: 2400,
    height: 1600,

  },
  {
    id: 3,
    title: "mountain-tent-foot-s",
    path: "/images/mountain-tent-foot-s.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: 4,
    title: "night-tent-man-s",
    path: "/images/night-tent-man-s.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: 5,
    title: "sun-tent-s",
    path: "/images/sun-tent-s.jpg",
    width: 2400,
    height: 1800,
  },
  {
    id: 6,
    title: "tree-rooftop-suv-s",
    path: "/images/tree-rooftop-suv-s.jpg",
    width: 2400,
    height: 1350,
  },
  {
    id: 7,
    title: "tree-tent-fire-s",
    path: "/images/tree-tent-fire-s.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: 8,
    title: "night-tree-tent-s",
    path: "/images/night-tree-tent-s.jpg",
    width: 2400,
    height: 3600,
  },
]

export { navItems, menuItem, night, green, cards, showCases, products, ProductCategory, carouselImages };
