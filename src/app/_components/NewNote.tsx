"use client";

import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import NoteTextarea from "./NoteTextarea";
import useClickOutsideRef from "@/hooks/useClickOutsideRef";
import { useNotesStore } from "@/providers/notes";

interface NewNoteProps {
  userId: string;
}

export default function NewNote(props: NewNoteProps) {
  const { userId } = props;
  const addNotes = useNotesStore((state) => state.addNotes);
  const [focused, setFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  // [todo] loading Ui로 바꾸기
  const uploading = useRef(false);

  const handleFocus = () => {
    if (focused) {
      return;
    }
    setFocused(true);
  };

  const handleTitleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!e.shiftKey && e.key === "Enter") {
        if (contentRef.current === null) {
          return;
        }
        e.preventDefault();
        contentRef.current.focus();
      }
    },
    []
  );

  const resetValues = useCallback(() => {
    if (titleRef.current === null || contentRef.current === null) {
      return;
    }
    titleRef.current.value = "";
    contentRef.current.value = "";
    setFocused(false);
  }, []);

  const saveToDB = useCallback(async () => {
    if (titleRef.current === null || contentRef.current === null) {
      return;
    }
    if (
      titleRef.current.value.trim() === "" &&
      contentRef.current.value.trim() === ""
    ) {
      return;
    }
    if (uploading.current) {
      return;
    }
    uploading.current = true;
    const now = Date.now();
    const payload: INoteDB = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      classification: "none",
      creator: userId,
      createdAt: now,
      updatedAt: now,
    };

    const createMemoResponse = await fetch("/api/create-note", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (createMemoResponse.ok) {
      const { id } = await createMemoResponse.json();
      resetValues();
      addNotes([{ ...payload, id }]);
      uploading.current = false;
    } else {
      throw new Error("createMemoResponse error");
    }
  }, [userId, resetValues, addNotes]);

  const ref = useClickOutsideRef(saveToDB);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        "mb-5 flex flex-col border rounded-[6px] overflow-hidden",
        {
          visible: mounted,
          invisible: !mounted,
        }
      )}
    >
      {focused && (
        <NoteTextarea
          initialHeight={48}
          ref={titleRef}
          placeholder="Title"
          onKeyDown={handleTitleKeyDown}
        />
      )}
      <NoteTextarea
        initialHeight={48}
        ref={contentRef}
        placeholder="Take a note..."
        onFocus={handleFocus}
      />
    </div>
  );
}
