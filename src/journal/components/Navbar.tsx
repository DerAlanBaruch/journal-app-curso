import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { User } from "../../auth/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, startLogout } from "../../store";

const UserAvatar = ({ user }: { user?: User }) => {
  const { displayName, photoURL } = user ?? {};
  const names = displayName?.split(" ") ?? [];
  const initials = names.map((name) => name[0]).join("");

  return photoURL ? (
    <Avatar alt={displayName ?? ""} src={photoURL} />
  ) : (
    <Avatar>{initials}</Avatar>
  );
};

export const Navbar: FC<{ drawerWidth: number }> = ({ drawerWidth }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const onLogout = () => {
    console.log("Logout");
    dispatch(startLogout());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            JournalApp
          </Typography>
          <Grid item alignItems="center" sx={{ display: "flex" }}>
            <UserAvatar user={user} />
            <IconButton color="error" onClick={onLogout}>
              <LogoutOutlined />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
