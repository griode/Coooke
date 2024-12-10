"use client";

import logo from "@/app/assets/icons/logo.png";
import Image from "next/image";
import {useRouter} from "next/navigation";
// Icons
import {HiCalendar, HiMiniSparkles, HiOutlineCalendar, HiOutlineCog6Tooth,} from "react-icons/hi2";
import {GoHome, GoHomeFill} from "react-icons/go";

import {HiOutlineSearch} from "react-icons/hi";
import Avatar from "./avatar";
import {InteractiveButton} from "./interactive_panel_props";
import {useCurrentUser} from "@/app/hooks/use_user_provider";
import React from "react";

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
const NavItem = ({item, onClick}: NavItemProps) => {
    return (
        <div
            onClick={onClick}
            className={`flex flex-col items-center justify-center p-2 rounded-3xl cursor-pointer`}
            aria-label={item.name}
        >
            <div className="flex items-center justify-center text-3xl md:text-2xl">
                {item.enable ? item.fillIcon : item.icon}
            </div>
        </div>
    );
};

// Component: Navigation Bar
export default function NavigationBar({pageIndex}: { pageIndex: number }) {
    const router = useRouter(); // Initialize router
    const {currentUser, userPhotoUrl} = useCurrentUser();

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
            icon: <GoHome/>,
            fillIcon: <GoHomeFill/>,
            path: "/ui/home",
        },
        {
            enable: pageIndex === 1,
            name: "Menu",
            icon: <HiOutlineCalendar/>,
            fillIcon: <HiCalendar/>,
            path: "/ui/menu",
        },
    ];


    return (
        <div
            className="h-16 md:h-full bottom-0 w-full flex-row fixed md:static gap-8 md:top-0 md:left-0 md:right-0 flex border-t md:border-r md:flex-col md:w-fit items-center justify-center md:justify-between bg-white/75 backdrop-blur-lg px-2 py-4 md:px-4">
            {/* Top Section */}
            <div className="flex flex-row md:flex-col items-center gap-8 md:gap-4 static">
                <div
                    onClick={() => router.push("/ui/home")}
                    className="bg-slate-800 px-1 rounded-full md:w-8 md:h-8 hidden md:block"
                >
                    <Image
                        onClick={() => router.push("/ui/home")}
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

                <InteractiveButton
                    icon={<HiMiniSparkles/>}
                    panelId={"chatPanel"}
                />

                <InteractiveButton
                    icon={<HiOutlineSearch/>}
                    panelId={"searchPanel"}
                />
            </div>

            {/* Bottom Section */}
            <div className="flex flex-row md:flex-col items-center justify-between md:gap-4">
                <Avatar
                    className="h-8 w-8 md:h-6 md:w-6"
                    onClick={() => router.push("/ui/profile")}
                    radius={24}
                    src={userPhotoUrl ?? ""}
                    alt={currentUser?.displayName ?? ""}
                    width={100}
                    height={100}
                />
                <div className="hidden md:block">
                    <InteractiveButton
                        icon={<HiOutlineCog6Tooth/>}
                        panelId={"profilePanel"}
                    />
                </div>
            </div>
        </div>
    );
}