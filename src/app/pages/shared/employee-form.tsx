import { AddBusiness } from '@mui/icons-material';
import { Box, Button, Container, Grid, TextField } from '@mui/material';
import { useSelector } from 'app/hooks';
import { isNilOrEmpty } from 'app/utils';
import { isArray } from 'lodash';
import React from 'react';
import { UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { EmployeeSchema } from 'shared/types';
import { PositionForm } from './components/position-form';
import { defaultPosition } from './constants';

interface IProps {
  formMethod: UseFormReturn<EmployeeSchema, any, undefined>;
}

export const EmployeeForm: React.FC<IProps> = ({ formMethod }) => {
  const { positionResources } = useSelector((state) => state.app);

  const {
    fields: positionFields,
    append: appendPosition,
    remove: removePosition,
  } = useFieldArray({
    control: formMethod.control,
    name: 'positions',
  });
  const positions = useWatch({ name: 'positions', control: formMethod.control });

  const selectedPositionResourceIds = React.useMemo(() => {
    if (isArray(positions)) {
      return positions.map((position) => position.positionResourceId);
    }
    return [];
  }, [positions]);

  const handleAdd = () => {
    // @ts-expect-error
    appendPosition(defaultPosition);
  };

  const disableAddPosition = selectedPositionResourceIds?.length === positionResources?.length;

  return (
    <Container sx={{ py: 5, flex: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            {...formMethod.register('name')}
            error={!isNilOrEmpty(formMethod.formState?.errors?.name?.message)}
            helperText={formMethod.formState?.errors?.name?.message}
          />
        </Grid>
        {positionFields.map((position, positionIndex) => (
          <Grid item xs={12} key={position.id}>
            <PositionForm
              positionIndex={positionIndex}
              formMethod={formMethod}
              selectedPositionResourceIds={selectedPositionResourceIds}
              onDeleteClick={removePosition}
              totalPosition={positionFields.length}
            />
          </Grid>
        ))}
      </Grid>
      <Box mt={2}>
        <Button
          disabled={disableAddPosition}
          variant="contained"
          color="info"
          startIcon={<AddBusiness />}
          onClick={handleAdd}
        >
          Add Position
        </Button>
      </Box>
    </Container>
  );
};
