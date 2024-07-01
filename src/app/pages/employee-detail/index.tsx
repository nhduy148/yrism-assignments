import { yupResolver } from '@hookform/resolvers/yup';
import { AppBar, Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { showConfirmDialog } from 'app/components';
import { RouterPageKey } from 'app/config';
import { useNavigate } from 'app/hooks';
import { deleteEmployee, getEmployeeDetail, updateEmployee } from 'app/services';
import { employeeSchema } from 'app/validations';
import { isNil } from 'lodash-es';
import { useSnackbar } from 'notistack';
import React from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { EmployeeSchema } from 'shared/types';
import { EmployeeForm } from '../shared/employee-form';

const EmployeeDetailPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const navigate = useNavigate();
  const formMethod = useForm<EmployeeSchema>({
    resolver: yupResolver(employeeSchema),
  });
  const params = useParams();

  React.useEffect(() => {
    if (isNil(params?.id)) {
      enqueueSnackbar('Employee not found', { variant: 'error' });
    } else {
      (async () => {
        setIsLoading(true);
        try {
          const response = await getEmployeeDetail(String(params.id));
          formMethod.reset(response.data);
        } catch (error) {
          enqueueSnackbar('Employee not found', { variant: 'error' });
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [params.id]);

  const onSubmit: SubmitHandler<EmployeeSchema> = async (data) => {
    if (isNil(params?.id)) {
      enqueueSnackbar('Employee not found', { variant: 'error' });
      return;
    }
    try {
      await updateEmployee(params.id, data);
      enqueueSnackbar('Employee created successfully', { variant: 'success' });
      navigate(RouterPageKey.Homepage);
    } catch (error: any) {
      enqueueSnackbar('Error while creating employee', { variant: 'error' });
    }
  };

  const showDeleteAlert = () => {
    showConfirmDialog({
      title: 'Delete Employee',
      message: 'Are you sure you want to delete this employee?',
      onConfirm: onDelete,
    });
  };

  const onDelete = async () => {
    if (isNil(params?.id)) {
      enqueueSnackbar('Employee not found', { variant: 'error' });
      return;
    }
    try {
      await deleteEmployee(params.id);
      enqueueSnackbar('Employee deleted successfully', { variant: 'success' });
      navigate(RouterPageKey.Homepage);
    } catch (error) {
      enqueueSnackbar('Error while deleting employee', { variant: 'error' });
    }
  };

  const onError: SubmitErrorHandler<EmployeeSchema> = (errors) => {
    console.log('Errors:', errors);
    enqueueSnackbar('Failed to submit form', { variant: 'error' });
  };

  if (isLoading) {
    return (
      <Stack height={1} justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  if (notFound) {
    return (
      <Stack height={1} justifyContent="center" alignItems="center">
        <Typography variant="h4">Employee not found</Typography>
      </Stack>
    );
  }

  return (
    <Stack height={1} overflow="auto">
      <AppBar position="sticky" sx={{ py: 2 }}>
        <Container>
          <Typography variant="h4">Edit Employee Profile</Typography>
        </Container>
      </AppBar>
      <EmployeeForm formMethod={formMethod} />
      <AppBar position="sticky" color="inherit" sx={{ top: undefined, bottom: 0 }}>
        <Container>
          <Box
            display="flex"
            flexDirection={{ xs: 'column-reverse', md: 'row' }}
            justifyContent="space-between"
            flexWrap="wrap"
            py={1}
          >
            <Button sx={{ minWidth: 160, m: 1, width: { xs: 1, md: 'auto' } }} color="error" onClick={showDeleteAlert}>
              Delete
            </Button>
            <Stack direction="row" spacing={1} m={1} flex={{ xs: 1, md: 0 }}>
              <Button
                sx={{ minWidth: 160, width: { xs: 0.5, md: undefined } }}
                color="inherit"
                onClick={() => navigate(RouterPageKey.Homepage)}
              >
                Go Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ minWidth: 160, width: { xs: 0.5, md: undefined } }}
                color="primary"
                onClick={formMethod.handleSubmit(onSubmit, onError)}
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Container>
      </AppBar>
    </Stack>
  );
};

export default React.memo(EmployeeDetailPage);
