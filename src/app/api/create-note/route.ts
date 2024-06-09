import { createNote } from "@/utils/firestore-admin";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const createMemoResponse = await createNote(data);
    if (createMemoResponse.ok && createMemoResponse.id) {
      return new NextResponse<{ id: string }>(
        JSON.stringify({ id: createMemoResponse.id })
      );
    } else {
      throw new Error("Failed to createMemoResponse");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
