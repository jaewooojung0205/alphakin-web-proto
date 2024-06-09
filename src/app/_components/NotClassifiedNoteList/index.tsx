"use client";

import { useNotesStore } from "@/providers/notes";
import NoteItem from "./NoteItem";
import clsx from "clsx";

export default function NotClassifiedNoteList() {
  const notes = useNotesStore((state) => state.notes);

  return (
    <div
      className={clsx(
        "px-5 w-full grid grid-cols-1 gap-10",
        "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
      )}
    >
      {Object.values(notes).map((n) => (
        <NoteItem key={n.id} note={n} />
      ))}
    </div>
  );
}
