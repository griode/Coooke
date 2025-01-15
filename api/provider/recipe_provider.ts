import {compressImageToBase64} from "@/utils/upload_file"
import {apiConfig} from "@/api/config";
import {Recipe} from "@/api/entities/recipe";


export class RecipeProvider {
    static mapRecipes = (data: any): Recipe[] => {
        const recipes: Recipe[] = [];
        for (const jsonData of data) {
            recipes.push(jsonData as Recipe);
        }
        return recipes;
    }

    static convertDataURLToBase64 = (dataURL: string)=> {
        if (dataURL.startsWith("api:image/")) {
            const base64 = dataURL.split(",")[1];
            return {"base64": base64, "mimeType": "image/$ext",};
        } else {
            console.error("Le format de l'image n'est pas valide");
            return null;
        }
    }

    static async generateWithDescription(prompt: string): Promise<Recipe[]> {
        try {
            const response = await fetch(`${apiConfig.base_url}/gen_witch_text/`, {
                method: 'POST',
                headers: apiConfig.request_headers,
                body: JSON.stringify({ text: prompt, language: "en" }),
            })

            if (response.ok) {
                const data = (await response.json())['data'];
                return RecipeProvider.mapRecipes(data);
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
        if (!imageCompress) return []

        const imageConvert = RecipeProvider.convertDataURLToBase64(imageCompress)
        if (!imageConvert)  return []

        try {
            const response = await fetch(`${apiConfig.base_url}/gen_witch_image/`, {
                method: 'POST',
                headers: apiConfig.request_headers,
                body: JSON.stringify({
                    "language": "en",
                    "images": [imageConvert],
                }),
            })
            console.log(response)
            if (response.ok) {
                const recipes = (await response.json())['data'];
                return RecipeProvider.mapRecipes(recipes)
            }
            return []
        } catch (error) {
            console.error("Unexpected error:", error)
            return [];
        }
    }
}