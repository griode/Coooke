"use client";

import { CiMenuBurger, CiSearch, CiHome, CiSettings } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Avatar from "./avatar";
import { useCurrentUser } from "../hooks/use_current_user";
import { PiChefHat } from "react-icons/pi";

interface NavItemType {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const navlist = [
  {
    name: "Home",
    icon: <CiHome />,
    path: "/view/home",
  },
  {
    name: "Menu",
    icon: <CiMenuBurger />,
    path: "/view/menu",
  },
  {
    name: "Search",
    icon: <CiSearch />,
    path: "/view/search",
  },
  {
    name: "Settings",
    icon: <CiSettings />,
    path: "/view/profile",
  },
];

export default function NavigationBar() {
  const router = useRouter();
  const { currentUser, loading } = useCurrentUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  const NavItem = ({ item }: { item: NavItemType }) => {
    return (
      <button
        onClick={() => router.push(item.path)}
        className="flex flex-col items-center justify-center m-2 p-2 hover:bg-white/80 rounded-3xl"
      >
        <div className="flex items-center justify-center text-2xl">
          {item.icon}
        </div>
      </button>
    );
  };

  return (
    <div className="flex flex-col w-fit h-full items-center justify-between bg-slate-100 p-2">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-lg font-black mt-6">CK</h1>
        {navlist.map((item, index) => (
          <NavItem key={index} item={item} />
        ))}
        <button className="flex flex-col items-center bg-black justify-center m-2 p-2 hover:bg-black/80 rounded-3xl"> 
          <div className="flex items-center justify-center text-white text-2xl">
            <PiChefHat className="animate-pulse" />
          </div>
        </button>
      </div>
      <div>
        <Avatar
          radius={40}
          src={currentUser?.photoURL ?? ""}
          alt={currentUser?.displayName ?? ""}
          width={64}
          height={64}
        />
        <div className="mb-4"></div>
      </div>
    </div>
  );
}
