import { db } from "@/app/firebase";
import {
  collection,
  getDocs,
  limit,
  query,
  getDoc,
  doc,
} from "firebase/firestore";
import Recipe from "../model/recipe_model";

export class RecipeProvider {
  // Get by id
  static async getRecipeById(id: string): Promise<Recipe> {
    try {
      const collectionRef = doc(db, "recipes", id);
      const docSnap = await getDoc(collectionRef);
      return Recipe.fromFireStore(docSnap);
    } catch (error) {
      throw new Error(`Error fetching recipe: ${error}`);
    }
  }

  // Get the documents from the collection
  static async getRecipes({ item }: { item: number }): Promise<Recipe[]> {
    const collectionRef = collection(db, "recipes");
    const q = query(collectionRef, limit(item));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => Recipe.fromFireStore(doc));
  }

  // Get recipe of the day
  static async getRecipeOfDay(): Promise<Recipe[]> {
    try {
      const collectionRef = doc(db, "recipe_day", "en");
      const docSnap = await getDoc(collectionRef);
      const recipeIds: string[] = docSnap.data()?.recipe_id ?? [];

      const recipePromises = recipeIds.map((recipeId) =>
        RecipeProvider.getRecipeById(recipeId)
      );
      return Promise.all(recipePromises);
    } catch (error) {
      console.error("Error fetching recipe of the day:", error);
      return [];
    }
  }
}