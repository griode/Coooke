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
  static currentUser = auth.currentUser;

  private static readonly weeklyCollection = collection(
    db, // Replace with your Firestore instance
    "week_menu"
  ).withConverter<WeekMenuModel>(weekMenuConverter);

  static async getMenuUser(userId: string): Promise<MenuPWeek[]> {
    const menu: MenuPWeek[] = [];

    try {
      const docRef = doc(this.weeklyCollection, userId);
      const result = await getDoc(docRef);

      if (result.exists()) {
        const menuWeek = (result.data() as WeekMenuModel).menu;
        for (let day = 1; day <= 7; day++) {
          const recipes: Recipe[] = [];
          const recipeIds = menuWeek[`day${day}`].recipe_ids;
          for (const recipeId of recipeIds) {
            const recipe = await RecipeProvider.getRecipeById(recipeId);
            if (recipe) {
              recipes.push(recipe);
            }
          }
          menu.push({
            date: menuWeek[`day${day}`].date.toDate(),
            recipes: recipes,
          });
        }
      }
      return menu;
    } catch (error) {
      console.error("Error fetching user menu:", error);
      return menu;
    }
  }

  static async updateMenuToRecipe(menu: Record<string, any>): Promise<boolean> {
    if (!this.currentUser) return false;

    try {
      const docRef = doc(this.weeklyCollection, this.currentUser.uid);
      await updateDoc(docRef, { menu });
      return true;
    } catch (error) {
      console.error("Error updating menu:", error);
      return false;
    }
  }
}

export default WeekMenuProvider;
