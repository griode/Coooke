"use client";

import WeekMenuProvider, { MenuPWeek } from "@/app/backend/provider/menu_provider";
import NavbarContainer from "@/app/components/navbar_container";
import { useEffect, useState, useCallback } from "react";
import { MenuCard } from "./menu_card";
import { useCurrentUser } from "@/app/hooks/use_current_user";
import { EmptyMenu } from "./empty_menu";

export default function MenuPage() {
    const [menus, setMenus] = useState<MenuPWeek[]>([]);
    const [loadingMenus, setLoadingMenus] = useState(true);
    const { currentUser, loading: loadingUser } = useCurrentUser();

    const fetchMenus = useCallback(async () => {
        if (!currentUser) return; // Si aucun utilisateur connecté, ne rien faire

        setLoadingMenus(true); // Démarre le chargement
        try {
            const fetchedMenus = await WeekMenuProvider.getMenuUser(currentUser.uid);
            setMenus(fetchedMenus);
        } catch (error) {
            console.error("Error fetching menus:", error);
        } finally {
            setLoadingMenus(false); // Termine le chargement
        }
    }, [currentUser]);

    useEffect(() => {
        fetchMenus();
    }, [fetchMenus]);

    if (loadingUser || loadingMenus) {
        return (
            <div className="flex justify-center items-center w-full h-full">
                Loading...
            </div>
        );
    }

    return (
        <NavbarContainer pageIndex={1}>
            <div className="mt-2 p-4">
                <h1 className="text-xl font-black mb-6">Weekly Menu</h1>
                {menus.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {menus.map((week, index) => (
                            <MenuCard key={index} menu={week} />
                        ))}
                    </div>
                ) : (
                    <EmptyMenu />
                )}
                {/* Espacement pour la navigation */}
                <div className="h-16"></div>
            </div>
        </NavbarContainer>
    );
}