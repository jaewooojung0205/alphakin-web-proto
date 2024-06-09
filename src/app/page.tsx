import { getMemos } from "@/utils/firestore-admin";

export default async function Home() {
  const getMemosResponse = await getMemos();
  if (getMemosResponse.ok) {
    return <div className="h-full flex justify-center items-center">Home</div>;
  } else {
    throw new Error("Failed to getMemos");
  }
}
