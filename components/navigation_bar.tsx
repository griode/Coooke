"use client";

import logo from "@/assets/icons/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
// Icons
import {
  HiCalendar,
  HiMiniSparkles,
  HiOutlineCalendar,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import { MdFoodBank, MdOutlineFoodBank } from "react-icons/md";

import { HiOutlineSearch } from "react-icons/hi";
import Avatar from "./avatar";
import { InteractiveButton } from "./interactive_panel_props";
import { useCurrentUser } from "@/hooks/use_current_user";
import React from "react";
import {routeNames} from "@/app/router/router";

// Types
interface NavItemType {
  enable: boolean;
  name: string;
  icon: React.ReactNode;
  fillIcon: React.ReactNode;
  path: string; // Path of the navigation item
}

interface NavItemProps {
  item: NavItemType;
  onClick?: () => void;
}

// Component: Single Navigation Item
const NavItem = ({ item, onClick }: NavItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-2 rounded-3xl cursor-pointer hover:bg-slate-100`}
      aria-label={item.name}
    >
      <div className="flex items-center justify-center text-3xl">
        {item.enable ? item.fillIcon : item.icon}
      </div>
    </div>
  );
};

// Component: Navigation Bar
export default function NavigationBar({ pageIndex }: { pageIndex: number }) {
  const router = useRouter(); // Initialize router
  const { currentUser, userPhotoUrl } = useCurrentUser();

  // log out handler

  const handleClick = (index: number) => {
    pageIndex = index;
    if (index < 2) {
      router.push(navItems[index].path);
    }
  };

  // Navigation items configuration
  const navItems: NavItemType[] = [
    {
      enable: pageIndex === 0,
      name: "Home",
      icon: <MdOutlineFoodBank className={"text-3xl"} />,
      fillIcon: <MdFoodBank className={"text-3xl"} />,
      path: routeNames.home,
    },
    {
      enable: pageIndex === 1,
      name: "Menu",
      icon: <HiOutlineCalendar />,
      fillIcon: <HiCalendar />,
      path: routeNames.menu,
    },
  ];

  return (
    <div className="h-16 md:h-full bottom-0 w-full flex-row fixed md:static gap-8 md:top-0 md:left-0 md:right-0 flex border-t md:border-r md:flex-col md:w-fit items-center justify-center md:justify-between bg-white/75 backdrop-blur-lg z-30">
      {/* Top Section */}
      <div className="flex flex-row md:flex-col items-center justify-between h-full w-full p-2 gap-2">
        <div
          onClick={() => router.push(routeNames.home)}
          className="bg-slate-800 rounded-full md:w-8 md:h-8 hidden md:block"
        >
          <Image
            onClick={() => router.push(routeNames.home)}
            className="w-full h-full object-cover"
            src={logo}
            alt="logo"
          />
        </div>

        {navItems.slice(0, 2).map((item, index) => (
          <NavItem
            key={index}
            item={item}
            onClick={() => {
              handleClick(index);
            }}
          />
        ))}
        <InteractiveButton icon={<HiMiniSparkles />} panelId={"chatPanel"} />
        <InteractiveButton icon={<HiOutlineSearch />} panelId={"searchPanel"} />
        <div className="h-full hidden md:block"></div>
        <NavItem
          item={{
            enable: false,
            name: "Profile",
            icon: (
              <Avatar
                className="h-8 w-8 object-cover text-sm"
                onClick={() => router.push(routeNames.profile)}
                radius={24}
                name={currentUser?.displayName ?? ""}
                src={userPhotoUrl ?? ""}
                alt={currentUser?.displayName ?? ""}
                width={100}
                height={100}
              />
            ),
            fillIcon: <HiOutlineCog6Tooth />,
            path: routeNames.profile,
          }}
          onClick={() => {}}
        />
        <div className="hidden md:block">
          <InteractiveButton
            icon={<HiOutlineCog6Tooth />}
            panelId={"profilePanel"}
          />
        </div>
      </div>
    </div>
  );
}
