"use client";
import NavbarContainer from "@/app/components/navbar_container";
import RecipeCardX from "@/app/components/recipe_cardx";
import Recipe from "@/app/data/model/recipe_model";
import { RecipeProvider } from "@/app/data/provider/recipe_provider";
import { useEffect, useState } from "react";
import RecipeDay from "./recipe_day";
import "@/app/scroll-style.css"; // Import the CSS file

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async () => {
    const response = await RecipeProvider.getRecipes({ item: 6 });
    setRecipes(response);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <NavbarContainer>
      {/* Horizontal scroll for RecipeDay */}
      <div className="flex gap-4 overflow-x-auto px-2 py-4 scrollbar-hidden snap-x snap-mandatory">
        <div className="shrink-0 snap-start">
          <RecipeDay />
        </div>
        <div className="shrink-0 snap-start">
          <RecipeDay />
        </div>
        <div className="shrink-0 snap-start">
          <RecipeDay />
        </div>
      </div>

      <h1 className="mt-8 mb-4 text-xl font-bold">Recent Recipes</h1>

      {/* Horizontal scroll for recipes */}
      <div className="flex gap-4 overflow-x-auto px-2 py-4 scrollbar-hidden">
        {recipes.map((recipe, index) => (
          <div key={index} className="shrink-0">
            <RecipeCardX recipe={recipe} />
          </div>
        ))}
      </div>
    </NavbarContainer>
  );
}