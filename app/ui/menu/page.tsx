"use client";
import WeekMenuProvider, {MenuPWeek} from "@/app/data/provider/menu_provider";
import NavbarContainer from "@/app/components/navbar_container";
import {useEffect, useState} from "react";
import {MenuCard} from "./menu_card";
import {getUserId} from "@/app/data/utils/user_manager";

export default function MenuPage() {
    const [menus, setMenus] = useState<MenuPWeek[]>([]);

    const fetchMenus = async () => {
        const userUidCookie = await getUserId();

        if (userUidCookie?.value === null || userUidCookie?.value === "") {
            return;
        }
        const menus = await WeekMenuProvider.getMenuUser(userUidCookie?.value ?? "");
        setMenus(menus);
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    return (
        <NavbarContainer pageIndex={1}>
            <div className="mt-2">
                <h1 className="text-xl font-black mb-6">Weekly Menu</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {menus.map((week, index) => (
                        <MenuCard key={index} menu={week}/>
                    ))}
                </div>
            </div>
        </NavbarContainer>
    );
}
