"use client";
import {useState} from "react";
import Recipe from "@/app/data/model/recipe_model";
import {DetailPage} from "../ui/detail_recipe/detail_recipe";
import Image from "next/image";
import CircularProgress from "./circular_progress";
import {PiCookingPot} from "react-icons/pi";
//import {CiImageOff} from "react-icons/ci";

const RecipeCard = ({recipe}: { recipe: Recipe }) => {
    const [showDetail, setShowDetail] = useState<boolean>(false);

    const showDetailHandler = () => {
        setShowDetail(!showDetail);
    };

    return (
        <>
            {showDetail ? (
                <DetailPage recipe={recipe} setShowDialog={setShowDetail}/>
            ) : (
                <></>
            )}
            <div onClick={showDetailHandler} className="cursor-pointer">
                <div
                    onClick={showDetailHandler}
                    className="w-full bg-slate-100 rounded-2xl"
                >
                    <div className="w-full h-36 bg-slate-300 rounded-t-2xl overflow-hidden relative">
                        <div className={"absolute text-xs bottom-2 left-3 "}>
                            <div className="flex items-center space-x-1 bg-white px-1 rounded-full">
                                <PiCookingPot/>
                                <span>{`${recipe.duration} min`}</span>
                            </div>

                        </div>
                        {(recipe.image == "" || recipe.image == null) ?
                            <div className={"w-full h-full flex justify-center items-center"}>
                                <CircularProgress size={30} infinite={true}/>
                            </div>
                            : (recipe.image == "") ?
                                <div className={"w-full text-3xl h-full flex justify-center items-center"}>
                                    <CircularProgress size={30} infinite={true}/>
                                </div> : (<Image
                                    className="object-cover w-full h-full"
                                    src={recipe.image}
                                    alt={recipe.name}
                                    width={500}
                                    height={500}
                                />)}
                    </div>
                    <div className="p-3">
                        <h1 className="font-bold text-sm line-clamp-1">{recipe.name}</h1>
                        <div className="text-xs text-gray-500 flex space-x-2">
                            {`${recipe.cuisine}`}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipeCard;
