import { Close } from '@mui/icons-material';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { IMAGE_SIZE } from '../constants';

interface IProps {
  file?: File;
  onDeleteClick: () => void;
  url?: string;
}

export const ImagePreview: FC<IProps> = ({ file, onDeleteClick, url }) => {
  const isValidateFile = file instanceof File;
  const imageUrl = isValidateFile ? URL.createObjectURL(file) : url;
  return (
    <Paper elevation={2} component={Box} width={IMAGE_SIZE} flexBasis={IMAGE_SIZE}>
      <Box
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        bgcolor="grey.300"
        position="relative"
        sx={{ background: `url(${imageUrl}) center/cover no-repeat`, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      >
        <IconButton
          sx={{ position: 'absolute', top: -10, right: -16, bgcolor: 'grey.200', ':hover': { bgcolor: 'grey.200' } }}
          size="small"
          onClick={onDeleteClick}
        >
          <Close fontSize="small" />
        </IconButton>
      </Box>
      <Box textAlign="center" overflow="hidden">
        <Typography variant="caption" p={1} whiteSpace="nowrap" className="text-truncate-2-lines">
          {file?.name ?? url}
        </Typography>
      </Box>
    </Paper>
  );
};
