import {InteractiveButtonFilled} from "@/app/components/interactive_panel_props";
import React from "react";

export const EmptyView = () => {
    return (
        <div
            className="p-5 space-y-4 flex flex-col items-center justify-between border rounded-2xl mt-2 overflow-hidden">
            <div className="text-4xl text-center">
                ☕︎♨︎ Generate your own recipes with AI ✧
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