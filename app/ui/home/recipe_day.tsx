"use client";
import {RecipeProvider} from "@/app/data/provider/recipe_provider";
import React, {useEffect, useState} from "react";
import Recipe from "@/app/data/model/recipe_model";
import Image from "next/image";
import {DetailPage} from "../detail_recipe/detail_recipe";

const RecipeDayCard = ({recipe}: { recipe: Recipe }) => {
    const [showDetail, setShowDetail] = useState<boolean>(false);
    return (
        <div
            onClick={() => setShowDetail(!showDetail)}
            className="shrink-4  snap-start bg-slate-800 cursor-pointer rounded-3xl justify-between flex items-center  w-96 space-x-2"
        >
            {showDetail ? (
                <DetailPage recipe={recipe} setShowDialog={setShowDetail}/>
            ) : (
                <></>
            )}


            <div className="h-full  rounded-3xl overflow-hidden">
                {recipe && recipe.image && (
                    <Image
                        className="object-cover w-screen h-40"
                        src={recipe.image}
                        alt={recipe.name}
                        width={800}
                        height={800}
                    />
                )}

            </div>


        </div>
    );
};

export default function RecipeDay() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await RecipeProvider.getRecipeOfDay();
            setRecipes(response);
        };

        // Call the function
        fetchRecipe().then(() => console.log("Recipes fetched successfully"));
    }, []);

    return (
        <div className="flex gap-3 overflow-x-auto scrollbar-hidden snap-x snap-mandatory">
            {recipes?.map((recipe, index) => {
                return <RecipeDayCard key={index} recipe={recipe}/>;
            })}
        </div>
    );
}