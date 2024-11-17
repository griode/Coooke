"use client";
import { RecipeProvider } from "@/app/data/provider/recipe_provider";
import { useEffect, useState } from "react";
import Image from "next/image";
import Recipe from "@/app/data/model/recipe_model";
import { PiBowlFoodLight, PiFireSimpleThin } from "react-icons/pi";
import { GiSteak } from "react-icons/gi";

export function NutritionCard({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="p-2 rounded-lg bg-slate-200 text-black text-2xl">
        {icon}
      </div>
      <h3>{title}</h3>
    </div>
  );
}

export default function RecipeDay() {
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await RecipeProvider.getRecipeOfDay();
      setRecipe(response);
    };

    fetchRecipe();
  }, []);

  return (
    <div className="w-full h-80 bg-slate-100 rounded-3xl flex justify-between items-center overflow-hidden">
      <div className="p-16 w-1/2">
        <h1 className="text-6xl font-bold text-black/80">{recipe?.name}</h1>
        <p className="mt-2 line-clamp-2">{recipe?.description}</p>
        <hr className="mt-4" />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <NutritionCard
            title={`${recipe?.nutritionFacts.calories} kcal`}
            icon={<PiBowlFoodLight />}
          />
          <NutritionCard
            title={`${recipe?.nutritionFacts.protein} Protein`}
            icon={<GiSteak />}
          />
          <NutritionCard
            title={`${recipe?.nutritionFacts.carbohydrates} Carbs`}
            icon={<PiFireSimpleThin />}
          />
          <NutritionCard
            title={`${recipe?.nutritionFacts.fat} Fat`}
            icon={<PiFireSimpleThin />}
          />
        </div>
      </div>
      <div className="w-1/2 flex justify-center bg-slate-200 rounded-l-full overflow-hidden">
        {recipe == null ? (
          <div></div>
        ) : (
          <Image
            className="object-cover w-full h-full"
            src={recipe?.image ?? ""}
            alt={recipe?.name}
            width={1024}
            height={1024}
          />
        )}
      </div>
    </div>
  );
}
