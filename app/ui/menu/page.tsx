"use client";
import WeekMenuProvider, { MenuPWeek } from "@/app/data/provider/menu_provider";
import NavbarContainer from "../components/navbar_container";
import { useEffect, useState } from "react";
import { MenuCard } from "./menu_card";
import { auth } from "@/app/firebase";

export default function MenuPage() {
  const [menus, setMenus] = useState<MenuPWeek[]>([]);

  const fetchMenus = async () => {
    const userAuth = auth.currentUser;
    if (!userAuth) {
      return;
    }
    const menus = await WeekMenuProvider.getMenuUser(userAuth.uid);
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
            <MenuCard key={index} menu={week} />
          ))}
        </div>
      </div>
    </NavbarContainer>
  );
}
