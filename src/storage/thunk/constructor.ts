import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../slices/sliceNames';
import { orderBurgerApi } from '@api';

export const fetchorderBurgerApi = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchorderBurgerApi`,
  async (data: string[]) => {
    const newOrderResponse = await orderBurgerApi(data);
    return newOrderResponse;
  }
);
