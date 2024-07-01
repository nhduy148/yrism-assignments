import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from '../slices';

export const allReducer = combineReducers({
  app: appReducer,
});
