/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentData, DocumentSnapshot, Timestamp } from 'firebase/firestore';

type RecipeData = {
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
};

class Recipe {
  image?: string;
  id?: string;
  createdBy?: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  duration: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  description?: string;
  nutritionFacts?: any;
  diet?: string;
  language?: string;
  index?: number;
  createdAt: Timestamp;
  continent: string;
  mealType: string;

  constructor(data: RecipeData) {
    this.image = data.image;
    this.id = data.id;
    this.createdBy = data.createdBy;
    this.name = data.name;
    this.ingredients = data.ingredients;
    this.instructions = data.instructions;
    this.duration = Number(data.duration);
    this.servings = Number(data.servings);
    this.difficulty = data.difficulty;
    this.cuisine = data.cuisine;
    this.description = data.description;
    this.nutritionFacts = data.nutritionFacts;
    this.diet = data.diet;
    this.language = data.language;
    this.index = data.index;
    this.createdAt = data.createdAt;
    this.continent = data.continent;
    this.mealType = data.mealType;
  }

  static fromFireStore(
    snapshot: DocumentSnapshot<DocumentData, DocumentData>
  ): Recipe {
      const data = snapshot.data();

    return new Recipe({
      image: data!['image'],
      name: data!['recipe_name'],
      ingredients: data!['ingredients'],
      instructions: data!['instructions'],
      duration: data!['duration_to_cook'],
      servings: data!['servings'],
      difficulty: data!['difficulty'],
      nutritionFacts: data!['nutrition_facts'],
      cuisine: data!['cuisine'],
      description: data!['description'],
      language: data!['language'],
      diet: data!['diet'],
      index: data!['index'],
      createdAt: data!['created_at'],
      continent: data!['continent'],
      mealType: data!['meal_type'],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromJson(json: any): Recipe {
    return new Recipe({
      image: json['image'],
      name: json['recipe_name'],
      ingredients: json['ingredients'],
      instructions: json['instructions'],
      duration: json['duration_to_cook'],
      servings: json['servings'],
      difficulty: json['difficulty'],
      nutritionFacts: json['nutrition_facts'],
      cuisine: json['cuisine'],
      description: json['description'],
      language: json['language'],
      diet: json['diet'],
      index: json['index'],
      createdAt: Timestamp.now(),
      continent: json['continent'],
      mealType: json['meal_type'],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toFireStore(): any {
    return {
      created_by: this.createdBy,
      image: this.image,
      recipe_name: this.name,
      ingredients: this.ingredients,
      instructions: this.instructions,
      duration_to_cook: this.duration,
      servings: this.servings,
      difficulty: this.difficulty,
      nutrition_facts: this.nutritionFacts,
      cuisine: this.cuisine,
      description: this.description,
      diet: this.diet,
      language: this.language,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
      index: this.index,
      continent: this.continent,
      meal_type: this.mealType,
    };
  }
}

export default Recipe;