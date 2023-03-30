import { useState } from "react";
import { IgnoredUser } from "../types/IgnoreList";

export default function useIgnoreList() {
  const [ignoreList, setIgnoreList] = useState<IgnoredUser[]>([])
  const [loading, setLoading] = useState(true)

  if (loading){
    electronApi.getIgnoreList().then((ignoreList) => {
      setIgnoreList(ignoreList);
      setLoading(false);
    })
  }
  return {ignoreList, setIgnoreList, loading} as const;
}