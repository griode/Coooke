/* eslint-disable @typescript-eslint/no-explicit-any */
import Recipe from "../model/recipe_model";
import {mapRecipes} from "./mapper";
import {httpsCallable} from "@firebase/functions";
import {functions} from "@/app/firebase";

// Generate a recipe based on a prompt
async function generateRecipeByPrompt(prompt: string): Promise<Recipe[]> {
    try {
        const generateRecipe = httpsCallable(functions, "recipe_by_description");
        const response = await generateRecipe({
            "text": prompt,
            "language": "en",
        })

        if (response.data) {
            return mapRecipes(response.data);
        }

        return [];
    } catch (error) {
        console.log("Unexpected error:", error);
        return [];
    }
}

export default generateRecipeByPrompt;