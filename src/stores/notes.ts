import { createStore } from "zustand/vanilla";

export type NotesState = {
  notes: {
    [id: string]: INote;
  };
};

export type NotesActions = {
  addNotes: (value: INote[]) => void;
  modifyNotes: (value: INote[]) => void;
  removeNotes: (value: INote[]) => void;
};

export type NotesStore = NotesState & NotesActions;

export const initNotesStore = (): NotesState => {
  return defaultInitState;
};

export const defaultInitState: NotesState = {
  notes: {},
};

export const createNotesStore = (initState: NotesState = defaultInitState) => {
  return createStore<NotesStore>()((set) => ({
    ...initState,
    addNotes: (value: INote[]) =>
      set((state) => {
        const added = value.reduce(
          (acc: { [key: string]: INote }, note: INote) => {
            acc[note.id] = note;
            return acc;
          },
          {}
        );
        return {
          ...state,
          notes: { ...added, ...state.notes },
        };
      }),
    modifyNotes: (value: INote[]) =>
      set((state) => {
        const newNotes = { ...state.notes };
        for (const note of value) {
          if (newNotes[note.id]) {
            newNotes[note.id] = note;
          }
        }
        return {
          ...state,
          notes: newNotes,
        };
      }),
    removeNotes: (value: INote[]) =>
      set((state) => {
        const newNotes = { ...state.notes };
        for (const note of value) {
          if (newNotes[note.id]) {
            delete newNotes[note.id];
          }
        }
        return {
          ...state,
          notes: newNotes,
        };
      }),
  }));
};
