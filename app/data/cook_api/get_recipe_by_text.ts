/* eslint-disable @typescript-eslint/no-explicit-any */
import Recipe from "../model/recipe_model";
import axios from "axios";
import {mapRecipes} from "./mapper";

const url = "http://127.0.0.1:5001/scan-gourmet/europe-west1/generate_recipe_by_text_fn"

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