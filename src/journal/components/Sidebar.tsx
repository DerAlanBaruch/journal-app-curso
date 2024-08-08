import { TurnedInNot } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const Sidebar: FC<{ drawerWidth: number }> = ({ drawerWidth }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "block",
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {user?.displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {["1", "2", "3"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                  <ListItemText primary={text} />
                  <ListItemText
                    secondary={
                      "Lorem ipsum dolor sit, amet consectetur adipisicing elit."
                    }
                  />
                </Grid>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
