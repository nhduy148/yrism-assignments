import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from 'app/contexts';
import { SnackbarProvider } from 'notistack';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfirmDialog } from './components';
import { useBreakPoint } from './hooks';
import { Page404 } from './pages/404';
import { store } from './redux/store';
import MainRoutes from './routes';
import { datetimeConfig, numerConfig } from './utils';

datetimeConfig();
numerConfig();

export default function App() {
  const isPC = useBreakPoint('sm');

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <ThemeProvider initialAppTheme={'light'}>
          <ConfirmDialog />
          <CssBaseline />
          <SnackbarProvider
            autoHideDuration={3000}
            anchorOrigin={{ horizontal: isPC ? 'right' : 'center', vertical: 'top' }}
            disableWindowBlurListener
            preventDuplicate
          >
            <BrowserRouter>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="*" element={<MainRoutes />} />
                  <Route path="404" element={<Page404 />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </SnackbarProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}
