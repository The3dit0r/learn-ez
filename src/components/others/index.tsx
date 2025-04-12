import { useRef } from "react";

import { Button, PriButton, SecButton, WarnButton } from "@components/buttons";

import { useSnackbar } from "@context/snackbar";

import {
  fileExistInLocalStorage,
  saveFileToLocalStorage,
} from "@utilities/storage";
import { dataService } from "@models/data";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export function Padder({ height = 32 }: { height?: string | number }) {
  return <div style={{ height }}></div>;
}

export function UploadMaterialButton({
  onFinish,
}: {
  onFinish: (f: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [toggle] = useSnackbar();

  const alerts = (a = "") => {
    toggle({ text: a, color: "var(--color-err)", icon: "error" });
  };

  async function handleFileInput(event: any) {
    const target = event.target as HTMLInputElement | null;
    if (!target) return;

    const file = target.files?.[0];
    const maxSizeBytes = 15 * 1024 * 1024;

    target.value = "";

    if (!file) {
      alerts("Error reading file! Please try again");
      return;
    }

    if (file.type !== "application/pdf") {
      alerts("Only PDF documents are supported");
      return;
    }

    if (file.size > maxSizeBytes) {
      alerts("File surpased maximum size");
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
    saveFileToLocalStorage(file).then((f) => {
      onFinish(f);
      toggle({ text: "File uploaded" });
    });
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

export function UploadButton({ onFinish }: { onFinish: () => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [toggle] = useSnackbar();

  const alerts = (a = "") => {
    toggle({ text: a, color: "var(--color-err)", icon: "error" });
  };

  async function handleFileInput(event: any) {
    const target = event.target as HTMLInputElement | null;
    if (!target) return;

    const file = target.files?.[0];
    const maxSizeBytes = 15 * 1024 * 1024;

    if (!file) {
      alerts("Error reading file! Please try again");
      return;
    }

    if (file.type !== "application/pdf") {
      alerts("Only PDF documents are supported");
      return;
    }

    if (file.size > maxSizeBytes) {
      alerts("File surpased maximum size");
      return;
    }

    const uuid = crypto.randomUUID();
    const docREf = ref(getStorage(), `materials/${uuid}-${file!.name}`);
    uploadBytes(docREf, await file!.arrayBuffer());

    toggle({
      text: "Uploading your file....",
      duration: 1e6,
    });

    dataService
      .ingestPedofile(`${uuid}-${file!.name}`)
      .then((obs) => {
        obs.subscribe((str) => {
          toggle({
            text: "Uploading | Status: " + str,
          });
        });
      })
      .catch(() => {
        alerts("An error has orrcured while trying to upload your files");
      });
    target.value = "";

    console.log(file);
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

export function QuestionContent({
  data,
  index,
  score,
  choice,
  showAnswer,
  className,
}: {
  data: any;
  index: number | string;
  score?: number;
  choice?: string;
  showAnswer?: boolean;
  className?: string;
}) {
  const clssArr = ["frame"];
  if (className) {
    clssArr.push(className);
  }

  return (
    <div className={clssArr.join(" ")} style={{ marginBottom: 16 }}>
      <h4>
        Q{index} •{" "}
        {showAnswer ? (
          <span>
            Score: {score} / {data.maxScore}
          </span>
        ) : (
          <span>Score: {data.maxScore}</span>
        )}
      </h4>
      <div style={{ minHeight: 100 }}>
        <div style={{ fontSize: "1.35em", marginTop: 8 }}>{data.question}</div>
      </div>
      {!showAnswer || (
        <div className="disclaimer">From: {data.reference.source}</div>
      )}
      <Padder height={32} />
      <div className="flex coll card-list" style={{ gap: 16 }}>
        {Object.keys(data.choices).map((k) => {
          const content = data.choices[k];

          if (k === choice) {
            if (k === data.answer) {
              return <SecButton>{content}</SecButton>;
            } else {
              return <WarnButton>{content}</WarnButton>;
            }
          } else {
            if (k === data.answer && showAnswer) {
              return <SecButton>{content}</SecButton>;
            }

            return <Button>{content}</Button>;
          }
        })}
      </div>
    </div>
  );
}
