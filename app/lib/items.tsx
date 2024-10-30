
import { ReactElement } from "react";
import { FaProductHunt, FaUserCircle, FaRegAddressCard } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { ImUserMinus } from "react-icons/im";
import { FaHandPaper } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdCategory } from "react-icons/md";
import { SideBarSectionItem } from "../dashboard/SideBarSection";

export const settingsSectionItems: SideBarSectionItem[] = [
  {
    name: "Profile",
    path: "/dashboard/settings/profile",
    icon: <ImProfile />
  }
]

export const adminSectionItems: SideBarSectionItem[] = [
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
  // {
  //   name: "Role",
  //   icon: < ImUserMinus />,
  //   path: "/dashboard/admin/role",
  // },
  // {
  //   name: "Permission",
  //   icon: <FaHandPaper />,
  //   path: "/dashboard/admin/permission",
  // },
  // {
  //   name: "Post",
  //   icon: <FaRegAddressCard />,
  //   path: "/dashboard/admin/post",
  // },
]
