"use client";
import { MenuPWeek } from "@/lib/provider/menu_provider";
import Image from "next/image";
import Recipe from "@/lib/model/recipe_model";
import { useState } from "react";
import { DetailPage } from "@/app/detail_recipe/detail_recipe";

const formatDateToDay = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
};

const MenuRecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const showDetailHandler = () => {
    setShowDetail(!showDetail);
  };

  return (
    <>
      {showDetail ? (
        <DetailPage recipe={recipe} setShowDialog={setShowDetail} />
      ) : (
        <></>
      )}
      <div onClick={showDetailHandler} className="w-full">
        <div className="w-full h-24 bg-slate-300 rounded-md overflow-hidden">
          {recipe.image && (
            <Image
              className="object-cover w-full h-full"
              src={recipe.image}
              alt={recipe.name}
              width={800}
              height={800}
            />
          )}
        </div>
        <h3 className="mt-1 line-clamp-2 leading-5 text-sm font-semibold">
          {recipe.name}
        </h3>
      </div>
    </>
  );
};

export const MenuCard = ({ menu }: { menu: MenuPWeek }) => {
  return (
    <div>
      <div className="border px-3 py-2 font-semibold rounded-t-xl">
        {formatDateToDay(menu.date.toLocaleDateString())}
      </div>
      <div className="border mt-1 py-2 rounded-b-xl">
        <div className="m-3">
          <div className="w-8 pt-1 bg-blue-400 rounded-xl"></div>
          <h2 className="">Breakfast</h2>
          <p className="text-xs leading-none text-gray-500">
            {
              menu.recipes.filter((recipe) => recipe.mealType === "breakfast")
                .length
            }{" "}
            Meals
          </p>
          <div className="mt-4 space-y-4">
            {menu.recipes
              .filter((recipe) => recipe.mealType === "breakfast")
              .map((recipe, index) => (
                <MenuRecipeCard key={index} recipe={recipe} />
              ))}
          </div>
        </div>
        <hr />
        <div className="m-3">
          <div className="w-8 pt-1 bg-orange-300 rounded-xl"></div>
          <h2 className="">Lunch</h2>
          <p className="text-xs leading-none text-gray-500">
            {
              menu.recipes.filter((recipe) => recipe.mealType === "lunch")
                .length
            }{" "}
            Meals
          </p>
          <div className="mt-4 space-y-4">
            {menu.recipes
              .filter((recipe) => recipe.mealType === "lunch")
              .map((recipe, index) => (
                <MenuRecipeCard key={index} recipe={recipe} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
