import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FEEDS_SLICE_NAME } from './sliceNames';
import { TOrder } from '@utils-types';
import { fetchFeeds } from '../thunk/feeds';

export interface ordersState {
  orders: TOrder[];
}

const initialState: ordersState = {
  orders: []
};

const feedsSlice = createSlice({
  name: FEEDS_SLICE_NAME,
  initialState,
  reducers: {
    // setSearchQuery: (state, action:PayloadAction<string>) => {
    // 	state.searchQuery = action.payload;
    //}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        console.log('Запрашиваю feeds');
        // state.isIngredientsLoading = true;
      })
      .addCase(fetchFeeds.rejected, (state) => {
        // state.isIngredientsLoading = true;
        console.log('Ошибка');
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        console.log('Получил feeds');
        // console.log(action.payload);
      });
  },
  selectors: {
    // isIngredientsLoading: (state) => state.isIngredientsLoading,
    // ingredients: (state) => state.data,
    feeds: (state) => state.orders
    // main: (state) => state.main,
    // sauce: (state) => state.sauce
  }
});

export const feedsActions = feedsSlice.actions;
export const feedsSelectors = feedsSlice.selectors;
export const feedsRedusers = feedsSlice.reducer;
export default feedsSlice;
