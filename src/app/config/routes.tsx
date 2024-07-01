import { CreateEmployeePage, EmployeeDetailPage, Homepage } from 'app/pages';

interface IRoute {
  path: string;
  label: string;
  element: React.ReactNode;
  icon?: React.ReactNode;
}

export enum RouterPageKey {
  Homepage = 'Homepage',
  CreateEmployee = 'CreateEmployee',
  EmployeeDetail = 'EmployeeDetail',
}

export const RouterConfigs: Record<RouterPageKey, IRoute> = {
  [RouterPageKey.Homepage]: {
    path: '/',
    label: 'Homepage',
    element: <Homepage />,
  },
  [RouterPageKey.CreateEmployee]: {
    path: '/create',
    label: 'Create Employee',
    element: <CreateEmployeePage />,
  },
  [RouterPageKey.EmployeeDetail]: {
    path: '/employee/:id',
    label: 'Employee Detail',
    element: <EmployeeDetailPage />,
  },
};
