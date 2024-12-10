/* eslint-disable @typescript-eslint/no-explicit-any */
import Recipe from "../model/recipe_model";
import axios from "axios";
import {mapRecipes} from "./mapper";

const url = "https://generate-recipe-by-text-fn-kdraj6z2ta-ew.a.run.app"

// Generate a recipe based on a prompt
async function generateRecipeByPrompt(prompt: string): Promise<Recipe[]> {
    try {
        const data = {
            "text": prompt,
            "language": "en",
        }

        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.status);

        if (response.status === 200) {
            return mapRecipes(response.data.data);
        }

        return [];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("API error:", error);
        } else {
            console.error("Unexpected error:", error);
        }
        return [];
    }
}

export default generateRecipeByPrompt;