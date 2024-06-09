import { useRef, useEffect } from "react";

/**
 * 컴포넌트 외부를 가리지 않은 상태에서(pointer event 가능한 상태) 외부 클릭시 callback를 실행하는 ref
 */
export default function useClickOutsideRef(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
}
