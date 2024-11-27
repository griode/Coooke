"use client";
import { RecipeProvider } from "@/app/data/provider/recipe_provider";
import { useEffect, useState } from "react";
import Image from "next/image";
import Recipe from "@/app/data/model/recipe_model";
import { DetailPage } from "@/app/ui/components/detail_recipe";

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

const RecipeDayCard = ({ recipe }: { recipe: Recipe }) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  return (
    <div
      onClick={() => setShowDetail(!showDetail)}
      className="shrink-0 snap-start px-8 py-4 bg-slate-100 cursor-pointer rounded-3xl justify-between flex items-center overflow-hidden w-96 space-x-6"
    >
      {showDetail ? (
        <DetailPage recipe={recipe} setShowDialog={setShowDetail} />
      ) : (
        <></>
      )}
      <div className="">
        <h1 className="text-xl font-bold text-black/80">{recipe?.name}</h1>
        <p className="mt-2 line-clamp-2">{recipe?.description}</p>
      </div>
      <div className=" bg-slate-200 rounded-full overflow-hidden">
        {recipe == null ? (
          <div></div>
        ) : (
          <Image
            className="object-cover rounded-full"
            src={recipe?.image ?? ""}
            alt={recipe?.name}
            width={1024}
            height={1024}
          />
        )}
      </div>
    </div>
  );
};

export default function RecipeDay() {
  const [recipes, setRecipes] = useState<Recipe[]>();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await RecipeProvider.getRecipeOfDay();
      setRecipes(response);
    };

    fetchRecipe();
  }, []);

  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hidden snap-x snap-mandatory">
      {recipes?.map((recipe, index) => {
        return <RecipeDayCard key={index} recipe={recipe} />;
      })}
    </div>
  );
}
