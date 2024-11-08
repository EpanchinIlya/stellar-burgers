import { createAsyncThunk } from '@reduxjs/toolkit';

import { FEEDS_SLICE_NAME } from '../slices/sliceNames';
import { getFeedsApi } from '../../utils/burger-api';
//import { getFeedsApi } from '@api';

export const fetchFeeds = createAsyncThunk(
  `${FEEDS_SLICE_NAME}/fetchFeeds`,
  async () => {
    const data = await getFeedsApi();
    return data;
  }
);
