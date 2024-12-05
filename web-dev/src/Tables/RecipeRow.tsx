import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, styled, Tooltip } from "@mui/material";
import { Recipe } from "../Types/Recipe";
import { Ingredient } from "../Types/Ingredient";
import { useMutationRecipeDelete } from "../Hooks/Mutation/RecipeMutation";
import { recipeValidationErrorLabels } from "../Utils/enumLabels";

const StyledTableRow = styled(TableRow)<{ isValid?: boolean }>(
  ({ theme, isValid = true }) => ({
    backgroundColor: isValid ? "inherit" : theme.palette.error.light,
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  })
);

export function RecipeRow({ recipe }: { recipe: Recipe }): JSX.Element {
  const { mutateAsync: deleteRecipe } = useMutationRecipeDelete();

  const handlerButtonDelete = async (recipe: Recipe) => {
    await deleteRecipe(recipe.id);
  };

  const computePriceByIngredient = (ingredients: Ingredient[]) => {
    return ingredients.reduce((acc, ingredient) => {
      return acc + ingredient.price;
    }, 0);
  };

  const errorMessages = recipe.validation.errors.map((error) => (
    <div key={error}>{recipeValidationErrorLabels[error]}</div>
  ));

  const tableRow = (
    <StyledTableRow
      isValid={recipe.validation.isValid}
      key={`recipe_name${recipe.id}`}
    >
      <TableCell component="th" scope="row">
        {recipe.name}
      </TableCell>
      <TableCell align="right">{recipe.timeToCook}</TableCell>
      <TableCell align="right">{recipe.numberOfPeople}</TableCell>
      <TableCell align="right">
        {recipe.ingredients.map((ingredient, index) => {
          return <p key={`ing_name${index}`}>{ingredient.name}</p>;
        })}
      </TableCell>
      <TableCell align="right">
        {computePriceByIngredient(recipe.ingredients) * recipe.numberOfPeople}€
      </TableCell>
      <TableCell align="right">
        <Button onClick={() => handlerButtonDelete(recipe)}>DELETE</Button>
      </TableCell>
    </StyledTableRow>
  );

  return recipe.validation.isValid ? (
    tableRow
  ) : (
    <Tooltip title={errorMessages} arrow key={`tooltip_${recipe.id}`}>
      {tableRow}
    </Tooltip>
  );
}
