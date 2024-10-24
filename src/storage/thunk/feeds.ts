import { createAsyncThunk } from '@reduxjs/toolkit';

import { FEEDS_SLICE_NAME } from '../slices/sliceNames';
import { getFeedsApi } from '@api';

export const fetchFeeds = createAsyncThunk(
  `${FEEDS_SLICE_NAME}/fetchFeeds`,
  async () => {
    const data = await getFeedsApi();
    //return adaptCardsToClient(data.results)
    return data;
  }
);

//console.dir(fetchCards);
