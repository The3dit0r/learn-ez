import { useEffect, useState } from "react";

import { TabSelector } from "../../components/navigate/_tabselector";
import { ModalWrapper } from "../../components/modals";
import { InputFileDnD } from "../../components/input/files";
import { Button, PriButton } from "../../components/buttons";
import { Icon } from "../../components/icons";
import useLocalSavedFiles from "../../hooks/useLocalSavedFiles";
import {
  FileMetadata,
  getFileHash,
  loadFileFromLocalStorage,
} from "../../utilities/storage";
import { formatDate, formatFileSize } from "../../utilities/converter";
import { UploadButton } from "../../components/others";

type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];

type Props = {
  state?: State<boolean>;
  onFileConfirm?: (file: File | null) => void;
};

export default function FileSelectModal({ state, onFileConfirm }: Props) {
  const [savedFiles, refresh] = useLocalSavedFiles();
  const [currentHash, setCurrentHash] = useState<string>("");

  const [active, setActive] = state || [false, () => {}];
  if (!active) return;

  const close = async (acceptFile = false) => {
    setActive(false);
    setCurrentHash("");

    if (!onFileConfirm || !acceptFile) return;

    if (!currentHash) {
      onFileConfirm(null);
    }

    const file = await loadFileFromLocalStorage(currentHash);
    onFileConfirm(file);
  };

  function handleRefresh(file: File) {
    const hash = getFileHash(file.name);
    setCurrentHash(hash);
    refresh();
  }

  return (
    <ModalWrapper
      boxWidth={800}
      boxHeight="min(800px, calc(100% - 240px))"
      modalClassName="flex coll"
    >
      <div className="flex spbtw aictr" style={{ padding: "16px 0" }}>
        <div className="flex aictr" style={{ gap: 8 }}>
          <Icon name="upload" size="3em" />
          <h3>Select a file</h3>
        </div>

        <UploadButton onFinish={handleRefresh} />
      </div>

      {(() => {
        if (!savedFiles.length)
          return (
            <div
              className="flex-1"
              style={{
                padding: 16,
                border: "2px dashed #fff4",
                borderRadius: 16,
              }}
            >
              <Nothing />
            </div>
          );

        return (
          <div
            className="flex-1"
            style={{
              borderRadius: 8,
              overflow: "auto",
              border: "2px solid var(--color-prim)",
            }}
          >
            <table style={{ width: "100%" }} className="custom-table">
              <thead>
                <tr>
                  <th className="talft">
                    Saved files: {savedFiles.length}
                    <br />
                    Total size:{" "}
                    {formatFileSize(
                      savedFiles.reduce((a, b) => a + b.byteSize, 0)
                    )}
                  </th>
                  <th>Last modified</th>
                </tr>
              </thead>
              <tbody>
                {savedFiles.map((file) => (
                  <tr
                    onClick={() => setCurrentHash(file.hash)}
                    onDoubleClick={() => {
                      setCurrentHash(file.hash);
                      close(true);
                    }}
                    className={currentHash === file.hash ? "active" : ""}
                  >
                    <td>
                      <h4>{file.name}</h4>
                      <div>
                        [{formatFileSize(file.byteSize)}] Uploaded:
                        {formatDate(file.uploadedDate)}
                      </div>
                    </td>

                    <td className="tactr trivia">
                      {formatDate(file.lastModified)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })()}

      <div className="flex jcend" style={{ padding: "16px 0", gap: 16 }}>
        <Button onClick={() => close()}>Cancel</Button>
        <PriButton disabled={!currentHash} onClick={() => close(true)}>
          Confirm
        </PriButton>
      </div>
    </ModalWrapper>
  );
}

function Nothing() {
  return (
    <div className="flex aictr jcctr coll" style={{ height: "100%" }}>
      <img
        src="http://localhost:5173/assets/empty-box.png"
        style={{ filter: "invert(1)", width: 200 }}
      />
      <p className="tactr">You haven't uploaded any material</p>
    </div>
  );
}
