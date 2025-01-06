import React from "react";

export const EmptyMenu = () => {
    return (
        <div
            className="p-12 space-y-6 flex flex-col items-center justify-center rounded-2xl mt-8 bg-gray-50">
            {/* Header */}
            <div
                className="space-x-4 text-4xl md:text-5xl text-center flex flex-wrap items-center justify-center text-gray-600">

                <span className="text-gray-800 font-semibold">No Menu Available</span>

            </div>

            {/* Message */}
            <div className="md:w-3/4 lg:w-1/2 text-center">
                <p className="text-base text-gray-700">
                    It looks like your menu is empty. Start exploring delicious recipes and add your reciper to the
                    menu by clicking the star icon on any recipe card.
                </p>
            </div>
        </div>
    );
};