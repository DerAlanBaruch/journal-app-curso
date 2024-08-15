export type Note = {
  id?: string;
  title: string;
  body: string;
  date: number;
  imageUrls: string[];
};

export type JournalState = {
  isSaving: boolean;
  messageSaved: string;
  notes: Note[];
  active: Note | null;
};
