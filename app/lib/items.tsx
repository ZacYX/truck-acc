
import { FaProductHunt, FaUserCircle, FaRegAddressCard } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdCategory } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { LiaSitemapSolid } from "react-icons/lia";
import { SideBarSectionItem } from "../dashboard/SideBarSection";

export const settingsSectionItems: SideBarSectionItem[] = [
  {
    name: "Profile",
    path: "/dashboard/settings/profile",
    icon: <ImProfile />
  }
]

export const dataAdminSectionItems: SideBarSectionItem[] = [
  {
    name: "User",
    icon: <FaUserCircle />,
    path: "/dashboard/admin/user",
  },
  {
    name: "Product",
    icon: <FaProductHunt />,
    path: "/dashboard/admin/product",
  },
  {
    name: "Category",
    icon: <MdCategory />,
    path: "/dashboard/admin/category",
  },
]

export const websiteAdminSectionItems: SideBarSectionItem[] = [
  {
    name: "Webpage",
    icon: <CgWebsite />,
    path: "/dashboard/admin/website",
  },
  {
    name: "Navbar",
    icon: <LiaSitemapSolid />,
    path: "/dashboard/admin/navbar",
  },
]
