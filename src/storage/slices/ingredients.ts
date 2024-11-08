import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchIngredients } from '../thunk/ingredient';
import { INGREDIENT_SLICE_NAME } from './sliceNames';
import { TIngredient } from '@utils-types';

export interface ingredientState {
  isIngredientsLoading: Boolean;
  bun: TIngredient[];
  main: TIngredient[];
  sauce: TIngredient[];

  data: TIngredient[];
}

export const initialState: ingredientState = {
  isIngredientsLoading: true,
  bun: [],
  main: [],
  sauce: [],
  data: []
};

const ingredientSlice = createSlice({
  name: INGREDIENT_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isIngredientsLoading = true;
        console.log('Ошибка');
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        const allData = action.payload;
        const bun: TIngredient[] = [];
        const main: TIngredient[] = [];
        const sauce: TIngredient[] = [];
        console.dir(allData);
        allData.forEach((item) => {
          switch (item.type) {
            case 'bun':
              bun.push(item);
              break;
            case 'main':
              main.push(item);
              break;
            case 'sauce':
              sauce.push(item);
              break;
            default:
              console.log('Invalid ingredient');
          }
        });

        state.bun = bun;
        state.main = main;
        state.sauce = sauce;
        state.data = allData;

        state.isIngredientsLoading = false;
      });
  },
  selectors: {
    isIngredientsLoading: (state) => state.isIngredientsLoading,
    ingredients: (state) => state.data,
    bun: (state) => state.bun,
    main: (state) => state.main,
    sauce: (state) => state.sauce
  }
});

export const ingredientActions = ingredientSlice.actions;
export const ingredientSelectors = ingredientSlice.selectors;
export const ingredientRedusers = ingredientSlice.reducer;
export default ingredientSlice;
