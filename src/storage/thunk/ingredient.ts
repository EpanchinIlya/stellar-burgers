import { createAsyncThunk } from '@reduxjs/toolkit';

import { INGREDIENT_SLICE_NAME } from '../slices/sliceNames';
import { getIngredientsApi } from '@api';

export const fetchIngredients = createAsyncThunk(
  `${INGREDIENT_SLICE_NAME}/fetchIngredients`,
  async () => {
    const data = await getIngredientsApi();
    //return adaptCardsToClient(data.results)
    return data;
  }
);

//console.dir(fetchCards);
