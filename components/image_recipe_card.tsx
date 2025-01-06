import Image from "next/image";
import image1 from "@/assets/images/image_1.jpg";
import image2 from "@/assets/images/image_2.jpg";
import { StaticImageData } from "next/image";

interface Recipe {
  title: string;
  photoUrl: StaticImageData;
}

const listRecipes: Recipe[] = [
  {
    title: "Stuffed eggplants with yogurt and salad",
    photoUrl: image1,
  },
  {
    title: "Autumn Soup",
    photoUrl: image2,
  },
];

export const RecipeSection = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
      {listRecipes.map((recipe, index) => (
        <ImageRecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
};

export const ImageRecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-slate-100 rounded-3xl relative overflow-hidden">
      <h3 className="text-lg font-bold text-white absolute bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent w-full">
        {recipe.title}
      </h3>
      <Image
        className="object-cover w-full h-full"
        src={recipe.photoUrl}
        alt={recipe.title}
      />
    </div>
  );
};
