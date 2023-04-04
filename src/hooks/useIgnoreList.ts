import { useState } from "react";

export default function useIgnoreList() {
  const [ignoreList, setIgnoreList] = useState<Array<IgnoredUser>>([]);
  const [loading, setLoading] = useState(true);

  if (loading) {
    electronApi.getIgnoreList().then((ignoreList) => {
      setIgnoreList(ignoreList);
      setLoading(false);
    });
  }
  return { ignoreList, setIgnoreList, loading } as const;
}
