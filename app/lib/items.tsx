
import { ReactElement } from "react";
import { FaProductHunt, FaUserCircle, FaRegAddressCard } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { ImUserMinus } from "react-icons/im";
import { FaHandPaper } from "react-icons/fa";

const dashboardItems: {
  name: string,
  icon: ReactElement,
  url: string,
}[] = [
    {
      name: "Product",
      icon: <FaProductHunt />,
      url: "/dashboard/product",
    },
    {
      name: "User",
      icon: <FaUserCircle />,
      url: "/dashboard/user",
    },
    {
      name: "Role",
      icon: < ImUserMinus />,
      url: "/dashboard/role",
    },
    {
      name: "Permission",
      icon: <FaHandPaper />,
      url: "/dashboard/permission",
    },
    // {
    //   name: "Email",
    //   icon: <MdOutlineEmail />,
    //   url: "/dashboard/email",
    // },
    {
      name: "Post",
      icon: <FaRegAddressCard />,
      url: "/dashboard/post",
    },
  ]

export { dashboardItems }