import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';
import { useMemo } from 'react';
import * as Override from './customs';

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
const ThemeCustomization = ({ children }: ThemeCustomizationProps) => {
    const theme = useMemo(
        () =>
            createTheme({
                breakpoints: { ...Override.breakpoints },
            }),
        []
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default ThemeCustomization;
