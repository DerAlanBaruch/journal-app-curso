import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { customTheme } from "./theme";
import { FC, PropsWithChildren } from "react";

export const AppTheme: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
