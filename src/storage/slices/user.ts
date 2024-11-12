import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER_SLICE_NAME } from './sliceNames';
import { TOrder, TUser } from '@utils-types';
import {
  fetchGetOrdersApi,
  fetchGetUserApi,
  fetchLoginUser,
  fetchLogoutApi,
  fetchRegisterUserApi,
  fetchUpdateUserApi
} from '../thunk/user';

import { deleteCookie, setCookie } from '../../utils/cookie';

export interface userState {
  user: TUser | null;
  isUserLoading: boolean;
  error: string | undefined;
  userOrders: TOrder[];
}

const initialState: userState = {
  user: null,
  userOrders: [],
  isUserLoading: false,
  error: undefined
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    clearUserOrders: (state, action: PayloadAction) => {
      state.userOrders = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(fetchLoginUser.pending, (state) => {
        state.isUserLoading = true;
        state.error = undefined;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.error.message;
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        state.user = null;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.user = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      // Register
      .addCase(fetchRegisterUserApi.pending, (state) => {
        state.error = undefined;
        state.isUserLoading = true;
      })
      .addCase(fetchRegisterUserApi.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRegisterUserApi.fulfilled, (state, action) => {
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
        state.user = action.payload.user;
        state.isUserLoading = false;
      })
      // updateUser
      .addCase(fetchUpdateUserApi.pending, (state) => {
        state.isUserLoading = true;
        state.error = undefined;
      })
      .addCase(fetchUpdateUserApi.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUpdateUserApi.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.user;
        }
        state.user = action.payload.user;
        state.isUserLoading = false;
      })
      // logout
      .addCase(fetchLogoutApi.pending, (state) => {
        state.isUserLoading = true;
        state.error = undefined;
      })
      .addCase(fetchLogoutApi.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLogoutApi.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = null;
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
        }
        state.isUserLoading = false;
      })
      // getUser
      .addCase(fetchGetUserApi.pending, (state) => {
        state.isUserLoading = true;
        state.user = null;
        state.error = undefined;
      })
      .addCase(fetchGetUserApi.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGetUserApi.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.user;
        }
        state.isUserLoading = false;
      })
      // getOrder
      .addCase(fetchGetOrdersApi.pending, (state) => {
        state.isUserLoading = true;
        state.error = undefined;
      })
      .addCase(fetchGetOrdersApi.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGetOrdersApi.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.isUserLoading = false;
      });
  },
  selectors: {
    user: (state) => state.user,
    error: (state) => state.error,
    isUserLoading: (state) => state.isUserLoading,
    userOrders: (state) => state.userOrders
  }
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;
export const userRedusers = userSlice.reducer;
export default userSlice;
