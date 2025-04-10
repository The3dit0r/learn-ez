import React, { useRef, useState } from "react";
import { Icon } from "../../icons";
import "./index.css";
import { ellipsisString, formatFileSize } from "../../../utilities/converter";
import { WarnButton } from "../../buttons";

type Intrinsic = React.JSX.IntrinsicElements;

type Props = {
  label?: string;
  icon?: string;

  onChange?(e: any): File | undefined;
  onError?(error: Error): void;
  accept?: string;
  maxSizeMB?: number;

  state?: [File | null, React.Dispatch<React.SetStateAction<File | null>>];
} & Intrinsic["div"];

export function InputFileDnD({
  maxSizeMB = 5,
  className,
  label,
  onChange,
  accept,
  icon = "upload_file",
  state: xtState,
  ...rest
}: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const localState = useState<File | null>(null);

  const clssArr = ["dft-input-file flex coll aictr jcctr"];
  if (className) {
    clssArr.push(className);
  }

  const [file, setFile] = xtState || localState;

  if (file) {
    clssArr.push("not-empty");
  }

  function handleClick() {
    const target = fileRef.current;
    if (!target) return;

    target.click();
  }

  function handleChange(e: any) {
    let newFile: File | null = null;

    if (onChange) {
      newFile = onChange(e) || null;
    }

    setFile((a) => newFile || a);
  }

  function FileInputContent() {
    switch (file) {
      case null: {
        return (
          <>
            <Icon name={icon} size="4em" />
            <h4>Upload file here</h4>
            <div>(Maximum: {maxSizeMB} MB)</div>
          </>
        );
      }

      default: {
        return (
          <>
            <h4 style={{ wordBreak: "break-all" }}>
              {ellipsisString(file.name, 68)}
            </h4>
            <div>{formatFileSize(file.size)}</div>
            <WarnButton
              style={{ padding: 8 }}
              onClick={(e) => {
                setFile(null);
                e.stopPropagation();
              }}
            >
              Remove
            </WarnButton>
          </>
        );
      }
    }
  }

  return (
    <>
      {!label || <div className="label">{label}</div>}
      <div className={clssArr.join(" ")} {...rest} onClick={handleClick}>
        <div className="flex coll aictr tactr" style={{ gap: 8 }}>
          <FileInputContent />
        </div>
        <input
          type="file"
          ref={fileRef}
          style={{ display: "none" }}
          accept={accept}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
