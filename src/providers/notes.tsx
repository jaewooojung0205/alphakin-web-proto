"use client";

import { NotesStore, createNotesStore, initNotesStore } from "@/stores/notes";
import { onSnapshotNotes } from "@/utils/firestore";
import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useState,
  useEffect,
} from "react";
import { type StoreApi, useStore } from "zustand";
import { useUserStore } from "./user";

export const NotesStoreContext = createContext<StoreApi<NotesStore> | null>(
  null
);

export interface NotesStoreProviderProps {
  children: ReactNode;
}

export const NotesProvider = ({ children }: NotesStoreProviderProps) => {
  const storeRef = useRef<StoreApi<NotesStore>>();
  if (!storeRef.current) {
    storeRef.current = createNotesStore(initNotesStore());
  }

  return (
    <NotesStoreContext.Provider value={storeRef.current}>
      {children}
    </NotesStoreContext.Provider>
  );
};

export const useNotesStore = <T,>(selector: (store: NotesStore) => T): T => {
  const notesStoreContext = useContext(NotesStoreContext);

  if (!notesStoreContext) {
    throw new Error(`notesStoreContext must be use within NotesProvider`);
  }

  return useStore(notesStoreContext, selector);
};
