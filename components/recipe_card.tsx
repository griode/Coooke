"use client";

import { useEffect, useState, useCallback } from "react";
import { Recipe } from "@/api/entities/recipe";
import { DetailPage } from "@/app/detail_recipe/detail_recipe";
import Image from "next/image";
import { PiCookingPot } from "react-icons/pi";
import { IoFastFoodOutline } from "react-icons/io5";
import { RecipeProvider } from "@/api/provider/recipe_provider";
import { useCurrentUser } from "@/hooks/use_current_user";
import { uploadUrlImage } from "@/utils/upload_file";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [loadImageError, setLoadImageError] = useState(false);
  const [image, setImage] = useState<string>("");
  const { currentUser } = useCurrentUser();
  let runFunction = true;

  const toggleDetail = useCallback(() => setShowDetail((prev) => !prev), []);

  useEffect(() => {
    // Check if the image is a URL or a generated image
    const fetchImage = async () => {
      if (recipe.image.startsWith("https://")) {
        setImage(recipe.image);
      } else {
        const value = await RecipeProvider.generateImage(recipe.image);
        if (value === null) {
          setLoadImageError(true);
        } else {
          setImage(value);
          if (currentUser) {
            recipe.image = (await uploadUrlImage(value)) ?? recipe.image;
            recipe.created_by = currentUser.uid;
            await RecipeProvider.saveRecipe(recipe);
          }
        }
      }
    };

    if (runFunction) {
      runFunction = false;
      fetchImage();
    }
  }, []);

  return (
    <>
      {showDetail && (
        <DetailPage recipe={recipe} setShowDialog={setShowDetail} />
      )}
      <div
        onClick={(event) => {
          event.stopPropagation();
          toggleDetail();
        }}
        className="w-full bg-slate-50 rounded-2xl shadow-md shadow-slate-200/50 hover:shadow-lg transition-shadow"
      >
        <div className="w-full h-36 bg-slate-300 rounded-t-2xl overflow-hidden relative z-0">
          <div className="absolute text-xs bottom-2 left-3">
            <div className="flex items-center space-x-1 bg-white px-1 rounded-full shadow">
              <PiCookingPot />
              <span>{`${recipe.duration_to_cook} min`}</span>
            </div>
          </div>

          {loadImageError || !image ? (
            <div className="text-6xl text-slate-700 w-full h-full flex justify-center items-center">
              <IoFastFoodOutline className="animate-pulse" />
            </div>
          ) : (
            <Image
              className="object-cover w-full h-full"
              src={image}
              alt={recipe.recipe_name}
              width={500}
              height={500}
              onError={() => setLoadImageError(true)}
            />
          )}
        </div>
        <div className="p-3 justify-between items-start gap-2">
          <div className="flex space-x-2 justify-between">
            <h1 className="font-semibold line-clamp-1">{recipe.recipe_name}</h1>
          </div>
          <div className="flex space-x-2 mt-2 w-full">
            <div className="bg-slate-200 w-fit text-ellipsis line-clamp-1 py-1 px-2 rounded-md text-xs text-gray-500">
              {recipe.cuisine}
            </div>
            <div className="bg-slate-200 w-fit text-ellipsis line-clamp-1 py-1 px-2 rounded-md text-xs text-gray-500">
              {recipe.meal_type}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
