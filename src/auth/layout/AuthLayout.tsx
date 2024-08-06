import { Grid, Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";
type Props = {
  title: string;
};

export const AuthLayout: FC<PropsWithChildren<Props>> = ({
  children,
  title,
}) => {
  return (
    <Grid
      container
      spacing={0}
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
          width: { sm: 550 },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};
