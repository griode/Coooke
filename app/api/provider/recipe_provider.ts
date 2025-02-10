import { compressImageToBase64 } from "@/app/utils/upload_file"
import { apiConfig } from "@/app/api/config";
import { Recipe } from "@/app/api/entities/recipe";

type BaseType = {
    base64: string;
    mimeType: string;
}

const convertDataURLToBase64 = (dataURL: string): BaseType | null => {
    // Check if the dataURL is a valid image
    if (dataURL.startsWith("data:image/")) {
        const base64 = dataURL.split(",")[1];
        return {
            "base64": base64,
            "mimeType": "image/$ext",
        };
    } else {
        console.error("the dataURL is not a valid image");
        return null;
    }
}



export class RecipeProvider {
    //get last recipes
    static async getLastRecipes(offset: number, limit: number): Promise<Recipe[] | []> {
        try {
            const response = await fetch(`${apiConfig.base_url}/recipes/?offset=${offset}&limit=${limit}`, {
                method: 'GET',
                headers: apiConfig.request_headers,
            })
            if (response.ok) {
                const data = (await response.json())['data'] as Recipe[];
                return data;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            return [];
        }
    }

    static async saveRecipe(recipe: Recipe): Promise<boolean> {
        try {
            const response = await fetch(`${apiConfig.base_url}/recipe/`, {
                method: 'POST',
                headers: apiConfig.request_headers,
                body: JSON.stringify(recipe),
            });

            return response.ok;
        } catch (error) {
            console.error("Unexpected error:", error);
            return false;
        }
    }

    static async generateImage(image: string): Promise<string | null> {
        try {
            const response = await fetch(`${apiConfig.base_url}/generate_image_text/`, {
                method: 'POST',
                headers: apiConfig.request_headers,
                body: JSON.stringify({ text: image }),
            })

            if (response.ok) {
                return (await response.json())['url'] as string;;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Unexpected error:", error);
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
                const recipes = (await response.json())['data'] as Recipe[];
                return recipes;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            return [];
        }
    }

    // Generate a recipe based on an image
    static async generateWithImage(image: string): Promise<Recipe[]> {
        try {
            const imageCompress = await compressImageToBase64(image, 3)
            if (!imageCompress) { return [] }
            const imageConvert = convertDataURLToBase64(imageCompress)
            if (!imageConvert) { return [] }

            const response = await fetch(`${apiConfig.base_url}/gen_witch_image/`, {
                method: 'POST',
                headers: apiConfig.request_headers,
                body: JSON.stringify({
                    "language": "en",
                    "images": [imageConvert],
                }),
            })
            if (response.ok) {
                return (await response.json()) as Recipe[];
            }
            return []
        } catch (error) {
            console.error("Unexpected error:", error)
            return [];
        }
    }
}