import { yupResolver } from '@hookform/resolvers/yup';
import { AppBar, Button, Container, Stack, Typography } from '@mui/material';
import { RouterPageKey } from 'app/config';
import { useNavigate } from 'app/hooks';
import { addEmployee } from 'app/services';
import { employeeSchema } from 'app/validations';
import { useSnackbar } from 'notistack';
import React from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { EmployeeSchema } from 'shared/types';
import { defaultPosition } from '../shared/constants';
import { EmployeeForm } from '../shared/employee-form';

const CreateEmployeePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const formMethod = useForm<EmployeeSchema>({
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      name: '',
      positions: [defaultPosition],
    },
  });

  const onSubmit: SubmitHandler<EmployeeSchema> = async (data) => {
    console.log({ data });
    try {
      await addEmployee(data);
      enqueueSnackbar('Employee created successfully', { variant: 'success' });
      navigate(RouterPageKey.Homepage);
    } catch (error) {
      enqueueSnackbar('Error while creating employee', { variant: 'error' });
    }
  };

  const onError: SubmitErrorHandler<EmployeeSchema> = (errors) => {
    console.log('Errors:', errors);
    enqueueSnackbar('Failed to submit form', { variant: 'error' });
  };

  return (
    <Stack height={1} overflow="auto">
      <AppBar position="sticky" sx={{ py: 2 }}>
        <Container>
          <Typography variant="h4">Create Employee</Typography>
        </Container>
      </AppBar>
      <EmployeeForm formMethod={formMethod} />
      <AppBar position="sticky" color="inherit" sx={{ top: undefined, bottom: 0 }}>
        <Container>
          <Stack direction="row" justifyContent="space-between" py={3}>
            <Button sx={{ minWidth: 160 }} color="inherit" onClick={() => navigate(RouterPageKey.Homepage)}>
              Go Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ minWidth: 160 }}
              color="primary"
              onClick={formMethod.handleSubmit(onSubmit, onError)}
            >
              Submit
            </Button>
          </Stack>
        </Container>
      </AppBar>
    </Stack>
  );
};

export default React.memo(CreateEmployeePage);
