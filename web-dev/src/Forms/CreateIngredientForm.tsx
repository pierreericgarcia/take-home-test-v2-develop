import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { CardCustom } from "../Components/CardCustom";
import { useMutationIngredientCreate } from "../Hooks/Mutation/IngredientsMutation";
import { IngredientCategory } from "../Types/Ingredient";

export function CreateIngredientForm(): JSX.Element {
  const { mutateAsync: createIngredient } = useMutationIngredientCreate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<IngredientCategory>(
    IngredientCategory.VEGETABLE
  );

  const resetFields = () => {
    setName("");
    setPrice(0);
    setCategory(IngredientCategory.VEGETABLE);
  };

  const handlerSubmitNewIngredient = async () => {
    if (
      name === undefined ||
      name === "" ||
      price === undefined ||
      category === undefined
    ) {
      alert("Please fill all the fields");
      return;
    }
    await createIngredient({
      name,
      price,
      category,
    });

    resetFields();
  };

  return (
    <div id="create-recipes-form">
      <Box
        display="flex"
        justifyContent="space-between"
        className="MarginTop16Px"
      >
        <CardCustom isSmall>
          <h2>New ingredient</h2>
          <FormControl fullWidth margin="normal">
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name-recipe"
              label="Name"
              variant="outlined"
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-recipe-label">Category</InputLabel>
            <Select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as IngredientCategory)
              }
              id="category-recipe"
              labelId="category-recipe-label"
              variant="outlined"
              fullWidth
            >
              <MenuItem value={IngredientCategory.VEGETABLE}>
                Vegetable
              </MenuItem>
              <MenuItem value={IngredientCategory.PROTEIN}>Protein</MenuItem>
              <MenuItem value={IngredientCategory.STARCH}>Starch</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              value={price}
              onChange={(e) =>
                e.target.value ? setPrice(Number(e.target.value)) : setPrice(0)
              }
              id="price-recipe"
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
            />
            <span className="SmallTextExplanation">
              *Keep in mind that the price is for one person. Prices are
              multiplied by the number of people in the recipe.
            </span>
          </FormControl>

          <FormControl margin="normal">
            <Button onClick={handlerSubmitNewIngredient} variant="contained">
              Submit
            </Button>
          </FormControl>
        </CardCustom>
      </Box>
    </div>
  );
}
