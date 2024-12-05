import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";
import { Recipe, RecipeValidation } from "../../Types/Recipe";

interface RecipeCreateType {
  name: string;
  timeToCook: number;
  numberOfPeople: number;
  ingredients: number[];
}
export const useMutationRecipeCreate = (): UseMutationResult<
  Recipe,
  unknown,
  RecipeCreateType
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.createIngredient],
    async ({
      name,
      timeToCook,
      numberOfPeople,
      ingredients,
    }: RecipeCreateType) => {
      return await axios.post(`/recipe/create`, {
        name,
        timeToCook,
        numberOfPeople,
        ingredients,
      });
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listRecipe);
      },
    }
  );
};

export const useMutationRecipeValidate = (): UseMutationResult<
  RecipeValidation,
  unknown,
  RecipeCreateType
> => {
  return useMutation(
    [Requests.validateRecipe],
    async ({
      name,
      timeToCook,
      numberOfPeople,
      ingredients,
    }: RecipeCreateType) => {
      const { data } = await axios.post<RecipeValidation>("/recipe/validate", {
        name,
        timeToCook,
        numberOfPeople,
        ingredients,
      });
      return data;
    }
  );
};

export const useMutationRecipeDelete = (): UseMutationResult<
  any,
  unknown,
  number
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.deleteRecipe],
    async (id: number) => {
      return await axios.delete(`/recipe/delete/${id}`);
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listRecipe);
      },
    }
  );
};
