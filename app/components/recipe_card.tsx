"use client";
import {useEffect, useState} from "react";
import Recipe from "@/app/data/model/recipe_model";
import {DetailPage} from "../ui/detail_recipe/detail_recipe";
import Image from "next/image";
import {PiCookingPot} from "react-icons/pi";
import {IoFastFoodOutline} from "react-icons/io5";
import {HiBookmark, HiOutlineBookmark} from "react-icons/hi2";
import {useCurrentUser} from "@/app/hooks/use_user_provider";
import UserProvider from "@/app/data/provider/user_provider";
import UserModel from "@/app/data/model/user_model";

const RecipeCard = ({recipe}: { recipe: Recipe }) => {
    const [showDetail, setShowDetail] = useState(false);
    const [loadImageError, setLoadImageError] = useState(false);
    const {userInfo, setUserInfo} = useCurrentUser();
    const [isFavorite, setIsFavorite] = useState(false);

    // Vérifie si la recette est dans les favoris
    useEffect(() => {
        setIsFavorite(userInfo?.favoriteRecipes?.includes(recipe.id ?? "") ?? false);
    }, [userInfo?.favoriteRecipes, recipe.id]);

    // Gère l'affichage des détails de la recette
    const toggleDetail = () => setShowDetail((prev) => !prev);

    // Gère l'ajout ou le retrait de favoris
    const toggleFavorite = async () => {
        if (!userInfo || !recipe.id) return;

        const updatedFavorites = isFavorite
            ? userInfo.favoriteRecipes.filter((id) => id !== recipe.id)
            : [...(userInfo.favoriteRecipes ?? []), recipe.id];

        try {
            await UserProvider.updateUser(userInfo.id ?? "", {
                favoriteRecipes: updatedFavorites,
            });
            setUserInfo(new UserModel({...userInfo, favoriteRecipes: updatedFavorites}));
        } catch (error) {
            console.error("Error updating favorites:", error);
        }
    };

    return (
        <>
            {showDetail && (
                <DetailPage recipe={recipe} setShowDialog={setShowDetail}/>
            )}
            <div
                onClick={(event) => {
                    event.stopPropagation();
                    toggleDetail();
                }}
                className="w-full bg-slate-50 rounded-2xl shadow-md shadow-slate-200/50"
            >
                <div className="w-full h-36 bg-slate-300 rounded-t-2xl overflow-hidden relative">
                    <div className="absolute text-xs bottom-2 left-3">
                        <div className="flex items-center space-x-1 bg-white px-1 rounded-full">
                            <PiCookingPot/>
                            <span>{`${recipe.duration} min`}</span>
                        </div>
                    </div>
                    {loadImageError || !recipe.image ? (
                        <div className="text-6xl text-slate-700 w-full h-full flex justify-center items-center">
                            <IoFastFoodOutline className="animate-pulse"/>
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
                <div className="p-3 flex justify-between space-x-2">
                    <div>
                        <h1 className="font-bold text-sm line-clamp-1">{recipe.name}</h1>
                        <div className="text-xs text-gray-500">{recipe.cuisine}</div>
                    </div>
                    {recipe.id && (
                        <button
                            onClick={(event) => {
                                event.stopPropagation();
                                toggleFavorite().then(() => console.log("Favorite updated successfully"));
                            }}
                            className="hover:bg-slate-200 w-8 h-8 p-1 rounded-full flex items-center justify-center"
                        >
                            {isFavorite ? <HiBookmark/> : <HiOutlineBookmark/>}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default RecipeCard;