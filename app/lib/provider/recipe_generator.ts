/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, functions } from "@/app/firebase"
import { httpsCallable } from "firebase/functions"
import Recipe from "../model/recipe_model"
import { compressImageToBase64 } from "../utils/upload_file"
import RecipeProvider from "./recipe_provider"

type BaseType = {
    base64: string;
    mimeType: string;
}

const mapRecipes = (data: any): Recipe[] => {
    const recipes: Recipe[] = [];
    for (const jsonData of data) {
        const recipe = Recipe.fromJson(jsonData)
        recipes.push(recipe);
    }
    return recipes;
}

const convertDataURLToBase64 = (dataURL: string): BaseType | null => {
    // Vérifier si la chaîne contient le préfixe attendu
    if (dataURL.startsWith("data:image/")) {
        const base64 = dataURL.split(",")[1];
        return {
            "base64": base64,
            "mimeType": "image/$ext",
        };
    } else {
        console.error("Le format de l'image n'est pas valide");
        return null;
    }
}

class RecipeGenerator {
    // Generate a recipe based on a prompt
    static async generateWithDescription(prompt: string): Promise<Recipe[]> {
        try {
            const generateRecipe = httpsCallable(functions, "recipe_by_description")
            const response = await generateRecipe({ "text": prompt, "language": "en" })

            if (response.data) {
                const newRecipes = mapRecipes(response.data);
                for (const recipe of newRecipes) {
                    recipe.createdBy = auth.currentUser?.uid
                    await RecipeProvider.saveRecipe(recipe)
                }
                return newRecipes;
            }
            return [];
        } catch (error) {
            console.error("Unexpected error:", error);
            return [];
        }
    }

    // Generate a recipe based on an image
    static async generateWithImage(image: string): Promise<Recipe[]> {
        const imageCompress = await compressImageToBase64(image, 3)
        if (!imageCompress) { return [] }
        const imageConvert = convertDataURLToBase64(imageCompress)
        if (!imageConvert) { return [] }

        try {

            const generateRecipe = httpsCallable(functions, "recipe_by_images");
            const response = await generateRecipe({
                "language": "en",
                "images": [imageConvert],
            })

            if (response.data) {
                return mapRecipes(response.data)
            }
            return []
        } catch (error) {
            console.error("Unexpected error:", error)
            return [];
        }
    }
}

export default RecipeGenerator;