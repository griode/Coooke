"use client";

import { useEffect, useState } from "react";
import Recipe from "@/lib/model/recipe_model";
import { DetailPage } from "@/app/detail_recipe/detail_recipe";
import Image from "next/image";
import { PiCookingPot } from "react-icons/pi";
import { IoFastFoodOutline } from "react-icons/io5";
import { HiBookmark, HiOutlineBookmark } from "react-icons/hi2";
import { useCurrentUser } from "@/hooks/use_current_user";
import UserProvider from "@/lib/provider/user_provider";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [loadImageError, setLoadImageError] = useState(false);
    const { userInfo, setUserInfo } = useCurrentUser();
    const [isFavorite, setIsFavorite] = useState(false);
    const [updatingFavorite, setUpdatingFavorite] = useState(false);

    // Vérifie si la recette est dans les favoris au chargement
    useEffect(() => {
        setIsFavorite(userInfo?.favoriteRecipes?.includes(recipe.id ?? "") ?? false);
    }, [userInfo?.favoriteRecipes, recipe.id]);

    // Gère l'affichage des détails de la recette
    const toggleDetail = () => setShowDetail((prev) => !prev);

    // Ajoute ou supprime une recette des favoris
    const toggleFavorite = async () => {
        if (!userInfo || !recipe.id) {
            alert("Please log in to manage your favorites.");
            return;
        }

        const updatedFavorites = isFavorite
            ? userInfo.favoriteRecipes.filter((id) => id !== recipe.id)
            : [...(userInfo.favoriteRecipes ?? []), recipe.id];

        setUpdatingFavorite(true);

        try {
            await UserProvider.updateUser(userInfo.id ?? "", { favoriteRecipes: updatedFavorites });
            const updatedUser = await UserProvider.getUser(userInfo.id ?? "");
            setUserInfo(updatedUser);
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Error updating favorites:", error);
            alert("Failed to update favorites. Please try again.");
        } finally {
            setUpdatingFavorite(false);
        }
    };

    return (
        <>
            {/* Affichage des détails si nécessaire */}
            {showDetail && <DetailPage recipe={recipe} setShowDialog={setShowDetail} />}
            <div
                onClick={(event) => {
                    event.stopPropagation();
                    toggleDetail();
                }}
                className="w-full bg-slate-50 rounded-2xl shadow-md shadow-slate-200/50 hover:shadow-lg transition-shadow"
            >
                {/* Image de la recette */}
                <div className="w-full h-36 bg-slate-300 rounded-t-2xl overflow-hidden relative z-0">
                    {/* Durée de préparation */}
                    <div className="absolute text-xs bottom-2 left-3">
                        <div className="flex items-center space-x-1 bg-white px-1 rounded-full shadow">
                            <PiCookingPot />
                            <span>{`${recipe.duration} min`}</span>
                        </div>
                    </div>

                    {/* Image ou icône par défaut */}
                    {loadImageError || !recipe.image ? (
                        <div className="text-6xl text-slate-700 w-full h-full flex justify-center items-center">
                            <IoFastFoodOutline className="animate-pulse" />
                        </div>
                    ) : (
                        <Image
                            className="object-cover w-full h-full"
                            src={recipe.image}
                            alt={recipe.name}
                            width={500}
                            height={500}
                            onError={() => setLoadImageError(true)}
                        />
                    )}
                </div>

                {/* Informations sur la recette */}
                <div className="p-3 justify-between items-start gap-2">
                    <div className="flex space-x-2 justify-between">
                        <h1 className="font-semibold line-clamp-1">{recipe.name}</h1>
                        {/* Bouton pour ajouter ou retirer des favoris */}
                        {recipe.id && (
                            <button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    toggleFavorite();
                                }}
                                className={`hover:bg-slate-200 p-1 rounded-full flex items-center justify-center transition-colors ${updatingFavorite ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                disabled={updatingFavorite}
                            >
                                {isFavorite ? (
                                    <HiBookmark className="text-slate-900" />
                                ) : (
                                    <HiOutlineBookmark />
                                )}
                            </button>
                        )}
                    </div>
                    <div className="flex space-x-2 mt-2 w-full">
                        <div className="bg-slate-200 w-fit text-ellipsis line-clamp-1 py-1 px-2 rounded-md text-xs text-gray-500">{recipe.cuisine}</div>
                        <div className="bg-slate-200 w-fit text-ellipsis line-clamp-1 py-1 px-2 rounded-md text-xs text-gray-500">{recipe.mealType}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipeCard;