"use client";
import Recipe from "@/app/data/model/recipe_model";
import {RecipeProvider} from "@/app/data/provider/recipe_provider";
import React, {useEffect, useState} from "react";
import "@/app/scroll-style.css"; // Import the CSS file
import RecipeCard from "@/app/components/recipe_card";
import {getUserId} from "@/app/data/utils/user_manager";
import {Categories, CategoryItem} from "@/app/ui/home/category";
import {EmptyView} from "@/app/ui/home/empty_view";
import NavbarContainer from "@/app/components/navbar_container";


export default function HomePage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categorySelected, setCategorySelected] = useState<number>(0);

    const fetchRecipes = async () => {
        const userIdCookie = await getUserId();
        if (userIdCookie?.value === null || userIdCookie?.value === "") {
            return;
        }
        const response = await RecipeProvider.getRecipesByUser({item: 8, userId: userIdCookie?.value ?? ""});
        setRecipes(response);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchRecipes().then(
            () => console.log("Recipes fetched successfully")
        );
    }, []);

    const showView = () => {
        if (isLoading) {
            return <></>
        } else if (recipes.length === 0 && !isLoading) {
            return <EmptyView/>
        }

        return <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-y-scroll py-2">
            {

            }
            {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe}/>
            ))}
        </div>
    };

    return (
        <NavbarContainer pageIndex={0}>
            <div>

                <h1 className="mt-4 text-xl font-bold">Recent Recipes | <span
                    className={"text-slate-500 text-lg font-normal"}>8 Recipes</span></h1>
                <div className={"flex gap-10 mt-6"}>
                    {
                        Categories.map((category, index) => {
                            category.isActive = category.id === categorySelected;
                            return <CategoryItem
                                onClick={() => setCategorySelected(category.id)}
                                key={index} category={category}/>
                        })
                    }
                </div>
                <div className={"mt-6"}>
                    {showView()}
                </div>
                <div className="h-16"></div>
            </div>

        </NavbarContainer>
    );
}
