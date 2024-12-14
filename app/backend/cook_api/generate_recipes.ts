/* eslint-disable @typescript-eslint/no-explicit-any */
import Recipe from "../model/recipe_model";
import { mapRecipes } from "./mapper";
import { httpsCallable } from "@firebase/functions";
import { functions } from "@/app/firebase";
import { compressImageToBase64 } from "../utils/upload_file";


// Generate a recipe based on a prompt
export async function getRecipeByText(prompt: string): Promise<Recipe[]> {
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
        console.error("Unexpected error:", error);
        return [];
    }
}


function convertDataURLToBase64(dataURL: string) {
    // Vérifier si la chaîne contient le préfixe attendu
    if (dataURL.startsWith("data:image/")) {
        // Extraire la partie Base64 après la virgule
        const base64 = dataURL.split(",")[1];
        return {
            "base64": base64,
            "mimeType": "image/$ext",
        };
    } else {
        throw new Error("Le format de l'image n'est pas valide");
    }
}


export async function getRecipeByImage(image: string): Promise<Recipe[]> {
    try {
        const imageCompress = await compressImageToBase64(image)
        const generateRecipe = httpsCallable(functions, "recipe_by_images");
        const response = await generateRecipe({
            "language": "en",
            "images": [convertDataURLToBase64(imageCompress)],
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