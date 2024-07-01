import { AddAPhoto } from '@mui/icons-material';
import { Box, Button, Grid, MenuItem, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { datetime } from 'app/utils';
import { isNil } from 'lodash-es';
import React from 'react';
import { Controller, UseFormReturn, useWatch } from 'react-hook-form';
import { DataImage, DataImageSchema, EmployeeSchema, ToolLanguageResources } from 'shared/types';
import { IMAGE_SIZE } from '../constants';
import { ImagePreview } from './image-preview';

interface IProps {
  positionIndex: number;
  toolIndex: number;
  formMethod: UseFormReturn<EmployeeSchema, any, undefined>;
  toolLanguageResources: ToolLanguageResources[];
  disabled?: boolean;
}

type BaseNameType = `positions.${number}.toolLanguages.${number}`;
type ImageType = DataImage | File;

export const ToolForm: React.FC<IProps> = ({
  toolIndex,
  positionIndex,
  formMethod,
  toolLanguageResources,
  disabled,
}) => {
  const [imageFiles, setImageFiles] = React.useState<ImageType[]>([]);
  const baseName = `positions.${positionIndex}.toolLanguages.${toolIndex}` as BaseNameType;

  const fromValue = useWatch({ control: formMethod.control, name: `${baseName}.from` });
  const toValue = useWatch({ control: formMethod.control, name: `${baseName}.to` });
  const imagesValues = useWatch({ control: formMethod.control, name: `${baseName}.images` });

  React.useEffect(() => {
    setImageFiles(formMethod.watch(`${baseName}.images`) as ImageType[]);
  }, [formMethod.watch(`${baseName}.images`)]);

  const handleImageFilesChange = (files: ImageType[]) => {
    formMethod.setValue(
      `${baseName}.images`,
      files.map((file, index) => {
        if (file instanceof File) {
          return { data: file, displayOrder: index } as DataImageSchema;
        }
        return file as DataImageSchema;
      }),
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImageFiles((prev) => {
        const newFiles = Array.from(files);
        const results = prev.concat(newFiles);
        handleImageFilesChange(results);
        return results;
      });
    }
  };

  const handleDeleteImage = (index: number) => {
    setImageFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      handleImageFilesChange(newFiles);
      return newFiles;
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Controller
          name={`${baseName}.toolLanguageResourceId`}
          control={formMethod.control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              select
              fullWidth
              label="Tool/Language"
              disabled={disabled}
              {...field}
              error={!isNil(error?.message)}
              helperText={error?.message}
            >
              {toolLanguageResources.map((pr) => (
                <MenuItem key={pr.toolLanguageResourceId} value={pr.toolLanguageResourceId}>
                  {pr.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Controller
          name={`${baseName}.from`}
          control={formMethod.control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              disableFuture
              views={['year']}
              label="From"
              value={datetime(String(field.value), 'YYYY')}
              maxDate={datetime(String(toValue), 'YYYY')}
              onChange={(year) => {
                if (datetime(year).isValid()) {
                  field.onChange(year?.get('years'));
                  formMethod.clearErrors(`${baseName}.from`);
                } else {
                  formMethod.setError(`${baseName}.from`, {
                    message: 'Invalid year',
                    type: 'manual',
                  });
                }
              }}
              slotProps={{
                textField: {
                  required: true,
                  fullWidth: true,
                  disabled,
                  error: !isNil(error?.message),
                  helperText: error?.message,
                },
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Controller
          name={`${baseName}.to`}
          control={formMethod.control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              disableFuture
              views={['year']}
              label="To"
              value={datetime(String(field.value), 'YYYY')}
              minDate={datetime(String(fromValue), 'YYYY')}
              disabled={disabled ?? !fromValue}
              onChange={(year) => {
                if (datetime(year).isValid()) {
                  field.onChange(year?.get('years'));
                  formMethod.clearErrors(`${baseName}.to`);
                } else {
                  formMethod.setError(`${baseName}.to`, {
                    message: 'Invalid year',
                    type: 'manual',
                  });
                }
              }}
              slotProps={{
                textField: {
                  required: true,
                  fullWidth: true,
                  disabled,
                  error: !isNil(error?.message),
                  helperText: error?.message,
                },
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Controller
          name={`${baseName}.description`}
          control={formMethod.control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Description"
              {...field}
              multiline
              minRows={3}
              value={field.value}
              error={!isNil(error?.message)}
              helperText={error?.message}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Box display="flex" flexDirection="row" marginTop={1} flexWrap="wrap">
          <Box margin={2}>
            <Button
              variant="outlined"
              color="inherit"
              component="label"
              sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px dashed',
                borderColor: 'action.active',
                flexBasis: IMAGE_SIZE,
                width: IMAGE_SIZE,
                height: IMAGE_SIZE,
              }}
            >
              <AddAPhoto sx={{ mb: 0.5 }} color="disabled" />
              Upload File
              <input type="file" max={5} multiple hidden accept="image/*" onChange={handleImageChange} />
            </Button>
          </Box>
          {(imagesValues as unknown as DataImage[])?.map((image, index) => (
            <Box margin={2} key={(image as DataImage)?.id}>
              <ImagePreview
                url={(image as DataImage)?.cdnUrl}
                file={(image as DataImageSchema)?.data}
                onDeleteClick={() => handleDeleteImage(index)}
              />
            </Box>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};
