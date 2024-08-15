import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { FC, useEffect, useMemo, useRef } from "react";
import { ImageGallery } from "../components";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store";
import { useForm } from "../../hooks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const NoteView: FC = () => {
  const {
    active: note,
    isSaving,
    messageSaved,
  } = useSelector((state: RootState) => state.journal);
  const dispatch: AppDispatch = useDispatch();
  const { formState, handleInputChange } = useForm(note!);
  const uploadRef = useRef<HTMLInputElement>(null);

  const dateString = useMemo(() => {
    return new Date(note?.date ?? 0).toLocaleDateString();
  }, [note?.date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved) {
      Swal.fire("Guardado", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSave = () => dispatch(startSaveNote());

  const onFileInputChange = (
    target: HTMLInputElement & { files: FileList }
  ) => {
    const files = target.files;
    if (!files || files.length === 0) return;
    const images = Array.from(files);
    dispatch(startUploadingFiles(images));
    console.log(images);
  };

  const onDelete = () => dispatch(startDeletingNote());

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={uploadRef}
          onChange={(e) => onFileInputChange(e.target as any)}
          style={{ display: "none" }}
        />
        <IconButton
          onClick={() => uploadRef.current?.click()}
          color="primary"
          component="span"
          disabled={isSaving}
        >
          <UploadOutlined />
        </IconButton>
        <Button
          disabled={isSaving}
          onClick={onSave}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          fullWidth
          label="Título"
          variant="filled"
          placeholder="Título de la nota"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={formState.title}
          onChange={handleInputChange}
        />
        <TextField
          type="text"
          fullWidth
          multiline
          variant="filled"
          placeholder="¿Que sucedio el dia de hoy?"
          minRows={5}
          name="body"
          value={formState.body}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid container justifyContent="end">
        <Button sx={{ mt: 2 }} color="error" onClick={() => onDelete()}>
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>
      <ImageGallery imageUrls={note?.imageUrls ?? []} />
    </Grid>
  );
};
