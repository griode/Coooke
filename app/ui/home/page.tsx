"use client";
import Recipe from "@/app/data/model/recipe_model";
import { RecipeProvider } from "@/app/data/provider/recipe_provider";
import { useEffect, useState } from "react";
import RecipeDay from "../components/recipe_day";
import "@/app/scroll-style.css"; // Import the CSS file
import NavbarContainer from "../components/navbar_container";
import RecipeCard from "../components/recipe_card";
import { auth } from "@/app/firebase";
import { InteractiveButtonFilled } from "../components/interactive_panel_props";

const EmptyView = () => {
  return (
    <div className="p-5 space-y-4 flex flex-col items-center justify-between border rounded-2xl mt-2 overflow-hidden">
      <div className="text-4xl text-center">
        ☕︎♨︎ Generate your own recipes with AI ✧
      </div>
      <div className="w-96 flex flex-col items-center justify-center">
        <p className="text-sm text-center">
          Transform your ingredients into delicious dishes - Scan and find
          recipes instantly!
        </p>
        <div className="mt-4">
          <InteractiveButtonFilled
            icon={"Generate new recipe"}
            panelId={"chatPanel"}

          />
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async () => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }
    const response = await RecipeProvider.getRecipesByUser({ item: 6, userId: user.uid });
    setRecipes(response);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const showView = () => {
    if (recipes.length === 0) {
      return <EmptyView />
    }
    return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-y-scroll py-2">
      {

      }
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  };

  return (
    <NavbarContainer pageIndex={0}>
      <RecipeDay />
      <h1 className="mt-4 md:mt-6 text-xl font-bold">Recent Recipes</h1>
      {/* Horizontal scroll for recipes */}
      {showView()}
      <div className="h-16"></div>
    </NavbarContainer>
  );
}
