import axios from "axios"
import {mapRecipes} from "./mapper"
import Recipe from "../model/recipe_model"

const url = "https://generate-recipe-by-image-fn-kdraj6z2ta-ew.a.run.app"

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

async function getRecipeByImage(image: string): Promise<Recipe[]> {
    try {
        const data = {
            "language": "en",
            "images": [convertDataURLToBase64(image)],
        }
        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.status === 200) {
            return mapRecipes(response.data.data)
        }
        return []
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("API error:", error.response?.data || error.message)
        } else {
            console.error("Unexpected error:", error)
        }
        return [];
    }
}

export default getRecipeByImage