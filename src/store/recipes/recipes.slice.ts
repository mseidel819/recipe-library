import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RecipeState {
  recipes: [];
}

const initialState: RecipeState = {
  recipes: [],
};

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRecipes } = recipesSlice.actions;

export default recipesSlice.reducer;
