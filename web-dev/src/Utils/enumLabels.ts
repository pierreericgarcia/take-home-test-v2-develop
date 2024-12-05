import { IngredientCategory } from "../Types/Ingredient";
import { RecipeValidationError } from "../Types/Recipe";

export const ingredientCategoryLabels: Record<IngredientCategory, string> = {
  [IngredientCategory.VEGETABLE]: "Vegetable",
  [IngredientCategory.PROTEIN]: "Protein",
  [IngredientCategory.STARCH]: "Starch",
};

export const recipeValidationErrorLabels: Record<
  RecipeValidationError,
  string
> = {
  [RecipeValidationError.TOO_MANY_PROTEINS]: "Too many proteins",
  [RecipeValidationError.TOO_MANY_STARCHES]: "Too many starches",
  [RecipeValidationError.NO_STARCHES]: "No starches",
  [RecipeValidationError.PROTEIN_ALREADY_USED]: "Protein already used",
};
