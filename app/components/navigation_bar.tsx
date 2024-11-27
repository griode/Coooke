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
import { auth } from "../firebase";

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
      <div className="flex items-center justify-center text-4xl md:text-2xl">
        {item.enable ? item.fillIcon : item.icon}
      </div>
    </div>
  );
};

// Component: Navigation Bar
export default function NavigationBar({ pageIndex }: { pageIndex: number }) {
  const router = useRouter(); // Initialize router
  const { currentUser, loading } = useCurrentUser();

  // log out handler
  const logoutHandler = () => {
    auth.signOut().then(() => {
      router.push("/");
    });
  };

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

  if (loading) {
    return (
      <div className="p-24">
        <CircularProgress size={40} />
      </div>
    );
  }

  return (
    <div className="h-16 bottom-0 w-full absolute flex-row md:static space-x-6 md:space-x-0 md:top-0 md:left-0 md:right-0 flex border-r md:flex-col md:w-fit md:h-full items-center justify-center md:justify-between bg-white/75 backdrop-blur-lg px-2 py-4">
      {/* Top Section */}
      <div className="flex flex-row md:flex-col items-center gap-4">
        <div
          onClick={() => router.push("/view/home")}
          className="bg-black rounded-full w-0 h-0 md:w-8 md:h-8 hidden md:block"
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
      <div className="flex flex-row md:flex-col items-center justify-between gap-4">
        <Avatar
          className="h-10 w-10 md:h-6 md:w-6"
          onClick={() => router.push("/view/profile")}
          radius={24}
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
              <OutlineButton
                onClick={() => router.push("/view/profile/edit")}
                className="text-left flex items-center space-x-2 w-full"
              >
                <LiaUserEditSolid className="text-xl" />
                <samp className="text-sm">Edit Profile</samp>
              </OutlineButton>
              <OutlineButton
                onClick={logoutHandler}
                className="text-left flex items-center space-x-2 w-full"
              >
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
