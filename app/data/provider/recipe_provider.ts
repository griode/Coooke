import { db } from "@/app/firebase";
import { collection, getDocs, limit, query, getDoc, doc } from "firebase/firestore"; 
import Recipe from "../model/recipe_model";

export class RecipeProvider {

    // Get by id
    static async getRecipeById(id: string) {
        const collectionRef = doc(db, "recipes", id);
        // Get the documents from the collection
        // Get the documents
        const docSnap = await getDoc(collectionRef);
        return Recipe.fromFireStore(docSnap);
    }


    // Get the documents from the collection
    static async getRecipes({ item }: { item: number }) {
        const collectionRef = collection(db, "recipes");
        // Get the documents from the collection
        const q = query(collectionRef, limit(item));
        // Get the documents
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => Recipe.fromFireStore(doc));
    }

    // get recipe of day
    static async getRecipeOfDay(): Promise<Recipe> {
        const collectionRef = doc(db, "recipe_day", "en");
        // Get the documents from the collection
        // Get the documents
        const docSnap = await getDoc(collectionRef);
        const recipId = docSnap.data()?.recipe_id;
        const recipe = await RecipeProvider.getRecipeById(recipId);
        return recipe;
    }
}