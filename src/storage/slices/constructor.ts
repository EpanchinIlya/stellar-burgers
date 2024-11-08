import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CONSTRUCTOR_SLICE_NAME, FEEDS_SLICE_NAME } from './sliceNames';
import {
  TBun,
  TConstructorIngredient,
  TConstructorItems,
  TIngredient,
  TOrder
} from '@utils-types';
import { fetchFeeds } from '../thunk/feeds';
import { fetchorderBurgerApi } from '../thunk/constructor';

const baseConstructorItems: TConstructorItems = {
  bun: null,
  ingredients: []
};

const baseOrderModalData: TOrder = {
  _id: '',
  status: '',
  name: '',
  createdAt: '',
  updatedAt: '',
  number: 0,
  ingredients: []
};

export interface TConstructorState {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
}

const initialState: TConstructorState = {
  constructorItems: baseConstructorItems,
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const constructorSlice = createSlice({
  name: CONSTRUCTOR_SLICE_NAME,
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TBun>) => {
      state.constructorItems.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.ingredients.push(action.payload);
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },

    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const upper = state.constructorItems.ingredients[action.payload - 1];
      state.constructorItems.ingredients[action.payload - 1] =
        state.constructorItems.ingredients[action.payload];
      state.constructorItems.ingredients[action.payload] = upper;
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const lower = state.constructorItems.ingredients[action.payload + 1];
      state.constructorItems.ingredients[action.payload + 1] =
        state.constructorItems.ingredients[action.payload];
      state.constructorItems.ingredients[action.payload] = lower;
    },
    clearOrderModalData: (state, action: PayloadAction) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // orderBurgerApi - заказ булки
      .addCase(fetchorderBurgerApi.pending, (state) => {
        console.log('Запрашиваю orderBurgerApi');
        state.orderModalData = null;
        state.orderRequest = true;
        state.error = undefined;
      })
      .addCase(fetchorderBurgerApi.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;

        console.log('Ошибка  orderBurgerApi');
      })
      .addCase(fetchorderBurgerApi.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.orderModalData = action.payload.order;
          state.constructorItems.bun = null;
          state.constructorItems.ingredients = [];
          console.log('удачное  orderBurgerApi');
          console.log(action.payload.name);
        }
        state.orderRequest = false;
      });
  },
  selectors: {
    constructorItems: (state) => state.constructorItems,
    orderRequest: (state) => state.orderRequest,
    orderModalData: (state) => state.orderModalData,
    ingredients: (state) => state.constructorItems.ingredients,
    bunId: (state) => state.constructorItems.bun?._id
  }
});

export const constructorActions = constructorSlice.actions;
export const constructorSelectors = constructorSlice.selectors;
export const constructorRedusers = constructorSlice.reducer;
export default constructorSlice;
