"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, SlidersHorizontal, WandSparkles } from "lucide-react";
import chooseImage from "@/app/utils/choose_image";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Recipe } from "@/app/api/entities/recipe";
import { RecipeProvider } from "@/app/api/provider/recipe_provider";
import RecipeCard from "./recipe_card";

export function SheetDemo({ open = false, recipes = [], setOpen }: { open?: boolean, recipes?: Recipe[], setOpen: any }) {
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
            </SheetTrigger>
            <SheetContent className="overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>Recettes générées</SheetTitle>
                    <SheetDescription>
                        Régalez-vous
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4 overflow-y-scroll">
                    {
                        recipes.map((recipe, index) => (
                            <RecipeCard key={recipe.id || index} recipe={recipe} />
                        ))
                    }
                </div>
                <SheetFooter>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}



const RecipeCreator: React.FC = () => {
    const [search, setSearch] = useState("");
    const [mealType, setMealType] = useState("");
    const [cookTime, setCookTime] = useState([30]);
    const [level, setLevel] = useState("");
    const [allergens, setAllergens] = useState("");
    const [open, setOpen] = useState(false);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [onFocus, setOnFocus] = useState(false);

    const chooseImageHandler = async () => {
        try {
            const image = await chooseImage();
            if (image) {
                console.log("Image chosen:", image);
            }
        } catch (error) {
            console.error("Error choosing image:", error);
        }
    };

    const generateRecipesHandler = async () => {
        setLoading(true);
        try {
            const description = search + " duration " + cookTime[0] + " minutes " + " level " + level + " allergens: " + allergens;
            setSearch("");
            const response = await RecipeProvider.generateWithDescription(
                description
            );
            if (response.length > 0) {
                setRecipes([...recipes, ...response]);
                setOpen(true);
            }
        } catch (error) {
            console.error("Error generating recipe:", error);
        }
        setLoading(false);
    }

    const handlerClosse = async () => {
        setOpen(false);
    }

    return (
        <>
            <SheetDemo open={open} recipes={recipes} setOpen={handlerClosse} />
            <div className={`fixed transition-all duration-300 z-40 flex justify-center items-center left-2 right-2 bottom-2`}>
                <div className={`mt-12 border p-2 backdrop-blur-2xl  md:w-2/3 rounded-2xl bg-background/80 ${(onFocus || search.length > 0) ? 'w-full' : ''}`}>
                    <div className="flex gap-2">
                        <Button onClick={chooseImageHandler} size="icon" variant="ghost">
                            <Plus />
                        </Button>
                        <textarea
                            rows={2}
                            className="bg-transparent mt-1.5 w-full outline-none resize-none"
                            name="search"
                            id="search"
                            placeholder="Enter your ingredients or description here"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onFocus={() => setOnFocus(true)}
                            onBlur={() => setOnFocus(false)}
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="secondary">
                                    <SlidersHorizontal className="mr-2" />
                                    Filtres
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="mx-6 w-80">
                                <div className="space-y-4">
                                    <Select value={mealType} onValueChange={setMealType}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Type de repas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="breakfast">Petit déjeuner</SelectItem>
                                            <SelectItem value="lunch">Déjeuner</SelectItem>
                                            <SelectItem value="dinner">Dîner</SelectItem>
                                            <SelectItem value="dessert">Dessert</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Temps de cuisson (min)
                                        </label>
                                        <Slider
                                            value={cookTime}
                                            onValueChange={setCookTime}
                                            max={120}
                                            step={5}
                                        />
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {cookTime[0]} min
                                        </div>
                                    </div>
                                    <Select value={level} onValueChange={setLevel}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Niveau" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="easy">Débutant</SelectItem>
                                            <SelectItem value="medium">Moyen</SelectItem>
                                            <SelectItem value="hard">Chef</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div>
                                        <Label className="font-semibold mb-2">Allergènes à éviter</Label>
                                        <Input
                                            placeholder="Ex: poulet, tomates..."
                                            value={allergens}
                                            onChange={e => setAllergens(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Button disabled={search.length < 3} size="icon" onClick={generateRecipesHandler}>
                            {loading ? (
                                <div className="flex items-center justify-center h-6">
                                    <div className="animate-spin rounded-full h-6 w-6 border-4 border-background border-t-transparent"></div>
                                </div>
                            ) : (
                                <WandSparkles />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecipeCreator;
