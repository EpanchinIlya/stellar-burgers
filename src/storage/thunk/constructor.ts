import { createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../slices/sliceNames';
import { orderBurgerApi } from '../../utils/burger-api';

export const fetchorderBurgerApi = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchorderBurgerApi`,
  async (data: string[]) => {
    console.dir(data);
    const newOrderResponse = await orderBurgerApi(data);
    return newOrderResponse;
  }
);
