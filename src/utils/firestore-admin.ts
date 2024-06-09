import "server-only";

import { firestoreAdmin } from "@/lib/firebase-admin";

export async function getMemos(): Promise<{
  ok: boolean;
  data: IMemo[] | null;
}> {
  try {
    const result: IMemo[] = [];
    const querySnapshot = await firestoreAdmin.collection("memos").get();
    querySnapshot.forEach((qs) => {
      const data = qs.data() as IMemoDB;
      result.push({
        id: qs.id,
        ...data,
      });
    });
    return {
      ok: true,
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      data: null,
    };
  }
}
