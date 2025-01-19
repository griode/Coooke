import React from "react";

export const LoadingRecipe = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="bg-slate-100 animate-pulse rounded-lg">
          <div className="bg-slate-300 animate-pulse rounded-lg h-36 m-2"></div>
          <div className="mx-2 mb-3">
            <div className="text-sm p-2 animate-bounce bg-slate-300 rounded-md"></div>
            <div className="text-sm animate-bounce p-2 w-2/3 mt-1 bg-slate-300 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
