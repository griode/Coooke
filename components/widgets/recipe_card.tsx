"use client";

import { useEffect, useState, useCallback } from "react";
import { Recipe } from "@/app/api/entities/recipe";
import Image from "next/image";
import { IoFastFoodOutline } from "react-icons/io5";
import { RecipeProvider } from "@/app/api/provider/recipe_provider";
import { uploadUrlImage } from "@/app/utils/upload_file";
import { useRouter } from "next/navigation";
import { Earth, Info } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Skeleton } from "../ui/skeleton";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [loadImageError, setLoadImageError] = useState(false);
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  const [image, setImage] = useState<string>("");
  const router = useRouter();

  // Handler for saving recipes
  const saveRecipesHandler = useCallback(async (recipeToSave: Recipe): Promise<Recipe | null> => {
    try {
      const { success, recipe } = await RecipeProvider.saveRecipe(recipeToSave);
      if (success) {
        // Optionally: toast or notification
        return recipe;
      }
      return null;
    } catch (error) {
      console.error("Error saving recipes:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchImage = async () => {
      setLoadingImage(true);
      try {
        if (recipe.image.startsWith("https://")) {
          if (isMounted) {
            setImage(recipe.image);
            setLoadingImage(false);
          }
        } else {
          const value = await RecipeProvider.generateImage(recipe.image);
          if (value === null) {
            if (isMounted) {
              setLoadImageError(true);
              setLoadingImage(false);
            }
          } else {
            if (isMounted) {
              setImage(value);
            }
            // Save the generated image URL to the recipe
            const uploadedUrl = await uploadUrlImage(value);
            recipe.image = uploadedUrl ?? recipe.image;
            recipe.created_by = "1";
            if (recipe.id == null) {
              const result = await saveRecipesHandler(recipe);
              if (result?.id !== undefined) {
                recipe.id = result.id;
              }
            }
            if (isMounted) setLoadingImage(false);
          }
        }
      } catch (e) {
        if (isMounted) {
          setLoadImageError(true);
          setLoadingImage(false);
        }
      }
    };

    fetchImage();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe.image, saveRecipesHandler]);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on the info hover card
    // (optional: improve accessibility)
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full bg-background rounded-2xl overflow-hidden relative shadow cursor-pointer transition-transform hover:scale-[1.02] active:scale-100"
      tabIndex={0}
      role="button"
      aria-label={`Voir la recette ${recipe.recipe_name}`}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          handleCardClick(e as any);
        }
      }}
    >
      <div className="w-full rounded-t-2xl overflow-hidden z-0 relative h-48">
        <div className="flex items-center space-x-1 justify-between w-full absolute p-2 z-20">
          <div className="flex items-center space-x-1 bg-background/70 backdrop-blur-xl p-1 rounded-full w-fit text-xs">
            <Earth className="h-3 w-3" />
            <span className="line-clamp-1">{recipe.cuisine || "Cuisine"}</span>
          </div>
          <HoverCard>
            <HoverCardTrigger>
              <div
                className="bg-background/65 backdrop-blur-xl p-1 rounded-full"
                onClick={e => e.stopPropagation()}
                tabIndex={0}
                aria-label="Voir la description"
                onKeyDown={e => e.stopPropagation()}
              >
                <Info className="h-3.5 w-3.5" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-background/60 rounded-xl border-0 backdrop-blur-xl text-sm max-w-xs">
              {recipe.description || <span className="italic text-muted-foreground">Aucune description</span>}
            </HoverCardContent>
          </HoverCard>
        </div>
        {loadingImage ? (
          <Skeleton className="w-full h-48" />
        ) : loadImageError || !image ? (
          <div className="text-6xl text-slate-700 w-full h-full flex justify-center items-center bg-slate-100">
            <IoFastFoodOutline className="animate-pulse" />
          </div>
        ) : (
          <Image
            className="object-cover w-full h-full transition-transform duration-300"
            src={image}
            alt={recipe.recipe_name}
            width={500}
            height={500}
            onError={() => setLoadImageError(true)}
            priority={true}
            draggable={false}
          />
        )}
        {/* Black gradient overlay */}
        <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10 pointer-events-none" />
      </div>
      <div className="p-2 absolute bottom-0 w-full z-20">
        <div className="h-20"></div>
        <div>
          <h1 className="font-semibold text-lg line-clamp-2 text-white p-1 drop-shadow">
            {recipe.recipe_name}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
