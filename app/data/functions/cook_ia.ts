/* eslint-disable @typescript-eslint/no-explicit-any */
import Recipe from "../model/recipe_model";
import axios from "axios";

const url = "http://127.0.0.1:5001/scan-gourmet/europe-west1/generate_recipe_by_text_fn"

// Generate a recipe based on a prompt
export const generateRecipeByPrompt = async (prompt: string): Promise<Recipe[]> => {
    try {
        const data = {
            "text": prompt,
            "language": "en",
        }

        const response = await axios.post(url, data);

        if (response.status === 200) {
            const recipes = mapRecipes(response.data.data);
            return recipes;
        }

        return [];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("API error:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        return [];
    }
};

const mapRecipes = (data: Map<string, any>[]): Recipe[] => {
    const recipes: Recipe[] = [];
    for (const jsonData of data) {
        const recipe = Recipe.fromJson(jsonData);
        recipes.push(recipe);
    }
    return recipes;
};