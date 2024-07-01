import Api from 'app/networking/api';
import { AddEmployeeResponse, Employee, EmployeeSchema, GetEmployeeParams, GetEmployeeResponse } from 'shared/types';

export const getEmployees = (params: GetEmployeeParams) => Api.GET_EMPLOYEES<GetEmployeeResponse>(params);

export const addEmployee = (data: EmployeeSchema) =>
  Api.ADD_EMPLOYEE<AddEmployeeResponse>(data, { headers: { 'Content-type': 'multipart/form-data' } });

export const updateEmployee = (employeeId: string, data: EmployeeSchema) =>
  Api.UPDATE_EMPLOYEE<AddEmployeeResponse>(data, {
    urlParams: { employeeId: String(employeeId) },
    headers: { 'Content-type': 'multipart/form-data' },
  });

export const deleteEmployee = (employeeId: string) =>
  Api.DELETE_EMPLOYEE({}, { urlParams: { employeeId: String(employeeId) } });

export const getEmployeeDetail = (employeeId: string) =>
  Api.GET_EMPLOYEE_DETAIL<Employee>(
    {},
    {
      urlParams: { employeeId: String(employeeId) },
    },
  );
