import { useState } from "react";
import ArrowSortIcon from "../components/icons/ArrowSort";
import SortAscendingIcon from "../components/icons/SortAscending";
import SortDescendingIcon from "../components/icons/SortDescending";

export function useOrderedTable<T extends Record<string,any>, K extends keyof T>(
  tableContent: Array<T>,
  keys: Array<K>,
  iconSizes: number = 25
) {
  const [orderingParameters, setOrderingParameters] = useState<
    null | [keyof T, "asc" | "desc"]
  >(null);

  const toggleOrdering = (key: keyof T) => {
    if (!orderingParameters || orderingParameters[0] !== key) {
      setOrderingParameters([key, "desc"]);
      return;
    }
    if (orderingParameters[1] === "desc") {
      setOrderingParameters([key, "asc"]);
      return;
    }
    setOrderingParameters(null);
  };

  let orderedContent = [...tableContent];
  if (orderingParameters) {
    let compareFn: (a: T, b: T) => number;
    let orderingKey = orderingParameters[0];

    if (orderingParameters[1] === "asc") {
      compareFn = (a: T, b: T) => {
        let aValue = a[orderingKey] as any;
        let bValue = b[orderingKey] as any;

        if ((aValue instanceof Array) && (bValue instanceof Array)){
          return aValue.length - bValue.length
        }
        if ((aValue instanceof Map) && (bValue instanceof Map)){
          return aValue.size - bValue.size
        }
        if ((aValue instanceof Date) && (bValue instanceof Date)) {
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
        let aValue = a[orderingKey] as any;
        let bValue = b[orderingKey] as any;

        if ((aValue instanceof Array) && (bValue instanceof Array)){
          return bValue.length - aValue.length
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
    orderedContent = orderedContent.sort(compareFn);
  }

  let icons: Partial<Record<keyof T, JSX.Element>> = {};
  keys.forEach((k) => {
    if (orderingParameters && orderingParameters[0] === k) {
      if (orderingParameters[1] === "asc") {
        icons[k] = <SortAscendingIcon size={iconSizes} />;
        return;
      }
      icons[k] = <SortDescendingIcon size={iconSizes} />;
      return;
    }
    icons[k] = <ArrowSortIcon size={iconSizes} />;
  });

  return { toggleOrdering, orderedContent, icons };
}
