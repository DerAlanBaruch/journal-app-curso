import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FC, useMemo } from "react";
import { Note } from "../types";
import { AppDispatch, setActiveNote } from "../../store";
import { useDispatch } from "react-redux";

export const SidebarItem: FC<{ note: Note }> = ({ note }) => {
  const newTitle = useMemo(
    () =>
      note.title.length > 17 ? note.title.substring(0, 17) + "..." : note.title,
    [note.title]
  );

  const dispatch: AppDispatch = useDispatch();

  const handleClick = () => dispatch(setActiveNote(note));

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={note.body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
