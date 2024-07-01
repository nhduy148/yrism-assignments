import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useBreakPoint } from 'app/hooks';

export const Page404 = () => {
  const isPC = useBreakPoint('sm');
  return (
    <Box
      sx={{ background: `white url(''}) center/cover no-repeat` }}
      width={1}
      height={1}
      position={'relative'}
      py={{ xs: 16, sm: 0 }}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      {/* <Box display={'flex'} justifyContent={'center'} position={'absolute'} top={0} left={0} right={0} py={4}>
        <img src={Logo} alt={APP_NAME} style={{ maxWidth: 180 }} />
      </Box> */}
      <Container
        maxWidth={'md'}
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        {/* <img src={_404} alt={APP_NAME} style={{ maxWidth: 180 }} /> */}
        <Typography variant="h4" fontWeight={500} mt={3} gutterBottom>
          Không thể truy cập
        </Typography>
        <Typography textAlign="center" color="text.secondary">
          Bạn không thể truy cập do đường dẫn không hợp lệ hoặc quá hạn.
        </Typography>
      </Container>
    </Box>
  );
};
