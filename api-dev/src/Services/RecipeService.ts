import { getRepository, In } from "typeorm";
import { Ingredient } from "../Entities/Ingredient";
import { Recipe } from "../Entities/Recipe";
import {
  IngredientCategory,
  RecipeValidation,
  RecipeValidationError,
  ValidatedRecipe,
} from "../types";

export class RecipeService {
  static async validate(recipe: Recipe): Promise<RecipeValidation> {
    const recipes = await getRepository(Recipe).find({
      relations: ["ingredients"],
    });
    const validation = recipe.validate();
    const protein = recipe.ingredients.find(
      (i) => i.category === IngredientCategory.PROTEIN
    );
    const proteinAlreadyUsed = recipes.some((comparedRecipe) => {
      const comparedProtein = comparedRecipe.ingredients.find(
        (i) => i.category === IngredientCategory.PROTEIN
      );
      return (
        comparedRecipe.id !== recipe.id && comparedProtein?.id === protein?.id
      );
    });

    return {
      isValid: !proteinAlreadyUsed && validation.isValid,
      errors: proteinAlreadyUsed
        ? [...validation.errors, RecipeValidationError.PROTEIN_ALREADY_USED]
        : validation.errors,
    };
  }

  static async list(): Promise<ValidatedRecipe[]> {
    const recipes = await getRepository(Recipe).find({
      relations: ["ingredients"],
    });

    const validatedRecipes = await Promise.all(
      recipes.map(async (recipe) => {
        const validation = await this.validate(recipe);
        return {
          ...recipe,
          validation,
        };
      })
    );

    return validatedRecipes;
  }

  static async create(recipe: Recipe): Promise<Recipe> {
    if (recipe.ingredients) {
      const ingredients = await getRepository(Ingredient).find({
        where: { id: In(recipe.ingredients) },
      });
      recipe.ingredients = ingredients;
    }

    const newRecipe = await getRepository(Recipe).save(recipe);
    return newRecipe;
  }

  static async update(recipe: Recipe): Promise<Recipe> {
    const updatedRecipe = await getRepository(Recipe).save(recipe);
    return updatedRecipe;
  }

  static async delete(id: number): Promise<void> {
    await getRepository(Recipe).delete(id);
  }
}
