import { useState } from "react";

export function useCheckBoxes<T>(keyList: T[], initialValues: boolean[] = []) {
  const [checkBoxes, setCheckBoxes] = useState(new Map<T, boolean>());

  keyList.forEach((k, i) => {
    if (!checkBoxes.has(k)) {
      checkBoxes.set(
        k,
        initialValues.length === keyList.length ? initialValues[i] : false
      );
    }
  });

  const getCheckBoxValue = (key: T) => {
    if (!checkBoxes.has(key)) return false;
    return checkBoxes.get(key) as boolean;
  };

  const createCheckBoxChangeHandler = (key: T) => {
    return (ev: React.ChangeEvent<HTMLInputElement>) => {
      checkBoxes.set(key, ev.target.checked);
      setCheckBoxes(new Map(checkBoxes));
    };
  };
  const toggleCheckBox = (key: T) => {
    checkBoxes.set(key, !checkBoxes.get(key));
    setCheckBoxes(new Map(checkBoxes));
  };
  const toggleAllCheckBoxes = () => {
    let newValueForAll = true;
    if ([...checkBoxes.values()].every((v) => v)) newValueForAll = false;
    [...checkBoxes.keys()].forEach((k) => checkBoxes.set(k, newValueForAll));
    setCheckBoxes(new Map(checkBoxes));
  };
  return {
    getCheckBoxValue,
    createCheckBoxChangeHandler,
    toggleCheckBox,
    toggleAllCheckBoxes,
  };
}
