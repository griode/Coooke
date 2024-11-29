"use client";
import { CiTimer, CiUser } from "react-icons/ci";
import Image from "next/image";
import { useState } from "react";
import { DetailPage } from "@/app/ui/components/detail_recipe";
import Recipe from "@/app/data/model/recipe_model";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
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
      <div onClick={showDetailHandler}>
        <div
          onClick={showDetailHandler}
          className="w-full bg-slate-100 rounded-3xl p-1"
        >
          <div className="w-full bg-slate-300 rounded-3xl overflow-hidden">
            {
              recipe.image && (
                <Image
                  className="object-cover w-full h-full"
                  src={recipe.image}
                  alt={recipe.name}
                  layout="responsive"
                  width={800}
                  height={800}
                />
              )
            }
          </div>
          <div className="m-2">
            <h1 className="font-medium line-clamp-1">{recipe.name}</h1>
            <div className="text-xs text-gray-500 flex space-x-2">
              <div className="flex items-center space-x-1">
                <CiTimer />
                <span>{`${recipe.duration} min`}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CiUser />
                <span>{`${recipe.servings} reviews`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
