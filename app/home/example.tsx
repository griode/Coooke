import Image from "next/image";
import recipe1 from "@/app/assets/images/image_1.jpg";
import recipe2 from "@/app/assets/images/image_2.jpg";

type RecipeExample = {
  image: string;
  description: string;
};

const recipes: RecipeExample[] = [
  {
    image: recipe1.src,
    description: "Spaghetti with tomato sauce and ground meat",
  },
  {
    image: recipe2.src,
    description: "Vegetable soup with fresh cream",
  },
];

export const Example = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
      {recipes.map((recipe, index) => (
        <div key={index} className="bg-slate-50 rounded-xl">
          <div className="bg-slate-200 rounded-xl h-36 m-1">
            <Image
              alt={recipe.description}
              className="w-full h-full object-cover rounded-xl"
              src={recipe.image}
              width={640}
              height={640}
            />
          </div>
          <p className="text-sm p-2">{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};
