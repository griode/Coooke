"use client";
import React, { useEffect, useState } from "react";
import Recipe from "@/app/data/model/recipe_model";
import { RecipeProvider } from "@/app/data/provider/recipe_provider";
import "@/app/scroll-style.css"; // Import the CSS file
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

    // Fonction pour récupérer les recettes
    const fetchRecipes = () => {
        if (currentUser) {
            RecipeProvider.getRecipesByUser({ item: 20, userId: currentUser.uid }).then((recipes) => {
                setRecipes(recipes);
            })
                .finally(() => setIsLoading(false));
        }
    };

    useEffect(() => {
        fetchRecipes()
    });

    // Gestion dynamique de l'affichage des recettes
    const showView = () => {
        if (isLoading) {
            return <div className="w-full h-full bg-slate-50 flex justify-center items-center py-6 space-x-2 rounded-md">
                <CircularProgress size={20} infinite={true} /> <p>Loading...</p>
            </div>;
        }

        if (recipes.length === 0) {
            return <EmptyView />;
        }

        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 overflow-y-scroll py-2">
                {recipes
                    .filter((recipe) =>
                        categorySelected === 0 || recipe.mealType == Categories[categorySelected].name || recipe.name.toLowerCase().includes(Categories[categorySelected].name.toLowerCase())
                    )
                    .map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
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
                    {Categories.map((category, index) => (
                        <CategoryItem
                            key={index}
                            onClick={() => setCategorySelected(category.id)}
                            category={{ ...category, isActive: category.id === categorySelected }}
                        />
                    ))}
                </div>

                {/* Vue des recettes */}
                <div className="mt-5">{showView()}</div>

                {/* Espacement pour la navigation */}
                <div className="h-16"></div>
            </div>
        </NavbarContainer>
    );
}