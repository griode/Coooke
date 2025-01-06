"use client";

import React, { useState, useMemo } from "react";
import "@/app/scroll-style.css"; // Style des barres de défilement
import RecipeCard from "@/components/recipe_card";
import { Categories, CategoryItem } from "@/app/home/category";
import { EmptyView } from "@/app/home/empty_view";
import NavbarContainer from "@/components/navbar_container";
import { useRecipes } from "@/hooks/use_recipes";

export default function HomePage() {
  const [categorySelected, setCategorySelected] = useState<number>(0);
  const { recipes } = useRecipes();

  // Filtrage des recettes basé sur la catégorie sélectionnée
  const filteredRecipes = useMemo(() => {
    if (categorySelected === 0) {
      return recipes;
    }

    const selectedCategory = Categories.find((cat) => cat.id === categorySelected);
    if (!selectedCategory) return recipes; // Si la catégorie est invalide, renvoyer toutes les recettes

    return recipes.filter(
      (recipe) =>
        recipe.mealType.toLocaleLowerCase() === selectedCategory.name.toLocaleLowerCase() ||
        recipe.name.toLowerCase().includes(selectedCategory.name.toLowerCase())
    );
  }, [categorySelected, recipes]);

  return (
    <NavbarContainer pageIndex={0}>
      <div className="p-0 md:p-4">
        {/* Titre */}
        <h1 className="text-xl font-bold">
          Recent Recipes |{" "}
          <span className="text-slate-500 text-lg font-normal">{recipes.length} Recipes</span>
        </h1>

        {/* Catégories */}
        <div className="flex gap-5 mt-5 flex-wrap">
          {Categories.map((category) => (
            <CategoryItem
              key={category.id}
              onClick={() => setCategorySelected(category.id)}
              category={{ ...category, isActive: category.id === categorySelected }}
            />
          ))}
        </div>

        {/* Vue des recettes */}
        <div className="mt-5">
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 py-2">
              {filteredRecipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
          ) : (
            <EmptyView />
          )}
        </div>

        {/* Espacement pour la navigation */}
        <div className="h-16"></div>
      </div>
    </NavbarContainer>
  );
}