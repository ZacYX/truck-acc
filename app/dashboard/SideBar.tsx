"use client";

import Avatar from "./Avatar";
import LogoutButton from "../auth/components/LogoutButton";

import SideBarSection from "./SideBarSection";
import { dataAdminSectionItems, settingsSectionItems, websiteAdminSectionItems } from "../lib/items";
import { User, UserRole } from "@prisma/client";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../hook/session";


export default function SideBar() {
  const [role, setRole] = useState<string>();
  const user = useCurrentUser() as User;

  useEffect(() => {
    const fetchUserRole = () => {
      const userRole = user?.role;
      if (userRole) {
        setRole(userRole);
      }
    };
    fetchUserRole();
  }, [user]);

  return (
    <div className="min-w-64 flex flex-col justify-start items-start bg-white rounded-md p-4">
      <div className="w-full flex flex-row py-4">
        <Avatar image={user?.image ?? undefined} />
        <div className="px-4 ">
          <p className="font-bold">{user?.name ?? "User Name"}</p>
          <p className="text-xs">{user?.role ?? "User role"}</p>
        </div>
      </div>
      <div className="w-full py-2">
        <SideBarSection name="Settings" items={settingsSectionItems} />
        {role === UserRole.ADMIN &&
          <SideBarSection name="Data" items={dataAdminSectionItems} />
        }
        {role === UserRole.ADMIN &&
          <SideBarSection name="Website" items={websiteAdminSectionItems} />
        }
        <div className="min-w-20 py-2 hover:bg-zinc-200 transition-all border-t-2">
          <LogoutButton >
            Sign Out
          </LogoutButton>
        </div>

      </div>
    </div>
  )
}