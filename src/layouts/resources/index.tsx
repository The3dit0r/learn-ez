import { useEffect, useState } from "react";

import { PriButton, SecButton, WarnButton } from "@components/buttons";
import { Padder, UploadButton } from "@components/others";
import { Icon } from "@components/icons";

import { MaterialInfo } from "@models/types/reference";

import useCloudData from "@hooks/useCloudData";

type Props = {};

export function ResourceListPanel({}: Props) {
  const [savedFiles, refresh] = useCloudData();

  return (
    <div className="content-wrapper flex coll">
      <Padder height={64} />
      <div style={{ gap: 16 }} className="flex aictr">
        <Icon name="folder" size={84} color="var(--color-prim)" />

        <div className="flex coll flex-1" style={{ gap: 8 }}>
          <h1>My Materials</h1>
          <div className="disclaimer">Your uploaded materials</div>
        </div>

        <UploadButton onFinish={refresh} />
      </div>

      {savedFiles.length ? (
        <div
          className="flex-1"
          style={{
            backgroundColor: "#fff1",
            borderRadius: "16px",
            border: "3px solid var(--color-prim)",
            margin: "32px 0",
            overflow: "auto",
          }}
        >
          <table style={{ width: "100%" }} className="custom-table">
            <thead>
              <tr>
                <th className="talft">Saved files: {savedFiles.length}</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {savedFiles.map((file) => (
                <FileRow file={file} key={file.documentId} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex aictr jcctr coll flex-1" style={{ gap: 64 }}>
          <img
            src={location.origin + "/assets/empty-box.png"}
            style={{ filter: "invert(1)", width: 200 }}
          />
          <p className="tactr">You haven't uploaded any material</p>
        </div>
      )}
    </div>
  );
}

function FileRow({ file }: { file: MaterialInfo }) {
  return (
    <tr>
      <td>
        <h4>{file.fileName}</h4>
      </td>
      <td className="tactr trivia">
        <PriButton>
          <Icon name="quiz" />
        </PriButton>
        <SecButton>
          <Icon name="conversion_path" />
        </SecButton>
      </td>
    </tr>
  );
}
