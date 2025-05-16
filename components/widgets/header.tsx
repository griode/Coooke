"use client";

import logo from "@/app/assets/icons/logo.png";
import Image from "next/image";
import { Button } from "../ui/button";


const Header = () => {
  return (
    <>
      <header className="flex justify-between items-start py-2">
        <h1 className="flex items-center h-2">
          <div className="text-4xl pb-3 font-black mt-2.5">C</div>
          <div className="bg-slate-800 rounded-full w-6 h-6">
            <Image className="w-full h-full" src={logo} alt="logo" />
          </div>
          <div className="text-4xl font-black pb-1">ook</div>
        </h1>
      </header>
    </>
  );
};

export default Header;
