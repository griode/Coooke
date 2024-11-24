"use client";

import { useState, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";

export default function SearchPage() {
  const [enable, setEnable] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setEnable(false); // Ferme le composant si clic en dehors
      }
    }

    if (enable) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [enable]);

  return (
    <div className="w-full h-full">
      <div
        className="w-full flex flex-col items-start justify-start"
        ref={containerRef}
        onClick={() => setEnable(true)}
      >
        <div
          className={`bg-white h-10 rounded-t-xl border-b w-full flex items-center space-x-2 px-4 py-2`}
        >
          <BiSearch className="text-2xl text-slate-600" />
          <input
            className="w-full h-full outline-none bg-transparent"
            type="search"
            placeholder="Search..."
          />
        </div>
        {enable && (
          <div
            className={`${
              enable
                ? "absolute bg-white top-10 shadow-xl rounded-b-xl left-0 p-2 w-96 h-96 border border-t-0"
                : ""
            }`}
          ></div>
        )}
      </div>
    </div>
  );
}
