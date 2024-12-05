import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import axios from "../../Utils/axios";
import { Requests } from "../QueriesAndMutationList";
import { Ingredient } from "../../Types/Ingredient";

export const useMutationIngredientCreate = (): UseMutationResult<
  Ingredient,
  unknown,
  Omit<Ingredient, "id">
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.createIngredient],
    async ({ name, price, category }: Omit<Ingredient, "id">) => {
      return await axios.post(`/ingredient/create`, {
        name,
        price,
        category,
      });
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listRecipe);
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    }
  );
};

export const useMutationIngredientDelete = (): UseMutationResult<
  any,
  unknown,
  number
> => {
  const clientQuery = useQueryClient();

  return useMutation(
    [Requests.deleteIngredient],
    async (id: number) => {
      return await axios.delete(`/ingredient/delete/${id}`);
    },
    {
      onSuccess: () => {
        clientQuery.invalidateQueries(Requests.listIngredient);
      },
    }
  );
};
