"use client";

import clsx from "clsx";
import {
  TextareaHTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

interface NoteTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  initialHeight: number;
}

export default forwardRef<HTMLTextAreaElement, NoteTextareaProps>(
  function NoteTextarea({ initialHeight, className, ...textareaProps }, ref) {
    const localRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => localRef.current!);

    const handleInput = useCallback(() => {
      if (localRef.current === null) {
        return;
      }
      localRef.current.style.height = "0px";
      localRef.current.style.height = localRef.current.scrollHeight + "px";
    }, []);

    useEffect(() => {
      if (localRef.current === null) {
        return;
      }
      localRef.current.style.height = `${initialHeight}px`;
    }, [initialHeight]);

    return (
      <textarea
        ref={localRef}
        className={clsx(
          "p-3 w-[500px] outline-none resize-none overflow-hidden shadow",
          className
        )}
        style={{
          minHeight: initialHeight,
        }}
        onInput={handleInput}
        {...textareaProps}
      />
    );
  }
);
