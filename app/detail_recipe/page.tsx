"use client";

import React, { useState } from "react";
import {
  PiBowlFoodLight,
  PiCheeseThin,
  PiFireSimpleThin,
} from "react-icons/pi";
import { GiSteak } from "react-icons/gi";
import { CiTimer, CiUser } from "react-icons/ci";
import Image from "next/image";
import { useCurrentUser } from "@/app/hooks/use_current_user";
import { recipeSelected } from "../components/recipe_card";
import { IconButton } from "../components/button";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const NutritionCard = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="p-2 rounded-lg bg-slate-200 text-black text-2xl">
        {icon}
      </div>
      <h3 className="line-clamp-2 text-sm">{title}</h3>
    </div>
  );
};

const DetailPage = () => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [loadImageError, setLoadImageError] = useState<boolean>(false);
  const { currentUser } = useCurrentUser();
  const deleteRecipeHandler = () => {};
  const router = useRouter();

  let recipe = recipeSelected;

  return (
    <div className="flex flex-col items-center overflow-hidden justify-center">
      <div className="px-4 py-4 bg-white flex items-center justify-between fixed top-0 z-10 w-full lg:w-3/4">
        <div className="flex items-center space-x-2">
          <IconButton onClick={() => router.back()}>
            <IoIosArrowBack />
          </IconButton>
          <h1 className="text-xl md:text-2xl font-bold">{recipe.recipe_name}</h1>
        </div>
      </div>
      <div className="mt-16 flex overflow-hidden flex-col md:flex-row lg:w-3/4">
        <div className="p-4 md:w-2/3">
          <Image
            className="rounded-xl w-full h-56 md:h-fit object-cover"
            src={recipe.image}
            alt={recipe.recipe_name}
            width={500}
            height={500}
            onError={() => setLoadImageError(true)}
          />
          <div className="mt-4 flex-1 border p-2 rounded-xl">
            <h2 className="text-lg font-bold">Ingredients</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="bg-slate-200 p-2 text-sm rounded-lg"
                >
                  {ingredient}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Recipe detail view */}
        <div className="p-4 space-y-5">
          <div className="text-gray-500 mt-2 flex space-x-2">
            <div className="flex items-center space-x-1">
              <CiTimer />
              <span>{`${recipe.duration_to_cook} min`}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CiUser />
              <span>{`${recipe.servings} reviews`}</span>
            </div>
          </div>
          {/* Description with "Read more" / "Read less" */}
          <p className="text-sm mt-4">
            {showFullDescription
              ? recipe.description
              : `${recipe.description?.substring(0, 100)}...`}
            <button
              className="text-green-700 underline"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Read less" : "Read more"}
            </button>
          </p>
          <div className="flex gap-4 flex-wrap">
            <NutritionCard
              title={`${recipe.nutrition_facts["calories"]} kcal`}
              icon={<PiBowlFoodLight />}
            />
            <NutritionCard
              title={`${recipe.nutrition_facts["protein"]} Protein`}
              icon={<GiSteak />}
            />

            <NutritionCard
              title={`${recipe.nutrition_facts["fat"]} Fat`}
              icon={<PiFireSimpleThin />}
            />
            <NutritionCard
              title={`${recipe.nutrition_facts["carbohydrates"]} Carbohydrates`}
              icon={<PiCheeseThin />}
            />
          </div>
          {/* Recipe instructions component */}
          <div className="border p-2 rounded-xl">
            <h2 className="text-lg font-bold mb-2">Instructions</h2>
            {recipe.instructions.map((instruction, index) => (
              <div
                key={index}
                className="flex p-2 items-start rounded-lg text-sm mb-4 bg-slate-100"
              >
                <p>{instruction}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
