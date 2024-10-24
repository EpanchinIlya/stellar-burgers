import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchIngredients } from '../thunk/ingredient';
import { INGREDIENT_SLICE_NAME } from './sliceNames';
import { TIngredient } from '@utils-types';

export interface ingredientState {
  isIngredientsLoading: Boolean;
  data: TIngredient[];
}

const initialState: ingredientState = {
  isIngredientsLoading: true,
  data: []
};

const ingredientSlice = createSlice({
  name: INGREDIENT_SLICE_NAME,
  initialState,
  reducers: {
    // setSearchQuery: (state, action:PayloadAction<string>) => {
    // 	state.searchQuery = action.payload;
    //}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        console.log('Запрашиваю');
        state.isIngredientsLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isIngredientsLoading = true;
        console.log('Ошибка');
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isIngredientsLoading = false;
        console.log('Получил');
        console.log(action.payload);
      });
  },
  selectors: {
    isIngredientsLoading: (state) => state.isIngredientsLoading,
    ingredients: (state) => state.data
  }
});

export const ingredientActions = ingredientSlice.actions;
export const ingredientSelectors = ingredientSlice.selectors;
export const ingredientRedusers = ingredientSlice.reducer;
export default ingredientSlice;
