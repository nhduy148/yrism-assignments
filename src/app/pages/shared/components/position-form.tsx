import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  Collapse,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useSelector } from 'app/hooks';
import { isNil } from 'lodash';
import React from 'react';
import { Controller, UseFormReturn, useFieldArray, useWatch } from 'react-hook-form';
import { EmployeeSchema, Position } from 'shared/types';

import { Delete, LibraryAdd } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { defaultToolLanguage } from '../constants';
import { ToolForm } from './tool-form';

interface IProps {
  selectedPositionResourceIds: Position['positionResourceId'][];
  positionIndex: number;
  formMethod: UseFormReturn<EmployeeSchema, any, undefined>;
  onDeleteClick: (positionIndex: number) => void;
  totalPosition: number;
}

export const PositionForm: React.FC<IProps> = ({
  positionIndex,
  formMethod,
  selectedPositionResourceIds,
  onDeleteClick,
  totalPosition,
}) => {
  const { positionResources } = useSelector((state) => state.app);
  const {
    fields: toolFields,
    append: appendTool,
    remove: removeTool,
  } = useFieldArray({
    control: formMethod.control,
    name: `positions.${positionIndex}.toolLanguages`,
  });

  const toolLanguageError = formMethod.formState.errors.positions?.[positionIndex]?.toolLanguages?.message;

  const positionResourceId = useWatch({
    name: `positions.${positionIndex}.positionResourceId`,
    control: formMethod.control,
  });

  const handleAdd = () => {
    // @ts-expect-error
    appendTool(defaultToolLanguage);
  };

  const handleRemove = (positionIndex: number) => {
    removeTool(positionIndex);
  };

  const toolLanguageResources = React.useMemo(() => {
    return positionResources.find((pr) => pr.positionResourceId === positionResourceId)?.toolLanguageResources ?? [];
  }, [positionResourceId, positionResources]);

  const positionResource = positionResources.find((pr) => pr.positionResourceId === positionResourceId);
  const disableTool = isNil(positionResourceId) || positionResourceId === -1;

  return (
    <React.Fragment>
      <Accordion defaultExpanded>
        <AccordionSummary>
          <Stack direction="row" alignItems="center" spacing={1} width={1}>
            <Typography flex={1}>
              #{positionIndex + 1} Position:
              <Typography component="span" fontWeight="600">
                {' '}
                {positionResource?.name ?? ' '}
              </Typography>
            </Typography>
            {totalPosition > 1 && (
              <Button
                startIcon={<Delete />}
                size="small"
                variant="outlined"
                color="error"
                onClick={() => onDeleteClick(positionIndex)}
                sx={{ fontWeight: '500' }}
              >
                Delete Position
              </Button>
            )}
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name={`positions.${positionIndex}.positionResourceId`}
                control={formMethod.control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    select
                    fullWidth
                    label="Position"
                    {...field}
                    error={!isNil(error?.message)}
                    helperText={error?.message}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      formMethod.setValue(`positions.${positionIndex}.toolLanguages`, []);
                    }}
                  >
                    {positionResources.map((pr) => (
                      <MenuItem
                        key={pr.positionResourceId}
                        value={pr.positionResourceId}
                        disabled={selectedPositionResourceIds.includes(pr.positionResourceId)}
                      >
                        {pr.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Collapse in={!disableTool}>
                <Card>
                  <Alert severity="info" sx={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                    <Typography fontWeight="bold">Tools/Languages</Typography>
                  </Alert>

                  <Box p={2}>
                    {toolLanguageError && (
                      <FormHelperText error>
                        <Typography variant="body2">{toolLanguageError}</Typography>
                      </FormHelperText>
                    )}
                    {toolFields.map((field, toolIndex, array) => (
                      <Box key={field.id} py={1}>
                        <Stack direction="row" alignItems="center" spacing={1} marginBottom={1}>
                          <Typography fontWeight="bold">#{toolIndex + 1} Tool/Language</Typography>
                          <Box flex={1} height="1px" bgcolor={({ palette }) => palette.divider} />
                          {array.length > 1 && (
                            <Button
                              startIcon={<Delete />}
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => handleRemove(toolIndex)}
                              sx={{ fontWeight: '500' }}
                            >
                              Delete
                            </Button>
                          )}
                        </Stack>
                        <ToolForm
                          positionIndex={positionIndex}
                          toolIndex={toolIndex}
                          formMethod={formMethod}
                          toolLanguageResources={toolLanguageResources}
                          disabled={disableTool}
                        />
                      </Box>
                    ))}
                  </Box>
                </Card>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<LibraryAdd />}
                  onClick={handleAdd}
                  sx={{ marginTop: 2 }}
                >
                  Add Tool/Language
                </Button>
              </Collapse>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
};
