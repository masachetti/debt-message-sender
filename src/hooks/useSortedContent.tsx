import { useState } from "react";
import ArrowSortIcon from "../components/icons/ArrowSort";
import SortAscendingIcon from "../components/icons/SortAscending";
import SortDescendingIcon from "../components/icons/SortDescending";

export function useSortedContent<
  T extends Record<string, any>,
  K extends keyof T
>(content: Array<T>, keys: Array<K>, iconSizes: number = 25) {

  const [sortParameters, setSortParameters] = useState<
    null | [keyof T, "asc" | "desc"]
  >(null);

  const toggleSortOrder = (key: keyof T) => {
    if (!sortParameters || sortParameters[0] !== key) {
      setSortParameters([key, "desc"]);
      return;
    }
    if (sortParameters[1] === "desc") {
      setSortParameters([key, "asc"]);
      return;
    }
    setSortParameters(null);
  };

  let sortedContent = [...content];
  if (sortParameters) {
    let compareFn: (a: T, b: T) => number;
    let sortingKey = sortParameters[0];

    if (sortParameters[1] === "asc") {
      compareFn = (a: T, b: T) => {
        let aValue = a[sortingKey] as any;
        let bValue = b[sortingKey] as any;

        if (aValue instanceof Array && bValue instanceof Array) {
          return aValue.length - bValue.length;
        }
        if (aValue instanceof Map && bValue instanceof Map) {
          return aValue.size - bValue.size;
        }
        if (aValue instanceof Date && bValue instanceof Date) {
          if (!aValue.getTime()) return -1;
          if (!bValue.getTime()) return 1;
          return aValue.getTime() - bValue.getTime();
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return aValue - bValue;
        }
        return ("" + bValue).localeCompare("" + aValue);
      };
    } else {
      compareFn = (a: T, b: T) => {
        let aValue = a[sortingKey] as any;
        let bValue = b[sortingKey] as any;

        if (aValue instanceof Array && bValue instanceof Array) {
          return bValue.length - aValue.length;
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return bValue - aValue;
        }
        if (aValue instanceof Date && bValue instanceof Date) {
          if (!aValue.getTime()) return 1;
          if (!bValue.getTime()) return -1;
          return bValue.getTime() - aValue.getTime();
        }
        return ("" + aValue).localeCompare("" + bValue);
      };
    }
    sortedContent = sortedContent.sort(compareFn);
  }

  let icons: Partial<Record<keyof T, JSX.Element>> = {};
  keys.forEach((k) => {
    if (sortParameters && sortParameters[0] === k) {
      if (sortParameters[1] === "asc") {
        icons[k] = <SortAscendingIcon size={iconSizes} />;
        return;
      }
      icons[k] = <SortDescendingIcon size={iconSizes} />;
      return;
    }
    icons[k] = <ArrowSortIcon size={iconSizes} />;
  });

  return { toggleSortOrder, sortedContent, icons };
}
