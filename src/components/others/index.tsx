import { useRef } from "react";
import {
  fileExistInLocalStorage,
  saveFileToLocalStorage,
} from "../../utilities/storage";
import { PriButton } from "../buttons";

export function Padder({ height = 32 }: { height?: string | number }) {
  return <div style={{ height }}></div>;
}

export function UploadButton({ onFinish }: { onFinish: (v: File) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleFileInput(event: any) {
    const target = event.target as HTMLInputElement | null;
    if (!target) return;

    const file = target.files?.[0];
    const maxSizeBytes = 15 * 1024 * 1024;

    if (!file) {
      // alert("Error reading file! Please try again");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Only PDF documents are supported");
      return;
    }

    if (file.size > maxSizeBytes) {
      alert("File surpased maximum size");
      return;
    }

    const exist = await fileExistInLocalStorage(file.name);
    let willSaveFile = true;

    console.log(exist);

    if (exist) {
      willSaveFile = confirm(
        "This file has already existed, do you want to replace it?"
      );
    }

    if (!willSaveFile) return;
    saveFileToLocalStorage(file).then(onFinish);
  }

  function handleClick() {
    inputRef.current?.click();
  }

  return (
    <div>
      <PriButton onClick={handleClick}>
        Upload material <br />
        (Max size: 15MB)
      </PriButton>
      <input
        type="file"
        style={{ display: "none" }}
        accept="application/pdf"
        ref={inputRef}
        onChange={handleFileInput}
      />
    </div>
  );
}
