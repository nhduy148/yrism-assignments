import { Search } from '@mui/icons-material';
import { Box, Button, CircularProgress, Container, Grid, Paper, Stack, TextField } from '@mui/material';
import { EmployeeCard } from 'app/components';
import { RouterPageKey } from 'app/config';
import { DEFAULT_PAGINATION_DATA, DEFAULT_PAGINATION_PARAMS } from 'app/constants';
import { useNavigate } from 'app/hooks';
import { getEmployees } from 'app/services';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Employee, GetEmployeeParams } from 'shared/types';

const HomePage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION_DATA);
  const [search, setSearch] = useState<GetEmployeeParams['search']>('');
  const [orderQuery] = useState<Pick<GetEmployeeParams, 'order' | 'orderBy'>>({
    order: 'year',
    orderBy: 'desc',
  });
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const loadEmployees = async (params: GetEmployeeParams) => {
    setLoading(true);
    try {
      const response = await getEmployees(params);
      setEmployees((prev) => {
        if (params.pageNumber === 1) return response.data.data;
        return [...prev, ...response.data.data];
      });
      // @ts-expect-error
      setPagination(response.data?.pagination ?? DEFAULT_PAGINATION_DATA);
    } catch (error) {
      enqueueSnackbar('Failed to fetch employees', { variant: 'error' });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadEmployees({ search, ...DEFAULT_PAGINATION_PARAMS, ...orderQuery });
  };

  React.useEffect(() => {
    loadEmployees({ ...DEFAULT_PAGINATION_PARAMS, ...orderQuery });
  }, []);

  useEffect(() => {
    if (inView && pagination.hasNextPage && !loading) {
      loadEmployees({ ...DEFAULT_PAGINATION_PARAMS, ...orderQuery, pageNumber: pagination.pageNumber + 1, search });
    }
  }, [inView, loading, pagination, search]);

  const handleDelete = (id: Employee['id']) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleEdit = (id: Employee['id']) => {
    navigate(RouterPageKey.EmployeeDetail, { params: { id: String(id) } });
  };

  const handleAddEmployee = () => {
    navigate(RouterPageKey.CreateEmployee);
  };

  const renderEmployee = (employee: Employee) => {
    return (
      <Grid item key={employee.id} xs={12} sm={6} md={4} xl={3}>
        <EmployeeCard employee={employee} onDelete={handleDelete} onClick={handleEdit} />
      </Grid>
    );
  };

  return (
    <Container sx={{ height: 1, p: 1, px: { xs: 0, md: 2 } }}>
      <Paper component={Stack} spacing={1} p={2} height={1}>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          mx={-1}
        >
          <Stack direction="row" p={1} spacing={1} width={{ xs: 1, md: 'auto' }}>
            <TextField
              sx={{ minWidth: 280 }}
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
            />
            <Button
              sx={{ minWidth: 120 }}
              endIcon={<Search />}
              disableElevation
              variant="contained"
              color="primary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Stack>

          <Box p={1} width={{ xs: 1, md: 'auto' }}>
            <Button disableElevation fullWidth variant="contained" color="primary" onClick={handleAddEmployee}>
              Add Employee
            </Button>
          </Box>
        </Box>
        <Box flexGrow={1} overflow="auto">
          <Grid container spacing={2}>
            {employees.map(renderEmployee)}
          </Grid>
          <Box ref={ref} sx={{ textAlign: 'center', my: 2 }}>
            {loading && <CircularProgress />}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default React.memo(HomePage);
