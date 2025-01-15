import {Timestamp} from "firebase/firestore";

export type Recipe = {
    image?: string;
    id?: string;
    createdBy?: string;
    name: string;
    ingredients: string[];
    instructions: string[];
    duration: string;
    servings: string;
    difficulty: string;
    cuisine: string;
    description?: string;
    nutritionFacts?: Map<string, string>;
    diet?: string;
    language?: string;
    index?: number;
    createdAt: Timestamp;
    continent: string;
    mealType: string;
    trainByServer?: boolean;
}