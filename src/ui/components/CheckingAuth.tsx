import { CircularProgress, Grid } from "@mui/material";
import { FC } from "react";

export const CheckingAuth: FC = () => {
  return (
    <Grid
      container
      spacing={0}
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
};
