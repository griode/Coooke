/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, db } from "@/app/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { weekMenuConverter, WeekMenuModel } from "../model/Week_menu_model";
import Recipe from "../model/recipe_model";
import { RecipeProvider } from "./recipe_provider";

export type MenuPWeek = {
  date: Date;
  recipes: Recipe[];
};

class WeekMenuProvider {
  static get currentUser() {
    return auth.currentUser;
  }

  private static readonly weeklyCollection = collection(
    db,
    "week_menu"
  ).withConverter<WeekMenuModel>(weekMenuConverter);

  /**
   * Fetch the weekly menu for a specific user.
   * @param userId - The ID of the user.
   * @returns A promise resolving to an array of `MenuPWeek`.
   */
  static async getMenuUser(userId: string): Promise<MenuPWeek[]> {
    const menu: MenuPWeek[] = [];

    try {
      const docRef = doc(this.weeklyCollection, userId);
      const result = await getDoc(docRef);

      if (!result.exists()) {
        console.warn(`No menu found for user ID: ${userId}`);
        return menu;
      }

      const menuWeek = result.data()?.menu;
      const menuPromises = Object.entries(menuWeek).map(
        async ([, dayMenu]) => {
          const recipes = await this.fetchRecipes(dayMenu.recipe_ids);
          return {
            date: dayMenu.date.toDate(),
            recipes,
          };
        }
      );

      return await Promise.all(menuPromises);
    } catch (error) {
      console.error("Error fetching user menu:", error);
      return menu;
    }
  }

  /**
   * Update the user's weekly menu in Firestore.
   * @param menu - The updated menu data.
   * @returns A promise resolving to `true` if successful, `false` otherwise.
   */
  static async updateMenuToRecipe(
    menu: WeekMenuModel["menu"]
  ): Promise<boolean> {
    if (!this.currentUser) {
      console.warn("No authenticated user found.");
      return false;
    }

    try {
      const docRef = doc(this.weeklyCollection, this.currentUser.uid);
      await updateDoc(docRef, { menu });
      return true;
    } catch (error) {
      console.error("Error updating menu:", error);
      return false;
    }
  }

  /**
   * Fetch recipes by their IDs.
   * @param recipeIds - An array of recipe IDs.
   * @returns A promise resolving to an array of `Recipe`.
   */
  private static async fetchRecipes(recipeIds: string[]): Promise<Recipe[]> {
    const recipePromises = recipeIds.map((recipeId) =>
      RecipeProvider.getRecipeById(recipeId).catch((error) => {
        console.error(`Error fetching recipe with ID ${recipeId}:`, error);
        return null;
      })
    );

    // Filter out null values for missing or failed recipe fetches
    return (await Promise.all(recipePromises)).filter(
      (recipe): recipe is Recipe => recipe !== null
    );
  }
}

export default WeekMenuProvider;