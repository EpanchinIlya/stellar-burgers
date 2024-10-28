import { createAsyncThunk } from '@reduxjs/toolkit';

import { USER_SLICE_NAME } from '../slices/sliceNames';
import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';

export const fetchLoginUser = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchLoginUser`,
  async (user: TLoginData) => {
    const data = await loginUserApi(user);
    return data;
  }
);

export const fetchRegisterUserApi = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchRegisterUserApi`,
  async (regiterData: TRegisterData) => {
    const data = await registerUserApi(regiterData);
    return data;
  }
);

export const fetchUpdateUserApi = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchUpdateUserApi`,
  async (user: Partial<TRegisterData>) => {
    const data = await updateUserApi(user);
    return data;
  }
);

export const fetchLogoutApi = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchLogoutApi`,
  async () => {
    const data = await logoutApi();
    return data;
  }
);

export const fetchGetUserApi = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchGetUserApi`,
  async () => {
    const data = await getUserApi();
    return data;
  }
);

export const fetchGetOrdersApi = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchGetOrdersApi`,
  async () => {
    const data = await getOrdersApi();
    return data;
  }
);
