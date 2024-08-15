import { createSlice } from "@reduxjs/toolkit";
import { JournalState } from "../../journal/types";

const initialState: JournalState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: null,
};

export const journalSlice = createSlice({
  name: "journal",
  initialState: structuredClone(initialState),
  reducers: {
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = "";
      state.isSaving = false;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) return action.payload;
        return note;
      });
      state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },
    deleteNoteById: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    setImgUrls: (state, action) => {
      state.active?.imageUrls.push(...action.payload);
    },
    resetState: () => structuredClone(initialState),
  },
});

export const {
  addNewEmptyNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  setImgUrls,
  resetState,
} = journalSlice.actions;
