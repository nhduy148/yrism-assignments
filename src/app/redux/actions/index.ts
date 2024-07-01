import { createAsyncThunk } from '@reduxjs/toolkit';
import { SLICE_NAME } from 'app/constants';
import { getPositionResource as getPositionResourceAPI } from 'app/services';

export const getPositionResource = createAsyncThunk(`${SLICE_NAME.APP}/getPositionResource`, async (_, thunkApi) => {
  try {
    return await getPositionResourceAPI();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
