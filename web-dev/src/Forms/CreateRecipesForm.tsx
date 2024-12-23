import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { CardCustom } from "../Components/CardCustom";
import { Loader } from "../Components/Loader";
import {
  useMutationRecipeCreate,
  useMutationRecipeValidate,
} from "../Hooks/Mutation/RecipeMutation";
import { useQueryIngredientList } from "../Hooks/Query/IngredientQuery";
import { ErrorPage } from "../Pages/ErrorPage";
import { Ingredient } from "../Types/Ingredient";
import { OptionsMultiSelectType } from "../Types/OptionsMultiSelect";
import { recipeValidationErrorLabels } from "../Utils/enumLabels";
import ErrorsModal from "../Modals/ErrorsModal";

export function CreateRecipesForm(): JSX.Element {
  const [name, setName] = useState("");
  const [timeToCook, setTimeToCook] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
  const [selectedIngredients, setSelectedIngredients] = useState<
    OptionsMultiSelectType[]
  >([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const { mutateAsync: createRecipe } = useMutationRecipeCreate();
  const { mutateAsync: validateRecipe } = useMutationRecipeValidate();
  const { data: ingredients, status, isLoading } = useQueryIngredientList();

  const resetFields = () => {
    setName("");
    setTimeToCook(0);
    setNumberOfPeople(0);
    setSelectedIngredients([]);
  };

  const handlerErrorModalClose = () => {
    setIsErrorModalOpen(false);
    setErrors([]);
  };

  const handlerSubmitNewRecipe = async () => {
    const validation = await validateRecipe({
      name,
      timeToCook,
      numberOfPeople,
      ingredients: selectedIngredients.map((e) => e.id),
    });

    if (!validation.isValid) {
      setErrors(validation.errors.map((e) => recipeValidationErrorLabels[e]));
      setIsErrorModalOpen(true);
      return;
    }

    if (!name || !timeToCook || !numberOfPeople || !selectedIngredients) {
      setErrors(["Please fill all the fields"]);
      setIsErrorModalOpen(true);
      return;
    }

    await createRecipe({
      name,
      timeToCook,
      numberOfPeople,
      ingredients: selectedIngredients.map((e) => e.id),
    });

    resetFields();
  };

  if (status === "error") {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ErrorsModal
        errors={errors}
        isOpen={isErrorModalOpen}
        onClose={handlerErrorModalClose}
      />
      <div id="create-recipes-form">
        <Box
          display="flex"
          justifyContent="space-between"
          className="MarginTop16Px"
        >
          <CardCustom isSmall>
            <h2>New recipe</h2>
            <FormControl fullWidth margin="normal">
              <TextField
                id="name-recipe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name of the recipe"
                variant="outlined"
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              {/* on peut mettre plusieurs fois le même ingrédient dans le formulaire mais après ça l'enregistre qu'une fois*/}
              <Autocomplete
                onChange={(_e, value: OptionsMultiSelectType[]) => {
                  setSelectedIngredients(value);
                }}
                value={selectedIngredients}
                multiple
                id="combo-box-demo"
                options={ingredients.map((e: Ingredient) => {
                  return { label: e.name, id: e.id };
                })}
                renderInput={(params: any) => (
                  <TextField {...params} label="Ingredients" />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                value={timeToCook}
                onChange={(e) =>
                  e.target.value
                    ? setTimeToCook(Number(e.target.value))
                    : setTimeToCook(0)
                }
                id="name-recipe"
                label="Time to cook"
                variant="outlined"
                type="number"
                fullWidth
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <TextField
                value={numberOfPeople}
                onChange={(e) =>
                  e.target.value
                    ? setNumberOfPeople(Number(e.target.value))
                    : setNumberOfPeople(0)
                }
                id="name-recipe"
                label="Number of people"
                variant="outlined"
                type="number"
                fullWidth
              />
            </FormControl>
            <FormControl margin="normal">
              <Button onClick={handlerSubmitNewRecipe} variant="contained">
                Submit
              </Button>
            </FormControl>
          </CardCustom>
        </Box>
      </div>
    </>
  );
}
