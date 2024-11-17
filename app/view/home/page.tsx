"use client";
import NavbarContainer from "@/app/components/navbar_container";
import RecipeCardX from "@/app/components/recipe_cardx";
import Recipe from "@/app/data/model/recipe_model";
import { RecipeProvider } from "@/app/data/provider/recipe_provider";
import { useEffect, useState } from "react";
import RecipeDay from "./recipe_day";

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async () => {
    const response = await RecipeProvider.getRecipes({ item: 4 });
    setRecipes(response);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <NavbarContainer>
      <RecipeDay />
      <div className="mt-5"></div>
      <h1 className="mt-8 mb-4 text-xl font-bold">Recent Recipes create</h1>
      <div className="flex flex-wrap gap-4">
        {recipes.map((recipe, index) => (
          <RecipeCardX key={index} recipe={recipe} />
        ))}
      </div>
    </NavbarContainer>
  );
}
