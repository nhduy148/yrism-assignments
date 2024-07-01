export type PaginationParams = {
  pageNumber: number;
  pageSize: number;
};

export type BaseResponse<T = any> = {
  data?: T;
  success: boolean;
  message?: string;
  statusCode?: number;
};

export type PaginationResponseData<T> = PaginationResponse & {
  data: T[];
};

export type PaginationResponse = BaseResponse &
  PaginationParams & {
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
  };

export type OrderQuery = {
  order: string;
  orderBy: 'asc' | 'desc';
};
