"use client";
import { useRouter } from "next/navigation";
import Avatar from "@/app/components/avatar";
import { OutlineButton } from "@/app/components/button";
import NavbarContainer from "@/app/components/navbar_container";
import { useCurrentUser } from "@/app/hooks/use_user_provider";
import { useEffect, useState } from "react";
import Recipe from "@/app/data/model/recipe_model";
import { RecipeProvider } from "@/app/data/provider/recipe_provider";
import RecipeCard from "@/app/components/recipe_card";
import { EmptyFavorite } from "@/app/ui/profile/empty_favorite";

export default function ProfilePage() {
    const { currentUser, loading, userInfo } = useCurrentUser();
    const router = useRouter();
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const fetchRecipes = async () => {
        try {
            const recipeIds = userInfo?.favoriteRecipes ?? [];
            const fetchedRecipes = await Promise.all(
                recipeIds.map((recipeId) => RecipeProvider.getRecipeById(recipeId))
            );
            setRecipes(fetchedRecipes.filter((recipe): recipe is Recipe => !!recipe));
        } catch (error) {
            console.error("Failed to fetch recipes:", error);
        }
    };

    useEffect(() => {
        if (userInfo?.favoriteRecipes) {
            fetchRecipes().then(() => console.log("Recipes fetched successfully"));
        }
    },); // Dépendance pour éviter un appel infini

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <NavbarContainer pageIndex={4}>
            <div className="flex space-x-4 items-center p-4 md:p-8">
                <Avatar
                    src={currentUser?.photoURL ?? ""}
                    alt={currentUser?.displayName ?? ""}
                    width={600}
                    height={600}
                    className="h-24 w-24 md:h-36 md:w-36"
                />
                <div className="space-y-2">
                    <div>Profile</div>
                    <h1 className="text-3xl md:text-6xl font-extrabold">
                        {currentUser?.displayName ?? "User"}
                    </h1>
                    <OutlineButton
                        onClick={() => router.push("/ui/profile/edit")}
                        className="w-fit text-sm"
                    >
                        Edit
                    </OutlineButton>
                </div>
            </div>
            <hr />
            {recipes.length === 0 ? (
                <EmptyFavorite />
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 overflow-y-scroll mt-6">
                    {recipes.map((recipe, index) => (
                        <RecipeCard key={recipe.id ?? index} recipe={recipe} />
                    ))}
                </div>
            )}
        </NavbarContainer>
    );
}