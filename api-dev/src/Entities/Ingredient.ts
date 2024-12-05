import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IngredientCategory } from "../types";

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({
    type: "enum",
    enum: IngredientCategory,
  })
  category: IngredientCategory;
}
