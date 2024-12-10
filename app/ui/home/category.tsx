import {GiBlackBook} from "react-icons/gi";
import {MdOutlineDinnerDining, MdOutlineFreeBreakfast, MdOutlineLunchDining} from "react-icons/md";
import {LuDessert, LuSalad, LuSoup} from "react-icons/lu";
import {LiaDrumstickBiteSolid} from "react-icons/lia";
import React from "react";


type Category = {
    isActive: boolean;
    id: number;
    name: string;
    icon: React.ReactNode;
};

export const Categories: Category[] = [
    {
        isActive: false,
        id: 0,
        name: "All",
        icon: <GiBlackBook/>,
    },
    {
        isActive: false,
        id: 1,
        name: "Breakfast",
        icon: <MdOutlineFreeBreakfast/>,
    },
    {
        isActive: false,
        id: 2,
        name: "Lunch",
        icon: <MdOutlineLunchDining/>,
    },
    {
        isActive: false,
        id: 3,
        name: "Dinner",
        icon: <MdOutlineDinnerDining/>,
    },
    {
        isActive: false,
        id: 4,
        name: "Dessert",
        icon: <LuDessert/>,
    },
    {
        isActive: false,
        id: 5,
        name: "Snacks",
        icon: <LiaDrumstickBiteSolid/>,
    },
    {
        isActive: false,
        id: 6,
        name: "Soups",
        icon: <LuSoup/>,
    },
    {
        isActive: false,
        id: 7,
        name: "Vegan",
        icon: <LuSalad/>,
    },

];

export const CategoryItem = ({category, onClick}: {
    category: Category,
    onClick: React.MouseEventHandler<HTMLDivElement>
}) => {

    return (
        <div
            onClick={onClick}
            className={`${category.isActive ? "text-slate-900" : "text-slate-500"} space-y-2 flex flex-col items-center justify-center cursor-pointer`}>
            <div className={"text-3xl"}>
                {category.icon}
            </div>

            <p className={"text-xs"}>{category.name}</p>
        </div>
    )
}