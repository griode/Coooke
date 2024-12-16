import React, { useState } from "react";
import { PiBowlFoodLight, PiCheeseThin, PiFireSimpleThin } from "react-icons/pi";
import { GiSteak } from "react-icons/gi";
import { CiTimer, CiUser } from "react-icons/ci";
import Recipe from "@/app/lib/model/recipe_model";
import { AlertDialog } from "@/app/components/alert_dialog";
import Image from "next/image";
import { IoFastFoodOutline } from "react-icons/io5";
import { useCurrentUser } from "@/app/hooks/use_current_user";
import { IconButton } from "@/app/components/button";
import { BsTrash2 } from "react-icons/bs";
import { useRecipes } from "@/app/hooks/use_recipes";
import RecipeProvider from "@/app/lib/provider/recipe_provider";


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
}

export const DetailPage = ({
    recipe,
    setShowDialog,
}: {
    recipe: Recipe;
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [loadImageError, setLoadImageError] = useState<boolean>(false);
    const { currentUser } = useCurrentUser();
    const { setRecipes, recipes } = useRecipes();

    const deleteRecipeHandler = () => {
        const confirmed = window.confirm("Are you sure you want to delete this recipe?");
        if (confirmed && recipe.id) {
            RecipeProvider.deleteRecipe(recipe.id).then((value) => {
                if (value) {
                    setRecipes(recipes.filter((recipe) => recipe.id !== recipe.id));
                }
            });
        }
    }

    return (
        <AlertDialog
            header={
                <div className="text-red-500">
                    {(recipe.createdBy == currentUser?.uid && recipe.id) ? <IconButton onClick={deleteRecipeHandler}><BsTrash2 /></IconButton> : null}
                </div>
            }
            setShowDialog={setShowDialog}>
            <div className="p-0 md:p-5">
                <div
                    className="bg-white h-screen md:h-full rounded-none md:rounded-2xl flex-col md:flex-row flex w-full md:space-x-6 overflow-y-scroll scrollbar-hidden md:overflow-hidden shadow-md">
                    {/* Recipe image view */}
                    <div
                        className="w-full md:w-1/2 md:h-full bg-slate-100 rounded-none md:rounded-l-2xl overflow-hidden">
                        {(loadImageError || recipe.image == "" || recipe.image == null) ?
                            <div
                                className={"text-9xl text-slate-700 w-full h-64 md:h-96 md:py-80 flex justify-center items-center"}>
                                <IoFastFoodOutline className={"animate-pulse"} />
                            </div> : (<Image
                                className="object-cover w-full h-full"
                                src={recipe.image}
                                alt={recipe.name}
                                width={500}
                                height={500}
                                onError={() => setLoadImageError(true)}
                            />)}
                    </div>
                    {/* Recipe detail view */}
                    <div className="w-full md:w-1/2 md:overflow-scroll flex flex-col pr-4 px-4 md:px-0">
                        <div className="h-4"></div>
                        <h1 className="text-3xl font-bold">{recipe.name}</h1>
                        <div className="text-gray-500 mt-2 flex space-x-2">
                            <div className="flex items-center space-x-1">
                                <CiTimer />
                                <span>{`${recipe.duration} min`}</span>
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
                        <div className="grid grid-cols-2 gap-8 mt-4">
                            <div className="space-y-2">
                                <NutritionCard
                                    title={`${recipe?.nutritionFacts.calories} kcal`}
                                    icon={<PiBowlFoodLight />}
                                />
                                <NutritionCard
                                    title={`${recipe?.nutritionFacts.protein} Protein`}
                                    icon={<GiSteak />}
                                />
                            </div>
                            <div className="space-y-2">
                                <NutritionCard
                                    title={`${recipe?.nutritionFacts.carbohydrates} Carbs`}
                                    icon={<PiFireSimpleThin />}
                                />
                                <NutritionCard
                                    title={`${recipe?.nutritionFacts.fat} Fat`}
                                    icon={<PiCheeseThin />}
                                />
                            </div>
                        </div>
                        <div className="h-8">
                            {/* Recipe ingredients component */}
                            <div className="mt-4 flex-1 border p-2 rounded-xl">
                                <h2 className="text-lg font-bold">Ingredients</h2>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <div key={index} className="bg-slate-200 p-2 rounded-lg">
                                            {ingredient}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Recipe instructions component */}
                            <div className="mt-4 border p-2 rounded-xl">
                                <h2 className="text-lg font-bold mb-2">Instructions</h2>
                                {recipe.instructions.map((instruction, index) => (
                                    <div
                                        key={index}
                                        className="flex p-2 items-start rounded-lg mb-4 bg-slate-100"
                                    >
                                        <p>{instruction}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="h-8"></div>
                        </div>
                    </div>
                </div>
            </div>
        </AlertDialog>
    );
};