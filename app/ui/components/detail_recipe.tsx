import { PiBowlFoodLight, PiFireSimpleThin } from "react-icons/pi";
import { GiSteak } from "react-icons/gi";
import Image from "next/image";
import { CiTimer, CiUser } from "react-icons/ci";
import { NutritionCard } from "./recipe_day";
import Recipe from "@/app/data/model/recipe_model";
import { AlertDialog } from "./alert_dialog";
import { PiCheeseThin } from "react-icons/pi";
export const DetailPage = ({
  recipe,
  setShowDialog,
}: {
  recipe: Recipe;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <AlertDialog setShowDialog={setShowDialog}>
      <div className="p-0 md:p-5">
        <div className="bg-white h-screen md:h-full rounded-none md:rounded-2xl flex-col md:flex-row flex w-full md:space-x-6 overflow-y-scroll scrollbar-hidden md:overflow-hidden shadow-md">
          {/* Recipe image view */}
          <div className="w-full md:w-1/2 md:h-full bg-black rounded-none md:rounded-l-2xl overflow-hidden">
            <Image
              className="object-cover w-full h-full"
              src={recipe.image ?? ""}
              alt={recipe.name}
              layout="responsive"
              width={800}
              height={800}
            />
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
            <p className="text-sm mt-4">{recipe.description}</p>
            <div className="flex gap-8 mt-4">
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
              {/*Recipe ingredients component */}
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
              {/*Recipe instructions component */}
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
