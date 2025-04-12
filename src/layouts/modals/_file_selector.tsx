import { useState } from "react";

import { Button, PriButton } from "@components/buttons";
import { ModalWrapper } from "@components/modals";
import { UploadButton } from "@components/others";
import { Icon } from "@components/icons";

import useCloudData from "@hooks/useCloudData";
import { MaterialInfo } from "@models/types/reference";

type State<T> = [T, React.Dispatch<React.SetStateAction<T>>];

type Props = {
  state?: State<boolean>;
  onFileConfirm?: (file: MaterialInfo | null) => void;
};

export default function FileSelectModal({ state, onFileConfirm }: Props) {
  const [savedFiles, refresh] = useCloudData();
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

    const file = savedFiles.filter((f) => f.documentId === currentHash)[0];
    onFileConfirm(file);
  };

  function handleRefresh() {
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
                  <th className="talft">Saved files: {savedFiles.length}</th>
                </tr>
              </thead>
              <tbody>
                {savedFiles.map((file) => (
                  <tr
                    onClick={() => setCurrentHash(file.documentId)}
                    onDoubleClick={() => {
                      setCurrentHash(file.documentId);
                      close(true);
                    }}
                    className={currentHash === file.documentId ? "active" : ""}
                  >
                    <td>
                      <h4>{file.fileName}</h4>
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
        src={location.origin + "/assets/empty-box.png"}
        style={{ filter: "invert(1)", width: 200 }}
      />
      <p className="tactr">You haven't uploaded any material</p>
    </div>
  );
}
