/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, db } from "@/app/firebase";
import {
  collection,
  getDocs,
  limit,
  query,
  getDoc,
  doc,
  addDoc,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import Recipe from "../model/recipe_model";
import { uploadImageFromUrl } from "../utils/upload_file";

class RecipeProvider {
  static async getRecipeById(id: string): Promise<Recipe | null> {
    try {
      const collectionRef = doc(db, "recipes", id);
      const docSnap = await getDoc(collectionRef);
      return Recipe.fromFireStore(docSnap);
    } catch (error) {
      console.log("Error fetching recipe:", error);
      return null;
    }
  }

  // Get the documents from the collection
  static async getRecipesByUser({ item, userId }: { item: number, userId: string }): Promise<Recipe[]> {
    const collectionRef = collection(db, "recipes");
    const q = query(collectionRef, limit(item), where("created_by", "==", userId), orderBy("created_at", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => Recipe.fromFireStore(doc));
  }

  // static async saveRecipe(recipe: Recipe): Promise<string | null> {
  //   try {
  //     const collectionRef = collection(db, "recipes");
  //     recipe.image = await uploadImageFromUrl(recipe.image ?? "", "recipes");
  //     recipe.createdBy = auth.currentUser?.uid
  //     recipe.trainByServer = true
  //     const response = await addDoc(collectionRef, recipe.toFireStore());
  //     if (response) {
  //       return response.id;
  //     }
  //     return null;
  //   } catch (error) {
  //     console.error("Error saving recipe:", error);
  //     return null;
  //   }
  // }

  static async deleteRecipe(id: string): Promise<boolean> {
    try {
      const collectionRef = collection(db, "recipes");
      await deleteDoc(doc(collectionRef, id));
      console.log("Recipe deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting recipe:", error);
      return false;
    }
  }
}

export default RecipeProvider;