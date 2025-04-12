import { useEffect, useMemo, useState } from "react";
import { FileMetadata, getAllSavedFiles } from "@utilities/storage";

export default function useLocalSavedFiles(): [FileMetadata[], () => void] {
  const [savedFiles, setSavedFiles] = useState<FileMetadata[]>([]);
  const [fetchTimestamp, setFetchTimestamp] = useState("");

  function reloadFileList() {
    setFetchTimestamp(new Date().toISOString());
  }

  useEffect(() => {
    reloadFileList();
  }, []);

  useEffect(() => {
    if (!fetchTimestamp) return;
    const request = { valid: true };

    getAllSavedFiles().then((saved) => {
      if (!request.valid) return;

      const sorted = saved.sort((a, b) =>
        (a.uploadedDate as any) > (b.uploadedDate as any) ? -1 : 0
      );

      setSavedFiles(sorted);
      // console.log("File list updated:", fetchTimestamp);
    });

    return () => {
      request.valid = false;
    };
  }, [fetchTimestamp]);

  const filesHash = savedFiles.map((i) => i.hash).join("&");

  return [useMemo(() => savedFiles, [filesHash]), reloadFileList];
}
