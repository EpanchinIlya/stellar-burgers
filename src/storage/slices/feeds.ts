import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FEEDS_SLICE_NAME } from './sliceNames';
import { TOrder } from '@utils-types';
import { fetchFeeds } from '../thunk/feeds';

export interface ordersState {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: ordersState = {
  orders: [],
  total: 0,
  totalToday: 0
};

const feedsSlice = createSlice({
  name: FEEDS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        console.log('Запрашиваю feeds');
      })
      .addCase(fetchFeeds.rejected, (state) => {
        console.log('Ошибка');
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        console.log('Получил feeds');
      });
  },
  selectors: {
    orders: (state) => state.orders,
    total: (state) => state.total,
    totalToday: (state) => state.totalToday
  }
});

export const feedsActions = feedsSlice.actions;
export const feedsSelectors = feedsSlice.selectors;
export const feedsRedusers = feedsSlice.reducer;
export default feedsSlice;
