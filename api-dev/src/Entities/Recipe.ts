import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ingredient } from "./Ingredient";
import {
  IngredientCategory,
  RecipeValidation,
  RecipeValidationError,
} from "../types";

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  timeToCook: number;

  @Column()
  numberOfPeople: number;

  @ManyToMany(() => Ingredient)
  @JoinTable()
  ingredients: Ingredient[];

  validate(): RecipeValidation {
    const errors: RecipeValidationError[] = [];

    const proteins = this.ingredients.filter(
      (i) => i.category === IngredientCategory.PROTEIN
    );
    const starches = this.ingredients.filter(
      (i) => i.category === IngredientCategory.STARCH
    );

    if (proteins.length > 1) {
      errors.push(RecipeValidationError.TOO_MANY_PROTEINS);
    }

    if (starches.length > 1) {
      errors.push(RecipeValidationError.TOO_MANY_STARCHES);
    }

    if (starches.length === 0) {
      errors.push(RecipeValidationError.NO_STARCHES);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
