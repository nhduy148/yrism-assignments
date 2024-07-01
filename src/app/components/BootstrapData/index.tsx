import { Box } from '@mui/material';
import { useDispatch } from 'app/hooks';
import { appActions } from 'app/redux/slices';
import React from 'react';

export const BootstrapData: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        await Promise.allSettled([dispatch(appActions.getPositionResource()).unwrap()]);
      } catch (error) {
        console.error('error while fetching bootstrap data', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: 'white',
          visibility: 'visible',
          opacity: 1,
          zIndex: 9999,
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        Loading...
      </Box>
    );
  }

  return children;
};
