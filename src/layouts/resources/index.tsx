import { PriButton, SecButton, WarnButton } from "../../components/buttons";
import { Icon } from "../../components/icons";
import { Padder, UploadButton } from "../../components/others";

import {
  FileMetadata,
  removeFileFromLocalStorage,
} from "../../utilities/storage";
import { formatDate, formatFileSize } from "../../utilities/converter";
import useLocalSavedFiles from "../../hooks/useLocalSavedFiles";

type Props = {};

export function ResourceListPanel({}: Props) {
  const [savedFiles, refresh] = useLocalSavedFiles();

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
                <th className="talft">
                  Saved files: {savedFiles.length}
                  <br />
                  Total size:{" "}
                  {formatFileSize(
                    savedFiles.reduce((a, b) => a + b.byteSize, 0)
                  )}
                </th>
                <th></th>
                <th>Uploaded at</th>
              </tr>
            </thead>
            <tbody>
              {savedFiles.map((file) => (
                <FileRow file={file} reload={refresh} key={file.hash} />
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

function FileRow({ file, reload }: { file: FileMetadata; reload(): void }) {
  async function removeFile() {
    const willRemove = confirm(
      "Are you sure you want to remove:\n" + file.name
    );
    if (!willRemove) return;

    const status = await removeFileFromLocalStorage(file.hash || "");
    if (status) {
      alert("File remove sucessfully");
    } else {
      alert("We encounter an issue removing the file, please try again later");
    }

    reload();
  }

  return (
    <tr>
      <td>
        <h4>
          {file.name} [{formatFileSize(file.byteSize)}]
        </h4>
        <div>Last modified: {formatDate(file.lastModified)}</div>
      </td>
      <td className="tactr trivia">
        <PriButton>
          <Icon name="quiz" />
        </PriButton>
        <SecButton>
          <Icon name="conversion_path" />
        </SecButton>
        <WarnButton onClick={removeFile}>
          <Icon name="delete" />
        </WarnButton>
      </td>
      <td className="tactr trivia">{formatDate(file.uploadedDate)}</td>
    </tr>
  );
}
