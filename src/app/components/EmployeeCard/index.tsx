import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, CardMedia, IconButton, Stack, Typography, alpha, styled } from '@mui/material';
import { useSelector } from 'app/hooks';
import flatMap from 'lodash-es/flatMap';
import reduce from 'lodash-es/reduce';
import uniq from 'lodash-es/uniq';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Employee } from 'shared/types';
import { showConfirmDialog } from '../ConfirmDialog';

type Props = {
  employee: Employee;
  onDelete: (id: number) => void;
  onClick: (id: number) => void;
};

const DELETE_WRAPPER_CLASS = 'delete-wrapper';

const StyledCard = styled(Card)`
  position: relative;
  cursor: pointer;
  height: 100%;

  &:hover {
    .${DELETE_WRAPPER_CLASS} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const StyledDeleteIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  right: 12,
  opacity: 0,
  transition: 'all 300ms',
  visibility: 'hidden',
  zIndex: 99,
  backgroundColor: alpha(theme.palette.error.main, 0.2),
  '&:hover': {
    backgroundColor: alpha(theme.palette.error.main, 0.2),
  },
}));

export const EmployeeCard: React.FC<Props> = ({ employee, onDelete, onClick }) => {
  const { positionResources } = useSelector((state) => state.app);

  const handleDelete = (e: any) => {
    e.stopPropagation();
    showConfirmDialog({
      title: 'Delete Employee',
      message: 'Are you sure you want to delete this employee?',
      onConfirm: () => onDelete(employee.id),
    });
  };

  const portfolioImages = React.useMemo(
    () =>
      flatMap(employee.positions, (position) => position.toolLanguages.flatMap((toolLanguage) => toolLanguage.images)),
    [employee.positions],
  );

  const totalExperience = React.useMemo(
    () =>
      reduce(
        employee.positions,
        (total, position) =>
          total +
          reduce(
            position.toolLanguages,
            (subTotal, toolLanguage) => subTotal + (toolLanguage.to - toolLanguage.from),
            0,
          ),
        0,
      ),
    [employee.positions],
  );

  const positions = React.useMemo(() => {
    const results = employee.positions
      .map((position) => {
        return positionResources.find((pr) => pr.positionResourceId === position.positionResourceId)?.name ?? false;
      })
      .filter(Boolean);
    return uniq(results).join(', ');
  }, [employee.positions, positionResources]);

  const description = React.useMemo(() => {
    const results = employee.positions
      .map((position) => {
        return position.toolLanguages.map((toolLanguage) => toolLanguage.description).join('<br />');
      })
      .join('<br />');
    return results;
  }, [employee.positions]);

  return (
    <StyledCard onClick={() => onClick(employee.id)}>
      <CardMedia sx={{ aspectRatio: 1 }}>
        <Carousel showThumbs={false} showStatus={false}>
          {portfolioImages.map((image) => (
            <div key={image?.id}>
              <img src={image?.cdnUrl} alt="Employee portfolio" />
            </div>
          ))}
        </Carousel>
      </CardMedia>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{employee.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {totalExperience} years
          </Typography>
        </Stack>
        <Typography variant="subtitle2" gutterBottom>
          {positions}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
          }}
          color="textSecondary"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </CardContent>
      <StyledDeleteIconButton className={DELETE_WRAPPER_CLASS} onClick={handleDelete}>
        <DeleteIcon color="error" />
      </StyledDeleteIconButton>
    </StyledCard>
  );
};
