/**
 * Read는 클라이언트에서?
 */

import { noteCollection } from "@/lib/firebase";
import {
  Unsubscribe,
  addDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export function onSnapshotNotes(
  userId: string,
  // dispatchMyMemosLoadingOff: () => void,
  addNotes: (payload: INote[]) => void,
  modifyNotes: (payload: INote[]) => void,
  removeNotes: (payload: INote[]) => void
): {
  ok: boolean;
  unsubscribe: Unsubscribe | null;
} {
  try {
    const q = query(
      noteCollection,
      where("creator", "==", userId),
      orderBy("updatedAt")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const addedArr: INote[] = [];
      const modifiedArr: INote[] = [];
      const removedArr: INote[] = [];
      const changes = querySnapshot.docChanges();
      changes.forEach((change) => {
        if (change.type === "added") {
          addedArr.push({ ...change.doc.data(), id: change.doc.id });
        } else if (change.type === "modified") {
          modifiedArr.push({ ...change.doc.data(), id: change.doc.id });
        } else if (change.type === "removed") {
          removedArr.push({ ...change.doc.data(), id: change.doc.id });
        }
      });
      if (addedArr.length > 0) {
        addNotes(addedArr);
      }
      if (modifiedArr.length > 0) {
        modifyNotes(modifiedArr);
      }
      if (removedArr.length > 0) {
        removeNotes(removedArr);
      }
      // dispatchMyMemosLoadingOff();
    });
    return {
      ok: true,
      unsubscribe: unsubscribe,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      unsubscribe: null,
    };
  }
}
