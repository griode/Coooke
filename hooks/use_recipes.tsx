import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useCurrentUser } from "./use_current_user";
import { getUserId } from "@/utils/user_manager";
import { Recipe } from "@/api/entities/recipe";
import { RecipeProvider } from "@/api/provider/recipe_provider";

interface RecipeContextType {
  recipes: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  loadingRecipes: boolean;
  error: Error | null;
}

const RecipeContext = createContext<RecipeContextType | null>(null);

export const RecipeProviderContext: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!currentUser || (await getUserId()) === null) {
        setRecipes([]);
        setLoadingRecipes(false);
        return;
      }
      setLoadingRecipes(true);
      try {
        const lastRecipes = await RecipeProvider.getLastRecipes(0, 5);
        setRecipes(lastRecipes);
      } catch (fetchError) {
        setError(fetchError as Error);
      } finally {
        setLoadingRecipes(false);
      }
    };

    fetchRecipes();
  }, [currentUser]);

  return (
    <RecipeContext.Provider
      value={{ recipes, setRecipes, loadingRecipes, error }}
    >
      {loadingRecipes ? <div>Loading...</div> : children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProviderContext");
  }
  return context;
};
