import type { AppDispatch, RootState } from 'app/redux/store';
import isEqual from 'react-fast-compare';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';

export function useSelector<T>(selector: (state: RootState) => T, equalityFn = isEqual): T {
  return useReduxSelector<RootState, T>(selector, equalityFn);
}

export const useDispatch = () => useReduxDispatch<AppDispatch>();
