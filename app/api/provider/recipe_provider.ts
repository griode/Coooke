import { compressImageToBase64 } from "@/app/utils/upload_file"
import { apiConfig } from "@/app/api/config";
import { Recipe } from "@/app/api/entities/recipe";

type BaseType = {
    base64: string;
    mimeType: string;
}

const convertDataURLToBase64 = (dataURL: string): BaseType | null => {
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
    static async getRecipe(id: string): Promise<{ recipe: Recipe | null }> {
        try {
            const response = await fetch(`${apiConfig.base_url}/recipe/?recipe_id=${id}`, {
                method: 'GET',
                headers: apiConfig.request_headers,
            })
            if (response.ok) {
                const data = (await response.json())['data'][0] as Recipe;
                return { recipe: data };
            } else {
                return { recipe: null };
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            return { recipe: null };
        }
    }
    //get last recipes
    static async getLastRecipes(offset: number, limit: number): Promise<{ recipes: Recipe[], totalCount: number }> {
        try {
            const response = await fetch(`${apiConfig.base_url}/recipes/?offset=${offset}&limit=${limit}`, {
                method: 'GET',
                headers: apiConfig.request_headers,
            })
            if (response.ok) {
                const data = (await response.json())['data'] as Recipe[];
                return { recipes: data, totalCount: 20 };

            } else {
                return { recipes: [], totalCount: 0 };
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            return { recipes: [], totalCount: 0 };
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

    static async getTotalRecipes(): Promise<number> {
        try {
            const response = await fetch(`${apiConfig.base_url}/recipes/count/`, {
                method: 'GET',
                headers: apiConfig.request_headers,
            })
            if (response.ok) {
                return (await response.json())['count'] as number;
            } else {
                return 0;
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            return 20;
        }
    }
}