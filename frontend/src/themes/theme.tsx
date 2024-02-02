import {ThemeProvider} from '@emotion/react';
import {CssBaseline, createTheme} from '@mui/material';
import {useMemo} from 'react';
import * as Override from './customs';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * ThemeOverideProps
 *
 */
type ThemeCustomizationProps = {
  children: React.ReactNode;
};

/**
 * ThemeOveride
 * This is a theme override component.
 *
 * This component is used to override the default theme of the application.
 *
 * @param children - The children components to render inside the ThemeProvider.
 *
 * @returns The ThemeProvider component.
 *
 * @example
 * ```tsx
 *  <ThemeOveride>
 *      <App />
 *  </ThemeOveride>
 * ```
 */
const ThemeCustomization = ({children}: ThemeCustomizationProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        breakpoints: {...Override.breakpoints},
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeCustomization;
