import { GoBook } from "react-icons/go";
import { TbPigMoney } from "react-icons/tb";
import { FiTruck } from "react-icons/fi";
import { IconType } from "react-icons";
import { CiMenuBurger } from "react-icons/ci";

export const userListTitle = ["id", "name", "email", "roles.title"]
export const roleListTitle = ["id", "title", "details", "permission.title", "user.name"]
export const permissionListTitle = ["id", "title", "details", "roles.title"]
export const productListTitle = ["id", "sku", "name"]
export const postListTitle = ["id", "title",]

export const navItems = [
  { title: "Tonneau Cover", link: "/shop/cover" },
  { title: "Bed Rack", link: "/shop/rack" },
  { title: "About us", link: "/aboutus" },
];

export const menuItem: {
  title: string,
  icon: IconType,
  link: string,
} = {
  title: "All Products",
  icon: CiMenuBurger,
  link: "/shop/all",
};

export type SectionImage = {
  alt: string,
  url: string,
  width: number,
  height: number,
}

export type SectionData = {
  name: string,
  category: string,
  title: string[],
  content: string[],
  images: SectionImage[],
}

export const firstData: SectionData = {
  name: "first",
  category: "home",
  title: ["BEST VALUE", "FOR", "MONEY"],
  content: [],
  images: [
    {
      alt: "grassland tent family lake",
      url: "/images/cloud-tent-family-s.jpg",
      width: 2400,
      height: 1800,
    }
  ]
}

export const secondData: SectionData = {
  name: "second",
  category: "home",
  title: ["Good Prices, Good Quality"],
  content: ["Here we make it our duty to be the most affordable option on the market and offer you more! You’re guaranteed to get your money’s worth. If you find it's not in Canada with equivalent options, we’ll match it."],
  images: [
    {
      alt: "night tent stars torch",
      url: "/images/night-tent-man-s.jpg",
      width: 2400,
      height: 1600,
    }
  ]
}

export const thirdData: SectionData = {
  name: "third",
  category: "home",
  title: ["Environment Canada issued a heavy"],
  content: ["Here we make it our duty to be the most affordable option on the market and offer you more! You’re guaranteed to get your money’s worth. If you find it's not in Canada with equivalent options, we’ll match it."],
  images: []
}

export const fourthData: SectionData = {
  name: "fourth",
  category: "home",
  title: ["Why This Topper"],
  content: [],
  images: [
    {
      alt: "night tent stars torch",
      url: "/images/night-tree-tent-s.jpg",
      width: 2400,
      height: 3600,
    }
  ]
}

export const fourthCardsData: SectionData = {
  name: "fourthCards",
  category: "homeFourth",
  title: ["Envi Canada issued", "Environment issue", "Environment solution"],
  content: ["After winning the U.S. election this week, Mr. Trump will be impatient to make the tax cuts implemented during his first administration permanent, while lifting regulations in the financial, energy and technology sectors. That will boost corporate profits and provide a further injection of stimulus to the economy.",
    "After winning the U.S. election this week, Mr. Trump will be impatient to make the tax cuts implemented during his first administration permanent, while lifting regulations in the financial, energy and technology sectors. That will boost corporate profits and provide a further injection of stimulus to the economy.",
    "After winning the U.S. election this week, Mr. Trump will be impatient to make the tax cuts implemented during his first administration permanent, while lifting regulations in the financial, energy and technology sectors. That will boost corporate profits and provide a further injection of stimulus to the economy.",
  ],
  images: [
    // {
    //   url: GoBook,
    // },
    // {
    //   url: TbPigMoney,
    // },
    // {
    //   url: FiTruck,
    // }
  ]
};

export const fifthData: SectionData = {
  name: "fifth",
  category: "home",
  title: ["Truck Toppers", "Rooftop Tent", "Truck rack"],
  content: [
    "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
    "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
  ],
  images: [
    {
      alt: "topper",
      width: 1336,
      height: 819,
      url: "/images/topper.jpg",
    },
    {
      alt: "rooftop-topper",
      width: 800,
      height: 600,
      url: "/images/rooftop-topper.jpg",
    },
    {
      alt: "rack-truck",
      width: 530,
      height: 530,
      url: "/images/rack-truck.jpg",
    },
  ]
}

export const aboutUsFirstData: SectionData = {
  name: "aboutUsFirst",
  category: "aboutus",
  title: ["We are here waiting for you"],
  content: [
    "Special weather statements have been issued by Environment and Climate Change Canada on Wednesday morning. The agency says 10 to 15 centimetres of snow for parts of southeastern Saskatchewan and western Manitoba could arrive over the next several days.",
  ],
  images: [
    {
      alt: "topper",
      width: 1336,
      height: 819,
      url: "/images/topper.jpg",
    },
  ]
}

export const shopData = {
  name: "shop",
  category: "shop",
  images: [
    {
      alt: "sun tent",
      url: "/images/sun-tent-s.jpg",
      width: 2400,
      height: 1800,
    }
  ]
}

export const aboutUs = {
  name: "aboutus",
  category: "about-us",
  title: ["We are waiting for you"],
  content: [
    "REGINA — Saskatchewan Opposition NDP Leader Carla Beck says she wants to prove her party “is a government in waiting” as she heads into the incoming legislative session.  Beck held her first caucus meeting on Friday with 27 members, nearly double what she had before the Oct. 28 election but short of the 31 required to form a majority in the 61-seat legislature.  She said her priorities will be health care and cost- of - living issues.",
  ],
  images: [
    {
      alt: "night tent stars torch",
      url: "/images/mountain-tent-foot-s.jpg",
      width: 2400,
      height: 1600,
    }
  ]
}



