import type { RefObject } from "react";
import { useEffect } from "react";

const events: ("mousedown" | "touchstart")[] = ["mousedown", "touchstart"];

export const useClickOutside: (
  ref: RefObject<HTMLDivElement>,
  func: () => unknown
) => void = (ref, onClickOutside) => {
  const isOutside = (element: Node) =>
    !ref.current || !ref.current.contains(element);

  const onClick = (event: MouseEvent | TouchEvent) => {
    if (isOutside(event.target as Node)) {
      onClickOutside();
    }
  };

  useEffect(() => {
    for (const event of events) {
      document.addEventListener(event, onClick);
    }
    return () => {
      for (const event of events) {
        document.removeEventListener(event, onClick);
      }
    };
  });
};
