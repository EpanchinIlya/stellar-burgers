import { createAsyncThunk } from '@reduxjs/toolkit';

import { INGREDIENT_SLICE_NAME } from '../slices/sliceNames';
//import { getIngredientsApi } from '@api';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

interface FetchIngredientsResponse {
  ingredients: TIngredient[];
}

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  `${INGREDIENT_SLICE_NAME}/fetchIngredients`,
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

export const apis = {
  fetchIngredients
};
