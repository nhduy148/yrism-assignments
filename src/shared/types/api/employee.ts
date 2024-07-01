import { Employee } from '../employee';
import { OrderQuery, PaginationParams, PaginationResponseData } from '../pagination';

export type GetEmployeeParams = PaginationParams & {
  search?: string;
  order?: keyof Employee | 'year';
  orderBy?: OrderQuery['orderBy'];
};

export type GetEmployeeResponse = PaginationResponseData<Employee>;

export type AddEmployeeResponse = Employee;
