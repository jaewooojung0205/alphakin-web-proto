"use client";

import { useNotesStore } from "@/providers/notes";
import { useUserStore } from "@/providers/user";
import { onSnapshotNotes } from "@/utils/firestore";
import { useEffect } from "react";

interface NotesFetchingProps {
  children: React.ReactNode;
}

export default function NotesFetching(props: NotesFetchingProps) {
  const { children } = props;
  const user = useUserStore((state) => state.user);
  const [addNotes, modifyNotes, removeNotes] = useNotesStore((state) => [
    state.addNotes,
    state.modifyNotes,
    state.removeNotes,
  ]);

  useEffect(() => {
    if (user) {
      const onSnapshotNotesResponse = onSnapshotNotes(
        user.id,
        addNotes,
        modifyNotes,
        removeNotes
      );
      return () => {
        if (onSnapshotNotesResponse.unsubscribe) {
          onSnapshotNotesResponse.unsubscribe();
        }
      };
    }
  }, [addNotes, modifyNotes, removeNotes, user]);

  return children;
}
