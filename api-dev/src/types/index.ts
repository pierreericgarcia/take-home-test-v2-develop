import { Ingredient } from "../Entities/Ingredient";
import { Recipe } from "../Entities/Recipe";

export enum IngredientCategory {
  VEGETABLE = "vegetable",
  PROTEIN = "protein",
  STARCH = "starch",
}

export enum RecipeValidationError {
  TOO_MANY_PROTEINS = "too_many_proteins",
  TOO_MANY_STARCHES = "too_many_starches",
  NO_STARCHES = "no_starches",
  PROTEIN_ALREADY_USED = "protein_already_used",
}

export interface RecipeValidation {
  isValid: boolean;
  errors: RecipeValidationError[];
}

export type ValidatedRecipe = Omit<Recipe, "validate"> & {
  validation: RecipeValidation;
};
