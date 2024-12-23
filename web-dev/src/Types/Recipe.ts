import { Ingredient } from "./Ingredient";

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

export interface Recipe {
  id: number;
  name: string;
  numberOfPeople: number;
  timeToCook: number;
  ingredients: Ingredient[];
  validation: RecipeValidation;
}
