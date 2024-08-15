import { FC } from "react";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { AppDispatch, RootState, startNewNote } from "../../store";
import { useDispatch, useSelector } from "react-redux";

export const JournalPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isSaving, active } = useSelector((state: RootState) => state.journal);

  const onClickNewNote = () => dispatch(startNewNote({ title: "", body: "" }));

  return (
    <JournalLayout>
      {active && <NoteView />}
      {!active && <NothingSelectedView />}
      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.8 },
          position: "fixed",
          bottom: 50,
          right: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
