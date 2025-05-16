"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/app/api/entities/recipe";
import Image from "next/image";
import { IoFastFoodOutline } from "react-icons/io5";
import { RecipeProvider } from "@/app/api/provider/recipe_provider";
import { uploadUrlImage } from "@/app/utils/upload_file";
import { useRouter } from "next/navigation";
import { Earth, Info } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [loadImageError, setLoadImageError] = useState(false);
  const [image, setImage] = useState<string>("");
  let runFunction = true;
  const router = useRouter();

  // Handler for saving recipes
  const saveRecipesHandler = async (recipeToSave: Recipe): Promise<Recipe | null> => {
    try {
      const { success, recipe } = await RecipeProvider.saveRecipe(recipeToSave)
      if (success) {
        console.log("Recipe saved:", recipe);
        return recipe
      }
      return null
    } catch (error) {
      console.error("Error saving recipes:", error);
      return null
    }
  };

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
          recipe.image = (await uploadUrlImage(value)) ?? recipe.image;
          recipe.created_by = "1"
          if (recipe.id == null) {
            const result = await saveRecipesHandler(recipe);
            if (result?.id !== undefined) {
              recipe.id = result.id;
            }
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
    <div
      onClick={() => {
        router.push(`/recipes/${recipe.id}`);
      }}
      className="w-full bg-background rounded-2xl overflow-hidden relative shadow"
    >
      <div className="w-full rounded-t-2xl overflow-hidden z-0">
        <div className="flex items-center space-x-1 justify-between w-full absolute p-2">
          <div className="flex items-center space-x-1 bg-background/70 backdrop-blur-xl p-1 rounded-full w-fit text-xs">
            <Earth className="h-3 w-3" />
            <span className="line-clamp-1">{`${recipe.cuisine}`}</span>
          </div>
          <HoverCard>
            <HoverCardTrigger><div className="bg-background/65 backdrop-blur-xl p-1 rounded-full">
              <Info className="h-3.5 w-3.5" />
            </div></HoverCardTrigger>
            <HoverCardContent className="bg-background/60 rounded-xl border-0 backdrop-blur-xl text-sm">
              {recipe.description}
            </HoverCardContent>
          </HoverCard>

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
      {/* Black gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10 pointer-events-none" />
      <div className="p-2 absolute bottom-0 w-full z-20">
        <div className="h-20"></div>
        <div>
          <h1 className="font-semibold text-lg line-clamp-2 text-white p-1">{recipe.recipe_name}</h1>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
