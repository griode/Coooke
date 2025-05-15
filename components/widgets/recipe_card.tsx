"use client";

import { useEffect, useState } from "react";
import { Recipe } from "@/app/api/entities/recipe";
import Image from "next/image";
import { PiCookingPot } from "react-icons/pi";
import { IoFastFoodOutline } from "react-icons/io5";
import { RecipeProvider } from "@/app/api/provider/recipe_provider";
import { uploadUrlImage } from "@/app/utils/upload_file";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [loadImageError, setLoadImageError] = useState(false);
  const [image, setImage] = useState<string>("");
  let runFunction = true;
  const router = useRouter();

  // Handler for saving recipes
  const saveRecipesHandler = async (recipeToSave: Recipe): Promise<Recipe | null> => {
    // No separate loading state for this, as it's part of the generation flow
    // However, a separate toast can indicate saving progress if it were a standalone action.
    try {
      const { success, recipe } = await RecipeProvider.saveRecipe(recipeToSave)
      if (success) {
        // This toast might be redundant if generation success toast is already shown.
        // Consider if a separate "saved" confirmation is needed or if generation success implies saving.
        // For now, let's assume it's good to have a specific save confirmation.
        toast.info(`Sauvegarde terminée`, {
          description: `recette enregistrée(s) avec succès.`,
        });
        return recipe
      } else {
        // Only show error if there were recipes to save
        toast.error("Erreur lors de la sauvegarde", {
          description: "Aucune des nouvelles recettes n'a pu être sauvegardée.",
        });
        return null
      }
    } catch (error) {
      console.error("Error saving recipes:", error);
      toast.error("Erreur de sauvegarde", {
        description: "Un problème est survenu lors de la sauvegarde des recettes.",
      });
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
  );
};

export default RecipeCard;
