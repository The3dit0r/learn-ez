import { useEffect, useState } from "react";

import { MaterialInfo } from "@models/types/reference";
import { dataService } from "@models/data";

export default function useCloudData(): [MaterialInfo[], () => void] {
  const [savedFiles, setSavedFiles] = useState<MaterialInfo[]>([]);
  const [refreshTime, setRefreshTime] = useState<string>(
    new Date().toISOString()
  );

  function refresh() {
    setRefreshTime(new Date().toISOString());
  }

  useEffect(() => {
    const request = { valid: true };

    async function load() {
      const files = await dataService.getAllMaterials();
      setSavedFiles(files);
    }

    load();

    return () => {
      request.valid = true;
    };
  }, [refreshTime]);

  return [savedFiles, refresh];
}
