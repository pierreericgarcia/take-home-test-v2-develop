import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { Recipe } from "../Types/Recipe";
import { RecipeRow } from "./RecipeRow";

export function RecipesTable({ recipes }: { recipes: Recipe[] }): JSX.Element {
  return (
    <Box className="tableContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>My recipes</TableCell>
              <TableCell align="right">Time to cook</TableCell>
              <TableCell align="right">Number of people</TableCell>
              <TableCell align="right">Ingredients</TableCell>
              <TableCell align="right">Total price</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipe) => (
              <RecipeRow recipe={recipe} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
