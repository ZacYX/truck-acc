import { GoBook } from "react-icons/go";
import { TbPigMoney } from "react-icons/tb";
import { FiTruck } from "react-icons/fi";
import { IconType } from "react-icons";
import { CiMenuBurger } from "react-icons/ci";

import { LinkType, Product, Picture } from "./types";


const navItems: LinkType[] = [
  { title: "Contact", link: "/contact" },
  { title: "Blog", link: "/blog" },
  { title: "About us", link: "/aboutus" },
];

const menuItem: { title: string, icon: IconType, link: string, categories: LinkType[] } = {
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

const showCasePictures: Picture[] = [
  {
    id: 0,
    name: "topper",
    width: 1336,
    height: 819,
    url: "/images/topper.jpg",
  },
  {
    id: 1,
    name: "rooftop-topper",
    width: 800,
    height: 600,
    url: "/images/rooftop-topper.jpg",
  },
  {
    id: 2,
    name: "rack-truck",
    width: 530,
    height: 530,
    url: "/images/rack-truck.jpg",
  },
]

const showCases: { index: number, title: string, content: string, picture: Picture }[] = [
  {
    index: 0,
    title: "Truck Toppers",
    content: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    picture: showCasePictures[0],
  },
  {
    index: 1,
    title: "Rooftop Tents",
    content: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    picture: showCasePictures[1],
  },
  {
    index: 2,
    title: "Truck Racks",
    content: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    picture: showCasePictures[2],
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
    pictures: showCasePictures,
    quantity: 5,
    price: 3000,
  },
  {
    id: 2,
    category: ProductCategory.ROOTTOP_TENT,
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    pictures: showCasePictures.slice(1, 2),
    quantity: 5,
    price: 3000,
  },
  {
    id: 3,
    category: ProductCategory.ROOTTOP_TENT,
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    pictures: showCasePictures.slice(2, 3),
    quantity: 5,
    price: 3000,
  },
  {
    id: 4,
    category: ProductCategory.ROOTTOP_TENT,
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    pictures: showCasePictures.slice(2, 3),
    quantity: 5,
    price: 3000,
  },
  {
    id: 5,
    category: ProductCategory.ROOTTOP_TENT,
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    pictures: showCasePictures.slice(1, 3),
    quantity: 5,
    price: 3000,
  },
  {
    id: 6,
    category: ProductCategory.ROOTTOP_TENT,
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    pictures: showCasePictures.slice(0, 3),
    quantity: 5,
    price: 3000,
  },
  {
    id: 7,
    category: ProductCategory.ROOTTOP_TENT,
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    pictures: showCasePictures.slice(1, 3),
    quantity: 5,
    price: 3000,
  },
  {
    id: 8,
    category: ProductCategory.ROOTTOP_TENT,
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    pictures: showCasePictures.slice(2, 3),
    quantity: 5,
    price: 3000,
  },

]


const carouselImages: Picture[] = [
  {
    id: 1,
    name: "cloud-tent-family-s",
    url: "/images/cloud-tent-family-s.jpg",
    width: 2400,
    height: 1800,
  },
  {
    id: 2,
    name: "desert-tent-man-s",
    url: "/images/desert-tent-man-s.jpg",
    width: 2400,
    height: 1600,

  },
  {
    id: 3,
    name: "mountain-tent-foot-s",
    url: "/images/mountain-tent-foot-s.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: 4,
    name: "night-tent-man-s",
    url: "/images/night-tent-man-s.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: 5,
    name: "sun-tent-s",
    url: "/images/sun-tent-s.jpg",
    width: 2400,
    height: 1800,
  },
  {
    id: 6,
    name: "tree-rooftop-suv-s",
    url: "/images/tree-rooftop-suv-s.jpg",
    width: 2400,
    height: 1350,
  },
  {
    id: 7,
    name: "tree-tent-fire-s",
    url: "/images/tree-tent-fire-s.jpg",
    width: 2400,
    height: 1600,
  },
  {
    id: 8,
    name: "night-tree-tent-s",
    url: "/images/night-tree-tent-s.jpg",
    width: 2400,
    height: 3600,
  },
]

export { navItems, menuItem, night, green, cards, showCases, products, ProductCategory, carouselImages };
