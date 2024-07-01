import { Stack } from '@mui/material';
import { BootstrapData } from 'app/components';
import { RouterConfigs, RouterPageKey } from 'app/config';
import { Route, Routes } from 'react-router-dom';

const MainRoutes = () => {
  return (
    <BootstrapData>
      <Stack height={1} width={1} sx={{ overflowY: 'hidden' }}>
        <Routes>
          <Route
            path={RouterConfigs[RouterPageKey.Homepage].path}
            element={RouterConfigs[RouterPageKey.Homepage].element}
          />
          <Route
            path={RouterConfigs[RouterPageKey.CreateEmployee].path}
            element={RouterConfigs[RouterPageKey.CreateEmployee].element}
          />
          <Route
            path={RouterConfigs[RouterPageKey.EmployeeDetail].path}
            element={RouterConfigs[RouterPageKey.EmployeeDetail].element}
          />
        </Routes>
      </Stack>
    </BootstrapData>
  );
};

export default MainRoutes;
