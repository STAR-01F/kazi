import {ThemeProvider} from '@emotion/react';
import {CssBaseline, createTheme} from '@mui/material';
import {useMemo} from 'react';
import {breakpoints} from './customs';
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
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
  const theme = useMemo(
    () =>
      createTheme({
        breakpoints: {...breakpoints},
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: (theme) => ({
              '::-webkit-scrollbar': {
                width: '10px',
                backgroundColor: theme.palette.background.paper,
              },
              '::-webkit-scrollbar-track': {
                boxShadow: `inset 0 0 6px ${theme.palette.divider}`,
              },
              '::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.divider,
                outline: `1px solid ${theme.palette.divider}`,
                borderRadius: '8px',
              },
            }),
          },
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
