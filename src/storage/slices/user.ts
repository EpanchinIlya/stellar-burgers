import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER_SLICE_NAME } from './sliceNames';
import { TUser } from '@utils-types';

export interface userState {
  user: TUser | null;
}

const initialState: userState = {
  user: null
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchFeeds.pending, (state) => {
    //     //console.log('Запрашиваю feeds');
    //     // state.isIngredientsLoading = true;
    //   })
    //   .addCase(fetchFeeds.rejected, (state) => {
    //     // state.isIngredientsLoading = true;
    //    // console.log('Ошибка');
    //   })
    //   .addCase(fetchFeeds.fulfilled, (state, action) => {
    //     // state.orders = action.payload.orders;
    //     // state.total = action.payload.total;
    //     // state.totalToday = action.payload.totalToday;
    //     // console.log('Получил feeds');
    //     // console.log(action.payload);
    //   });
  },
  selectors: {
    user: (state) => state.user
  }
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;
export const userRedusers = userSlice.reducer;
export default userSlice;
