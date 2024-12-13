import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Recipe from "../data/model/recipe_model";
import { useCurrentUser } from "./use_user_provider";
import { RecipeProvider } from "../data/provider/recipe_provider";
import { getUserId } from "../data/utils/user_manager";

interface RecipeContextType {
    recipes: Recipe[];
    setRecipes: (recipes: Recipe[]) => void;
    loadingRecipes: boolean;
    error: Error | null;
}

const RecipeContext = createContext<RecipeContextType | null>(null);

export const RecipeProviderContext: React.FC<{ children: ReactNode }> = ({ children }) => {
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
            } // Pas d'utilisateur connecté
            setLoadingRecipes(true);
            try {
                const fetchedRecipes = await RecipeProvider.getRecipesByUser({
                    item: 20,
                    userId: currentUser.uid,
                });
                setRecipes(fetchedRecipes);
            } catch (fetchError) {
                setError(fetchError as Error);
            } finally {
                setLoadingRecipes(false);
            }
        };

        fetchRecipes();
    }, [currentUser]);

    return (
        <RecipeContext.Provider value={{ recipes, setRecipes, loadingRecipes, error }}>
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