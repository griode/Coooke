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
    nutritionFacts?: {
        carbone: string;
        protein: string;
        fibres: string;
        sel: string;
        sodium: string;
        potassium: string;
    };
    diet?: string;
    language?: string;
    index?: number;
    createdAt: Timestamp;
    continent: string;
    mealType: string;
    trainByServer?: boolean;
}