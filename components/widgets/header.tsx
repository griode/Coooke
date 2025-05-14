"use client";

import logo from "@/app/assets/icons/logo.png";
import Image from "next/image";
import { Button } from "../ui/button";


const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="flex items-center h-2">
          <div className="text-6xl pb-3 font-black">C</div>
          <div className="bg-slate-800 rounded-full w-7 h-7">
            <Image className="w-full h-full" src={logo} alt="logo" />
          </div>
          <div className="text-4xl font-black pb-1">ook</div>
        </h1>
        <div className="">
          <Button> Get started</Button>
        </div>
      </header>
    </>
  );
};

export default Header;
