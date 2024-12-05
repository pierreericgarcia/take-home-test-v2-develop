export enum IngredientCategory {
  VEGETABLE = "vegetable",
  PROTEIN = "protein",
  STARCH = "starch",
}

export interface Ingredient {
  id: number;
  name: string;
  price: number;
  category: IngredientCategory;
}
