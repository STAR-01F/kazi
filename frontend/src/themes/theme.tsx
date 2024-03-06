import {ThemeProvider} from '@emotion/react';
import {CssBaseline, createTheme} from '@mui/material';
import {useMemo} from 'react';
import {breakpoints} from './customs';

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
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
  const baseTheme = createTheme();
  const theme = useMemo(
    () =>
      createTheme({
        breakpoints: {...breakpoints},
        palette: {
          //mode: prefersDarkMode ? 'dark' : 'light',
          primary: baseTheme.palette.augmentColor({
            color: {
              main: '#5836f7',
            },
          }),
          background: {
            paper: '#f0f0f6',
            default: '#f0f0f3',
          },
        },
        typography: {
          fontFamily: [
            'Kanit',
            'Oswald',
            '"Helvetica Neue"',
            '-apple-system',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
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
          MuiPaper: {
            styleOverrides: {
              root: {
                border: '1px solid ' + baseTheme.palette.divider,
                boxShadow: 'none',
                borderRadius: '16px',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: '16px',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                px: '10px',
                '&.MuiButton-contained': {
                  boxShadow: 'none',
                },
              },
            },
          },
        },
      }),
    // [prefersDarkMode]
    [baseTheme]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeCustomization;
