import { configureStore } from '@reduxjs/toolkit';
import { allReducer } from './allReducer';
/**
 * Use this instead storage of reduxPersist
 *
 */

const middleware: any = [];

const storeConfig = () => {
  const store = configureStore({
    reducer: allReducer,
    middleware: (getDefaultMiddleware) => {
      const value = getDefaultMiddleware({ serializableCheck: false }).concat(middleware);
      return value;
    },
  });
  return store;
};

export type RootState = ReturnType<typeof allReducer>;

export type AppDispatch = typeof store.dispatch;

export const store = storeConfig();
