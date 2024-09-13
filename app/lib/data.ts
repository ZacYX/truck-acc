import { GoBook } from "react-icons/go";
import { TbPigMoney } from "react-icons/tb";
import { FiTruck } from "react-icons/fi";
import { IconType } from "react-icons";
import { CiMenuBurger } from "react-icons/ci";

import { Category, Picture, Post, Product, User } from "@prisma/client";

export const userListTitle = ["id", "name", "email", "roles.title"]
export const roleListTitle = ["id", "title", "details", "permission.title", "user.name"]
export const permissionListTitle = ["id", "title", "details", "roles.title"]
export const productListTitle = ["id", "sku", "name"]
export const postListTitle = ["id", "title",]

const navItems = [
  { title: "Contact", link: "/contact" },
  { title: "Blog", link: "/blog" },
  { title: "About us", link: "/aboutus" },
];

const menuItem: { title: string, icon: IconType, link: string, categories: { title: String, link: String }[] } = {
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
    title: "Envi Canada issued",
    content: "Environment Canada issued a heavy snowfall warning for the Edmonton area Saturday.  According to the agency, heavy snowfall is expected to start in Edmonton, St. Albert and Sherwood Park on Sunday.  Between 10 and 20 centimetres is expected, although some areas west of Edmonton may",
  },
  {
    icon: TbPigMoney,
    title: "Environment issued ",
    content: "Environment Canada issued a heavy snowfall warning for the Edmonton area Saturday.  According to the agency, heavy snowfall is expected to start in Edmonton, St. Albert and Sherwood Park on Sunday.  Between 10 and 20 ",
  },
  {
    icon: FiTruck,
    title: "Environment Canada ",
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
    productId: null
  },
  {
    id: 1,
    name: "rooftop-topper",
    width: 800,
    height: 600,
    url: "/images/rooftop-topper.jpg",
    productId: null
  },
  {
    id: 2,
    name: "rack-truck",
    width: 530,
    height: 530,
    url: "/images/rack-truck.jpg",
    productId: null
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


// enum ProductCategory {
//   ROOTTOP_TENT,
//   TRUCK_TOPPER,
//   TRUCK_RACK,
// }

const productCategory: Category = {
  id: 1,
  name: "retrackable",
  details: "retrackable roll up toneau cover",
}

//TBD
type extProduct = Product & {
  pictures: Picture[],
}

const carouselImages: Picture[] = [
  {
    id: 1,
    name: "cloud-tent-family-s",
    url: "/images/cloud-tent-family-s.jpg",
    width: 2400,
    height: 1800,
    productId: 0,
  },
  {
    id: 2,
    name: "desert-tent-man-s",
    url: "/images/desert-tent-man-s.jpg",
    width: 2400,
    height: 1600,
    productId: 0,

  },
  {
    id: 3,
    name: "mountain-tent-foot-s",
    url: "/images/mountain-tent-foot-s.jpg",
    width: 2400,
    height: 1600,
    productId: 0,
  },
  {
    id: 4,
    name: "night-tent-man-s",
    url: "/images/night-tent-man-s.jpg",
    width: 2400,
    height: 1600,
    productId: 0,
  },
  {
    id: 5,
    name: "sun-tent-s",
    url: "/images/sun-tent-s.jpg",
    width: 2400,
    height: 1800,
    productId: 0,
  },
  {
    id: 6,
    name: "tree-rooftop-suv-s",
    url: "/images/tree-rooftop-suv-s.jpg",
    width: 2400,
    height: 1350,
    productId: 0,
  },
  {
    id: 7,
    name: "tree-tent-fire-s",
    url: "/images/tree-tent-fire-s.jpg",
    width: 2400,
    height: 1600,
    productId: 0,
  },
  {
    id: 8,
    name: "night-tree-tent-s",
    url: "/images/night-tree-tent-s.jpg",
    width: 2400,
    height: 3600,
    productId: 0,
  },
]

const products: extProduct[] = [
  {
    id: 1,
    sku: "0001",
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    quantity: 100,
    price: 3000,
    size: "small",
    color: "red",
    pictures: carouselImages,
  },
  {
    id: 1,
    sku: "0001",
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    quantity: 100,
    price: 3000,
    size: "small",
    color: "red",
    pictures: carouselImages,
  },
  {
    id: 1,
    sku: "0001",
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    quantity: 100,
    price: 3000,
    size: "small",
    color: "red",
    pictures: carouselImages,
  },
  {
    id: 1,
    sku: "0001",
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    quantity: 100,
    price: 3000,
    size: "small",
    color: "red",
    pictures: carouselImages,
  },
  {
    id: 1,
    sku: "0001",
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    quantity: 100,
    price: 3000,
    size: "small",
    color: "red",
    pictures: carouselImages,
  },
  {
    id: 1,
    sku: "0001",
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    quantity: 100,
    price: 3000,
    size: "small",
    color: "red",
    pictures: carouselImages,
  },
  {
    id: 1,
    sku: "0001",
    name: "Rooftop tent 1",
    details: "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    quantity: 100,
    price: 3000,
    size: "small",
    color: "red",
    pictures: carouselImages,
  },

]


export { navItems, menuItem, night, green, cards, showCases, products, carouselImages, };
