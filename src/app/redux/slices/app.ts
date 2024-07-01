import { createSlice } from '@reduxjs/toolkit';
import { SLICE_NAME } from 'app/constants';
import { PositionResource } from 'shared/types';
import { getPositionResource } from '../actions';

interface IAppState {
  positionResources: PositionResource[];
}

const initialState: IAppState = {
  positionResources: [],
};

const appSlice = createSlice({
  name: SLICE_NAME.APP,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPositionResource.fulfilled, (state, action) => {
      state.positionResources = action.payload.data?.data ?? [];
    });
  },
});

export const appActions = {
  ...appSlice.actions,
  getPositionResource,
};
export const appReducer = appSlice.reducer;
