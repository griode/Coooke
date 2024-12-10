import {InteractiveButtonFilled} from "@/app/components/interactive_panel_props";
import React from "react";
import {LuEggFried} from "react-icons/lu";
import {PiCookingPotDuotone} from "react-icons/pi";
import {MdOutlineSoupKitchen} from "react-icons/md";
import {TbMeat} from "react-icons/tb";

export const EmptyView = () => {
    return (
        <div
            className="p-5 space-y-4 flex flex-col items-center justify-between border rounded-2xl mt-2 overflow-hidden">
            <div className="space-x-2 text-4xl text-center flex flex-wrap items-center justify-center">
                <LuEggFried/>


                <TbMeat/>
                <span>Generate your own recipes with AI</span>
                <MdOutlineSoupKitchen/>
                <PiCookingPotDuotone/>
            </div>
            <div className="w-96 flex flex-col items-center justify-center">
                <p className="text-sm text-center">
                    Transform your ingredients into delicious dishes - Scan and find
                    recipes instantly!
                </p>
                <div className="mt-4">
                    <InteractiveButtonFilled
                        icon={"Generate new recipe"}
                        panelId={"chatPanel"}

                    />
                </div>
            </div>
        </div>
    );
};