import { collection, getDocs } from "firebase/firestore/lite";
import { firebaseDB } from "../firebase/config";
import { Note } from "../journal/types";

export const loadNotes = async (uid: string) => {
  const collectionRef = collection(firebaseDB, `${uid}/journal/notes`);
  const docs = await getDocs(collectionRef);
  console.log(docs)
  const notes: Note[] = [];
  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() } as Note);
  });
  return notes;
};
