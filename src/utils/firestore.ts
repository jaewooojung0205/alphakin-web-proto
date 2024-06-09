import { memoCollection } from "@/lib/firebase";
import { addDoc } from "firebase/firestore";

export async function createMemo(payload: IMemoDB): Promise<{
  ok: boolean;
}> {
  try {
    await addDoc(memoCollection, payload);
    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
    };
  }
}
