"use client";

import logo from "@/app/assets/icons/logo.png";
import Image from "next/image";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";


const Header = () => {
  const { setTheme } = useTheme()

  return (
    <header className="flex justify-between items-center py-2">
      <h1 className="flex items-center h-2">
        <div className="text-4xl pb-3 font-black mt-2.5">C</div>
        <div className="bg-slate-800 rounded-full w-6 h-6">
          <Image className="w-full h-full" src={logo} alt="logo" />
        </div>
        <div className="text-4xl font-black pb-1">ook</div>
      </h1>
      <Button
        onClick={() => setTheme(theme => theme === "dark" ? "light" : "dark")}
        variant="outline" size="icon">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </header>
  );
};

export default Header;
