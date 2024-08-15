import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { Note } from "../../journal/types";
import {
  addNewEmptyNote,
  deleteNoteById,
  setActiveNote,
  setImgUrls,
  setNotes,
  setSaving,
  updateNote,
} from "./journalSlice";
import { deleteFile, fileUpload, loadNotes } from "../../helpers";

export const startNewNote = createAsyncThunk(
  "journal/startNewNote",
  async (note: any, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    if (!note) return;
    const { uid } = state.auth.user ?? {};
    if (!uid) return;
    thunkAPI.dispatch(setSaving());
    const newNote: Note = {
      title: note.title,
      body: note.body,
      date: new Date().getTime(),
      imageUrls: [],
    };
    const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);
    newNote.id = newDoc.id;
    thunkAPI.dispatch(addNewEmptyNote(newNote));
    thunkAPI.dispatch(setActiveNote(newNote));
    console.log(uid, newNote, newDoc);
  }
);

export const startLoadingNotes = createAsyncThunk(
  "journal/startLoadingNotes",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { uid } = state.auth.user ?? {};
    if (!uid) return;
    const notes = await loadNotes(uid);
    thunkAPI.dispatch(setNotes(notes));
  }
);

export const startSaveNote = createAsyncThunk(
  "journal/startSaveNote",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { uid } = state.auth.user ?? {};
    if (!uid) return;
    const { active: note } = state.journal;
    if (!note) return;
    thunkAPI.dispatch(setSaving());
    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    const toSaveNote = { ...note };
    delete toSaveNote.id;
    await setDoc(docRef, toSaveNote, { merge: true });
    thunkAPI.dispatch(updateNote(note));
  }
);

export const startUploadingFiles = createAsyncThunk(
  "journal/startUploadingFiles",
  async (files: File[], thunkAPI) => {
    thunkAPI.dispatch(setSaving());
    const requests = files.map((file) => fileUpload(file));
    const urls = await Promise.all(requests);
    thunkAPI.dispatch(setImgUrls(urls));
    thunkAPI.dispatch(startSaveNote());
    console.log({ files, urls });
  }
);

export const startDeletingNote = createAsyncThunk(
  "journal/startDeletingNote",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { uid } = state.auth.user ?? {};
    if (!uid) return;
    const { active: note } = state.journal;
    if (!note) return;
    // const requests = note.imageUrls.map((url) => deleteFile(url));
    // const res = await Promise.all(requests);
    // console.log(res);
    const docRef = doc(firebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);
    thunkAPI.dispatch(deleteNoteById(note.id));
  }
);
