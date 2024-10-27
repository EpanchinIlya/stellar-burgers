import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER_SLICE_NAME } from './sliceNames';
import { TUser } from '@utils-types';
import {
  fetchLoginUser,
  fetchRegisterUserApi,
  fetchUpdateUserApi
} from '../thunk/user';

import { setCookie } from '../../utils/cookie';
//import { setCookie } from '../utils/cookie';

export interface userState {
  user: TUser | null;
  isUserLoading: boolean;
  error: string | undefined;
}

const initialState: userState = {
  user: null,

  isUserLoading: false,
  error: undefined
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    // setSearchQuery: (state, action:PayloadAction<string>) => {
    // 	state.searchQuery = action.payload;
    //}
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(fetchLoginUser.pending, (state) => {
        console.log('Запрашиваю LoginUser');
        state.isUserLoading = true;
        state.error = undefined;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.error.message;
        console.log('Ошибка LoginUser ');

        localStorage.setItem('refreshToken', '');
        setCookie('accessToken', '');
        state.user = null;

        console.dir(action);
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.user = action.payload.user;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
        console.log('Удачное LoginUser');

        // Navigate replace to={from} />;
        // console.log(action.payload);
      })
      // Register
      .addCase(fetchRegisterUserApi.pending, (state) => {
        console.log('Запрашиваю registerUser');
        state.error = undefined;
        state.isUserLoading = true;
      })
      .addCase(fetchRegisterUserApi.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.error.message;
        console.log('Ошибка  registerUser ');

        console.dir(action);
      })
      .addCase(fetchRegisterUserApi.fulfilled, (state, action) => {
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
        state.user = action.payload.user;
        state.isUserLoading = false;
        console.log('удачное  registerUser');
        console.log(action.payload.refreshToken);
        console.log(action.payload.accessToken);
      })
      // updateUser
      .addCase(fetchUpdateUserApi.pending, (state) => {
        console.log('Запрашиваю updateUser');
        state.isUserLoading = true;
        state.error = undefined;
      })
      .addCase(fetchUpdateUserApi.rejected, (state, action) => {
        state.isUserLoading = false;
        state.error = action.error.message;

        console.log('Ошибка  updateUser ');
        console.dir(action);
      })
      .addCase(fetchUpdateUserApi.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.user = action.payload.user;
        }
        state.user = action.payload.user;
        state.isUserLoading = false;
        console.log('удачное  updateUser');
      });
  },
  selectors: {
    user: (state) => state.user,
    error: (state) => state.error,
    isUserLoading: (state) => state.isUserLoading
  }
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;
export const userRedusers = userSlice.reducer;
export default userSlice;
