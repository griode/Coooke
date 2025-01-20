"use client";
import { PiSparkleDuotone } from "react-icons/pi";
import React, { useEffect, useMemo, useState } from "react";
import "@/style/scroll-style.css";
import RecipeCard from "@/components/recipe_card";
import { Categories, CategoryItem } from "@/app/home/category";
import { EmptyView } from "@/app/home/empty_view";
import { useRecipes } from "@/hooks/use_recipes";
import { FillButton, IconButton } from "@/components/button";
import { HiOutlinePhoto } from "react-icons/hi2";
import { NavigationBar } from "@/components/navigation_bar";
import { Example } from "./example";
import { LoadingRecipe } from "@/app/home/loadingRecipe";
import { RecipeProvider } from "@/api/provider/recipe_provider";
import chooseImage from "@/utils/choose_image";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use_current_user";
import { Recipe } from "@/api/entities/recipe";

const HomePage = () => {
  const [categorySelected, setCategorySelected] = useState<number>(0);
  const { recipes } = useRecipes();
  const [serviceLoading, setServiceLoading] = useState<
    "generation" | "welcome" | "result"
  >("welcome");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const [recipesGenerated, setRecipesGenerated] = useState<Recipe[]>([]);

  // Redirect to homepage if user is not logged in
  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  // API call to generate a recipe based on description
  const generateRecipe = async () => {
    if (description.length > 3) {
      // Clear textarea
      scrollToTop();
      const textAreaDescription = document.getElementById(
        "recipe-description"
      ) as HTMLTextAreaElement;
      textAreaDescription.value = "";

      // Generate recipe
      setServiceLoading("generation");
      const response = await RecipeProvider.generateWithDescription(
        description
      );
      if (response.length > 0) {
        setRecipesGenerated(response);
        setServiceLoading("result");
      }
    }
  };

  // Handle image upload and generate recipes
  const chooseImageHandler = async () => {
    const image = await chooseImage();
    if (image) {
      scrollToTop();
      setServiceLoading("generation");
      const response = await RecipeProvider.generateWithImage(image);
      if (response.length > 0) {
        setRecipesGenerated(response);
        setServiceLoading("result");
      }
    }
  };

  // Filter recipes based on selected category
  const filteredRecipes = useMemo(() => {
    if (categorySelected === 0) {
      return recipes;
    }

    const selectedCategory = Categories.find(
      (cat) => cat.id === categorySelected
    );
    if (!selectedCategory) return recipes;

    return recipes.filter(
      (recipe) =>
        recipe.meal_type.toLocaleLowerCase() ===
          selectedCategory.name.toLocaleLowerCase() ||
        recipe.recipe_name
          .toLowerCase()
          .includes(selectedCategory.name.toLowerCase())
    );
  }, [categorySelected, recipes]);

  const scrollToTop = () => {
    const container = document.getElementById("home-page");
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      id="home-page"
      className="h-full w-full overflow-y-scroll p-4 flex flex-col items-center justify-center relative"
    >
      <div className="md:w-3/4 relative">
        <NavigationBar />
        <div>
          <div>
            <div className="my-4">
              {serviceLoading === "generation" ? (
                <LoadingRecipe />
              ) : recipesGenerated.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                  {recipesGenerated.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                  ))}
                </div>
              ) : (
                <Example />
              )}
            </div>
            <h1 className="text-xl font-bold">
              Recent Recipes |{" "}
              <span className="text-slate-500 text-lg font-normal">
                {recipes.length} Recipes
              </span>
            </h1>
            <div className="flex gap-3 mt-5 flex-wrap">
              {Categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  onClick={() => setCategorySelected(category.id)}
                  category={{
                    ...category,
                    isActive: category.id === categorySelected,
                  }}
                />
              ))}
            </div>
            <div className="my-5">
              {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 py-2">
                  {filteredRecipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                  ))}
                </div>
              ) : (
                <EmptyView />
              )}
            </div>
            <div className="h-40"></div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 md:left-auto md:right-auto flex md:w-3/4 bg-white">
            <div className="w-full m-4 md:mx-0">
              <div className="border rounded-2xl w-full">
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  id="recipe-description"
                  className="w-full h-18 p-3 outline-none bg-transparent resize-none"
                  placeholder="Write recipe name or description and 🍳 let's Cook Something Amazing! 🥗"
                  aria-label="Recipe description"
                ></textarea>
                <div className="flex justify-between px-3 pb-3">
                  <IconButton
                    onClick={chooseImageHandler}
                    aria-label="Upload image"
                  >
                    <HiOutlinePhoto className="text-xl" />
                  </IconButton>
                  <FillButton
                    disabled={description.length < 3}
                    aria-label="Send description"
                    onClick={generateRecipe}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <PiSparkleDuotone />
                      <span>Generate</span>
                    </div>
                  </FillButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
