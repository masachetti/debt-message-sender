import { useEffect, useRef } from "react";

export default function usePersistentScrollPosition(storageKey: string) {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let currentScrollPosition = sessionStorage.getItem(storageKey);

    if (currentScrollPosition) {
      if (elementRef && elementRef.current) {
        elementRef.current.scrollTop = Number(currentScrollPosition);
      }
    }
  }, []);
  const onScroll = (e: React.UIEvent) => {
    let element = e.target as HTMLDivElement;
    let currentScrollPosition = element.scrollTop;
    sessionStorage.setItem(storageKey, "" + currentScrollPosition);
  };
  return { elementRef, onScroll };
}
