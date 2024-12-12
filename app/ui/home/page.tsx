"use client";

import React, { useEffect, useState } from "react";
import Recipe from "@/app/data/model/recipe_model";
import { RecipeProvider } from "@/app/data/provider/recipe_provider";
import "@/app/scroll-style.css"; // Style des barres de défilement
import RecipeCard from "@/app/components/recipe_card";
import { Categories, CategoryItem } from "@/app/ui/home/category";
import { EmptyView } from "@/app/ui/home/empty_view";
import NavbarContainer from "@/app/components/navbar_container";
import { useCurrentUser } from "@/app/hooks/use_user_provider";
import CircularProgress from "@/app/components/circular_progress";

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categorySelected, setCategorySelected] = useState<number>(0);
  const { currentUser } = useCurrentUser();

  // Récupération des recettes
  const fetchRecipes = async () => {
    if (!currentUser) return;

    setIsLoading(true);
    try {
      const fetchedRecipes = await RecipeProvider.getRecipesByUser({
        item: 20,
        userId: currentUser.uid,
      });
      setRecipes(fetchedRecipes);
    } finally {
      setIsLoading(false);
    }
  };

  // Chargement initial
  useEffect(() => {
    fetchRecipes();
  }, [currentUser]);

  // Rendu dynamique des recettes
  const renderRecipes = () => {
    if (isLoading) {
      return (
        <div className="w-full h-full bg-slate-50 flex justify-center items-center py-6 space-x-2 rounded-md">
          <CircularProgress size={20} infinite={true} />
          <p>Loading...</p>
        </div>
      );
    }

    if (recipes.length === 0) {
      return <EmptyView />;
    }

    const filteredRecipes = recipes.filter((recipe) =>
      categorySelected === 0 ||
      recipe.mealType === Categories[categorySelected].name ||
      recipe.name.toLowerCase().includes(Categories[categorySelected].name.toLowerCase())
    );

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 overflow-y-scroll py-2">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    );
  };

  return (
    <NavbarContainer pageIndex={0}>
      <div>
        {/* Titre */}
        <h1 className="text-xl font-bold">
          Recent Recipes |{" "}
          <span className="text-slate-500 text-lg font-normal">{recipes.length} Recipes</span>
        </h1>

        {/* Catégories */}
        <div className="flex gap-8 mt-5 overflow-x-scroll scrollbar-hidden">
          {Categories.map((category) => (
            <CategoryItem
              key={category.id}
              onClick={() => setCategorySelected(category.id)}
              category={{ ...category, isActive: category.id === categorySelected }}
            />
          ))}
        </div>

        {/* Vue des recettes */}
        <div className="mt-5">{renderRecipes()}</div>

        {/* Espacement pour la navigation */}
        <div className="h-16"></div>
      </div>
    </NavbarContainer>
  );
}