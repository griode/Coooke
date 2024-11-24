"use client";

import logo from "@/app/assets/icons/logo.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
// Icons
import {
  HiMiniHome,
  HiOutlineHome,
  HiOutlineCalendar,
  HiCalendar,
  HiOutlineCog6Tooth,
  HiMiniCog6Tooth,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import { LiaUserEditSolid } from "react-icons/lia";
import InteractivePanel from "./interactive_panel_props";
import { OutlineButton } from "./button";

import RecipeGenerator from "../view/recipe_generate/recipe_generator";
import { HiOutlineSearch, HiSearch } from "react-icons/hi";
import Avatar from "./avatar";
import CircularProgress from "./circular_progress";
import { useCurrentUser } from "../hooks/use_current_user";
import SearchPage from "../view/search/page";

//
let pageIndex = 0;

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
      className={`flex flex-col items-center justify-center p-2 rounded-3xl cursor-pointer`}
      aria-label={item.name}
    >
      <div className="flex items-center justify-center text-2xl">
        {item.enable ? item.fillIcon : item.icon}
      </div>
    </div>
  );
};

// Component: Navigation Bar
export default function NavigationBar() {
  const router = useRouter(); // Initialize router
  const { currentUser, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="p-24">
        <CircularProgress size={40} />
      </div>
    );
  }

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
      icon: <HiOutlineHome />,
      fillIcon: <HiMiniHome />,
      path: "/view/home",
    },
    {
      enable: pageIndex === 1,
      name: "Menu",
      icon: <HiOutlineCalendar />,
      fillIcon: <HiCalendar />,
      path: "/view/menu",
    },
  ];

  return (
    <div className="flex border-r flex-col w-fit h-full items-center justify-between bg-slate-100 px-2 py-4">
      {/* Top Section */}
      <div className="flex flex-col items-center space-y-4">
        <div
          onClick={() => router.push("/view/home")}
          className="bg-black rounded-full w-8 h-8"
        >
          <Image
            className="object-cover w-full h-full"
            src={logo}
            alt="logo"
            width={64}
            height={64}
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
        <RecipeGenerator />
        <InteractivePanel
          position="left-16 ml-1 top-4 bottom-4"
          icon={<HiOutlineSearch />}
          activateIcon={<HiSearch />}
          child={<SearchPage />}
        />
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center justify-between space-y-2">
        <Avatar
          onClick={() => router.push("/view/profile")}
          radius={28}
          src={currentUser?.photoURL ?? ""}
          alt={currentUser?.displayName ?? ""}
          width={100}
          height={100}
        />
        <InteractivePanel
          position="left-16 bottom-4 ml-1"
          icon={<HiOutlineCog6Tooth />}
          activateIcon={<HiMiniCog6Tooth />}
          child={
            <div className="space-y-2 w-full text-xl p-4">
              <OutlineButton className="text-left flex items-center space-x-2">
                <LiaUserEditSolid className="text-xl" />
                <samp className="text-sm">Edit Profile</samp>
              </OutlineButton>
              <OutlineButton className="text-left flex items-center space-x-2">
                <HiArrowRightOnRectangle className="text-xl" />
                <samp className="text-sm">Log out</samp>
              </OutlineButton>
            </div>
          }
        />
      </div>
    </div>
  );
}
