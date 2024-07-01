import { PaginationParams, PaginationResponse } from 'shared/types';

export const DEFAULT_ROW_PER_PAGE = 3;
export const DEFAULT_PAGINATION_PARAMS: PaginationParams = { pageNumber: 1, pageSize: DEFAULT_ROW_PER_PAGE };
export const DEFAULT_PAGINATION_DATA: Omit<PaginationResponse, 'success'> = {
  hasNextPage: false,
  totalItems: 0,
  totalPages: 0,
  pageNumber: 1,
  pageSize: DEFAULT_ROW_PER_PAGE,
};
export const ROW_PER_PAGE_OPTIONS = [10, 20, 30, 50, 100, 200];
