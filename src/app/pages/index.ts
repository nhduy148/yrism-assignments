import React from 'react';

export * from './404';
export const Homepage = React.lazy(() => import('./home'));
export const CreateEmployeePage = React.lazy(() => import('./create-employee'));
export const EmployeeDetailPage = React.lazy(() => import('./employee-detail'));
