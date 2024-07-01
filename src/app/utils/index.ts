import { isEmpty, isNil } from 'lodash';

export type EmptyObject = {
  [K in string | number]: never;
};

export const isNilOrEmpty = (value: any): value is null | undefined | '' | EmptyObject =>
  isNil(value) || isEmpty(value);

export * from './datetime';
export * from './numer';
