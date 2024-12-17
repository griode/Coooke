"use client";
import { useState, useEffect, useRef } from "react";
import { ClosePanelButton } from "../../components/interactive_panel_props";
import { useRecipes } from "@/app/hooks/use_recipes";
import RecipeCard from "@/app/components/recipe_card";

export default function SearchPage() {
  const [enable, setEnable] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { recipes } = useRecipes()
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [requestValue, setRequestValue] = useState("");

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
    <div className="w-full h-full overflow-hidden">
      <div
        className="w-full flex flex-col items-start justify-start"
        ref={containerRef}
        onClick={() => setEnable(true)}
      >
        <div
          className={`bg-white rounded-t-xl border-b w-full flex items-center space-x-2 px-2`}
        >
          <ClosePanelButton panelId="searchPanel" />
          <input
            id="searchRef"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 outline-none bg-transparent"
            type="search"
            defaultValue={searchTerm}
            placeholder="Search..."
          />
        </div>
        {enable && (
          <div
            className={`${enable
              ? "mx-1 absolute bg-white top-10 mt-3 shadow-xl rounded-b-xl left-0  right-0 border-t-0 z-10"
              : ""
              }`}
          >
            {
              recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm !== "").map((recipe, index) => (
                <div
                  onClick={() => {
                    setRequestValue(searchTerm)
                    const searchInput = document.getElementById("searchRef") as HTMLInputElement;
                    if (searchInput) {
                      searchInput.value = recipe.name;
                    }
                    setEnable(false)
                    setSearchTerm("")
                  }}
                  key={index} className="cursor-pointer text-sm border-b p-2 hover:bg-slate-100">
                  {recipe.name}
                </div>
              ))
            }
          </div>
        )}
      </div>
      <div className="p-4 overflow-scroll h-full">
        <h1 className="mb-2 text-xs text-slate-500 underline">Search Results</h1>
        <div className="gap-2 grid grid-cols-2">
          {
            recipes.filter((recipe) => recipe.name.toLowerCase().includes(requestValue.toLocaleLowerCase()) && requestValue !== "").map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))
          }
        </div>

      </div>

    </div>
  );
}
