/**
 * create, update, delete는 서버에서?
 */

import "server-only";

import { firestoreAdmin } from "@/lib/firebase-admin";

export async function createNote(
  payload: INoteDB
): Promise<{ ok: boolean; id: string | null }> {
  try {
    const docRef = await firestoreAdmin.collection("notes").add(payload);
    return { ok: true, id: docRef.id };
  } catch (error) {
    console.error(error);
    return { ok: false, id: null };
  }
}
