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

// export type TBun = {
//   name: string;
//   price: number;
//   image: string;
// };

// export type TConstructorItems = {
//   bun: TBun;
//   ingredients: TIngredient[];
// };

const baseConstructorItems: TConstructorItems = {
  bun: {
    name: '',
    price: 0,
    image: '',
    _id: ''
  },
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
  orderModalData: TOrder;
}

const initialState: TConstructorState = {
  constructorItems: baseConstructorItems,
  orderRequest: false,
  orderModalData: baseOrderModalData
};

const constructorSlice = createSlice({
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
      const x = state.constructorItems.ingredients;
      console.dir(x);
      console.dir(action.payload);
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter((item) => {
          item.id !== action.payload.id;
        });
    },

    moveUpIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {},
    moveDownIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {}
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(fetchFeeds.pending, (state) => {
  //         console.log('Запрашиваю feeds');
  //         // state.isIngredientsLoading = true;
  //       })
  //       .addCase(fetchFeeds.rejected, (state) => {
  //         // state.isIngredientsLoading = true;
  //         console.log('Ошибка');
  //       })
  //       .addCase(fetchFeeds.fulfilled, (state, action) => {
  //         state.orders = action.payload.orders;
  //         state.total = action.payload.total;
  //         state.totalToday = action.payload.totalToday;
  //         console.log('Получил feeds');
  //         // console.log(action.payload);
  //       });
  //   },
  selectors: {
    constructorItems: (state) => state.constructorItems,
    orderRequest: (state) => state.orderRequest,
    orderModalData: (state) => state.orderModalData

    // isIngredientsLoading: (state) => state.isIngredientsLoading,
    // ingredients: (state) => state.data,
    // orders: (state) => state.orders,
    // total: (state) => state.total,
    // totalToday: (state) => state.totalToday
    // main: (state) => state.main,
    // sauce: (state) => state.sauce
  }
});

export const constructorActions = constructorSlice.actions;
export const constructorSelectors = constructorSlice.selectors;
export const constructorRedusers = constructorSlice.reducer;
export default constructorSlice;
