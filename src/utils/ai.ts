/**
 * Task candidate.
 * 1) Firebase Machine learning
 * 2) GPT
 * 3) Gemini AI
 */
export async function decideNoteClassification(
  noteDB: INoteDB
): Promise<INoteDB> {
  const result: INoteDB["classification"] = await new Promise(
    (resolve, reject) => {
      resolve("none");
    }
  );
  return {
    ...noteDB,
    classification: result,
  };
}
