"use client";
import { useRouter } from "next/navigation";
import Avatar from "@/components/avatar";
import { OutlineButton } from "@/components/button";
import NavbarContainer from "@/components/navbar_container";
import { useCurrentUser } from "@/hooks/use_current_user";
import { useEffect, useState, useCallback } from "react";
import RecipeCard from "@/components/recipe_card";
import { EmptyFavorite } from "@/app/profile/empty_favorite";
import { routeNames } from "@/app/router/router";
import {Recipe} from "@/api/entities/recipe";

export default function ProfilePage() {
  const { currentUser, loading: loadingUser, userInfo } = useCurrentUser();
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les recettes favorites
  const fetchRecipes = useCallback(async () => {
    // if (!userInfo?.favoriteRecipes) return;
    //
    // setLoadingRecipes(true);
    // setError(null); // Réinitialise l'erreur avant de charger les données
    //
    // try {
    //   const recipeIds = userInfo.favoriteRecipes;
    //   const fetchedRecipes = await Promise.all(
    //     recipeIds.map((recipeId) => RecipeProvider.getRecipeById(recipeId))
    //   );
    //   setRecipes(fetchedRecipes.filter((recipe): recipe is Recipe => !!recipe));
    // } catch (err) {
    //   console.error("Failed to fetch recipes:", err);
    //   setError("An error occurred while fetching your favorite recipes.");
    // } finally {
    //   setLoadingRecipes(false);
    // }
  }, []);

  // Effect pour charger les recettes lors du chargement du profil
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  return (
    <NavbarContainer pageIndex={4}>
      {/* Profil de l'utilisateur */}
      <div className="flex space-x-4 items-center p-4 md:p-8">
        <Avatar
          src={currentUser?.photoURL ?? ""}
          name={currentUser?.displayName ?? "User"}
          alt={currentUser?.displayName ?? "User Avatar"}
          width={600}
          height={600}
          className="h-24 w-24 md:h-36 md:w-36 text-6xl"
        />
        <div className="space-y-2">
          <div className="text-gray-500">Profile</div>
          <h1 className="text-3xl md:text-6xl font-extrabold">
            {currentUser?.displayName ?? "User"}
          </h1>
          <OutlineButton
            onClick={() => router.push(routeNames.edit_profile)}
            className="w-fit text-sm"
          >
            Edit
          </OutlineButton>
        </div>
      </div>
      <hr className="my-4" />

      {/* Recettes favorites */}

      {loadingRecipes ? (
        <div className="flex justify-center items-center h-32">
          Loading recipes...
        </div>
      ) : error ? (
        <div className="text-center mt-4">{error}</div>
      ) : recipes.length === 0 ? (
        <EmptyFavorite />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      )}
      <div className="h-20"></div>
    </NavbarContainer>
  );
}
