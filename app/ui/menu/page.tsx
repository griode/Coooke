"use client";
import WeekMenuProvider, {MenuPWeek} from "@/app/data/provider/menu_provider";
import NavbarContainer from "@/app/components/navbar_container";
import {useEffect, useState} from "react";
import {MenuCard} from "./menu_card";
import {useCurrentUser} from "@/app/hooks/use_user_provider";

export default function MenuPage() {
    const [menus, setMenus] = useState<MenuPWeek[]>([]);
    const {currentUser, loading} = useCurrentUser()

    const fetchMenus = async () => {
        WeekMenuProvider.getMenuUser(currentUser?.uid ?? "")
            .then((value) => setMenus(value));
    };

    useEffect(() => {
        fetchMenus().then(() => console.log("Menu fetched successfully"));
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-full">Loading...</div>
        );
    }

    return (
        <NavbarContainer pageIndex={1}>
            <div className="mt-2">
                <h1 className="text-xl font-black mb-6">Weekly Menu</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {menus.map((week, index) => (
                        <MenuCard key={index} menu={week}/>
                    ))}
                </div>
                <div className="h-16"></div>
            </div>
        </NavbarContainer>
    );
}
