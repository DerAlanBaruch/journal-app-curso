import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { SidebarItem } from "./SidebarItem";

export const Sidebar: FC<{ drawerWidth: number }> = ({ drawerWidth }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { notes } = useSelector((state: RootState) => state.journal);

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
          {notes.map((note) => (
            <SidebarItem key={note.id} note={note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
