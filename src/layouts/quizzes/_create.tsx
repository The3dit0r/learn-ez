import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "../../components/icons";
import { TextAreaInput, TextInput } from "../../components/input/text";
import { Padder } from "../../components/others";
import { SecButton, Button, WarnButton } from "../../components/buttons";
import { TabSelectorVertical } from "../../components/navigate";
import { InputFileDnD } from "../../components/input/files";
import { formatFileSize } from "../../utilities/converter";
import UnavailablePreviewPanel from "../others";

const AvailableOptions = {
  general: { text: "General info", id: "general", icon: "info" },
  generate: {
    text: "Generator settings",
    id: "gener",
    icon: "settings_applications",
  },
  others: { text: "Other options", id: "others", icon: "more_horiz" },
};

type ReactState<T> = [T, React.Dispatch<React.SetStateAction<T>>];

type QCT = {
  name: ReactState<string>;
  description: ReactState<string>;
  cover: ReactState<File | null>;

  source: ReactState<File | null>;
  prompt: ReactState<string>;
};

const QuizContext = createContext<QCT | null>(null);

function useQuizContext() {
  const data = useContext(QuizContext);
  if (!data) {
    throw new Error("useQuizCpntext must be used within it's provided context");
  }

  return data;
}

export default function QuizCreatePanel() {
  const nav = useNavigate();
  const panelState = useState("general");

  const nameState = useState("");
  const descState = useState("");
  const coverState = useState<File | null>(null);
  const promptState = useState("");
  const sourceState = useState<File | null>(null);

  const value = {
    name: nameState,
    description: descState,
    cover: coverState,
    prompt: promptState,
    source: sourceState,
  };

  return (
    <QuizContext.Provider value={value}>
      <div className="content-wrapper flex coll">
        <Padder height={64} />

        <div style={{ gap: 16 }} className="flex aictr">
          <Icon name="edit_document" size={80} color="var(--color-prim)" />

          <div className="flex coll" style={{ gap: 8 }}>
            <h1>Generate a quiz</h1>
            <div className="disclaimer">
              Quizzes will be saved locally on your device
            </div>
          </div>
        </div>

        <Padder height={32} />

        <div style={{ padding: "32px 0", gap: 32 }} className="flex flex-1">
          <TabSelectorVertical
            items={Object.values(AvailableOptions)}
            state={panelState}
          />

          <div style={{ border: "1px solid #fff4" }}></div>

          {(() => {
            switch (panelState[0]) {
              case "others": {
                return <OthersPanel />;
              }

              case "gener": {
                return <GeneratePanel />;
              }

              case "general":
              default: {
                return <GeneralPanel />;
              }
            }
          })()}
        </div>

        <div style={{ gap: 12 }} className="flex jcend">
          <Button onClick={() => nav(-1)}>Cancel</Button>
          <SecButton>Generate quiz</SecButton>
        </div>

        <Padder height={32} />
      </div>
    </QuizContext.Provider>
  );
}

function GeneralPanel() {
  const { name, description, cover } = useQuizContext();

  const allowedImage = ["image/jpeg", "image/png", "image/webp", "image/webm"];

  function handleFileInput(event: any) {
    const target = event.target as HTMLInputElement | null;
    if (!target) return;

    const file = target.files?.[0];
    const maxSizeBytes = 5 * 1024 * 1024;

    if (!file) {
      alert("Error reading file! Please try again");
      return;
    }

    if (file.size > maxSizeBytes) {
      alert("File surpased maximum size");
      return;
    }

    if (!allowedImage.includes(file.type)) {
      alert("Supported image file format: .jpeg, .png, .webp, .webm");
      return;
    }

    return file;
  }

  return (
    <div className="flex-1 fade-in">
      <PanelHeader
        {...AvailableOptions.general}
        desc="General information of the quiz"
      />
      <div className="flex" style={{ gap: 32 }}>
        <div>
          {cover[0] ? (
            <div className="flex aictr coll" style={{ gap: 16, width: 250 }}>
              <h4>Cover image</h4>
              <div
                style={{
                  backgroundImage: `url('${URL.createObjectURL(cover[0])}')`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",

                  width: 250,
                  height: 200,
                  borderRadius: 8,
                }}
              ></div>
              <div className="line-ellips tactr">{cover[0].name}</div>
              <div className="disclaimer">{formatFileSize(cover[0].size)}</div>
              <WarnButton style={{ padding: 8 }} onClick={() => cover[1](null)}>
                Remove
              </WarnButton>
            </div>
          ) : (
            <InputFileDnD
              label="Cover image"
              style={{ width: 200 }}
              icon="add_photo_alternate"
              accept={allowedImage.join(",")}
              onChange={handleFileInput}
              maxSizeMB={5}
              state={cover}
            />
          )}
        </div>

        <div className="flex-1">
          <TextInput
            placeholder="Ex: Statistical Intervals for a Single Sample"
            label="Quiz name (Leave blank to auto generate)"
            maxLength={64}
            state={name}
          />

          <TextAreaInput
            placeholder="Ex: This quiz will help me learn math by making me remember equations"
            label="Description (Leave blank to auto generate)"
            maxLength={128}
            height={128}
            state={description}
          />
        </div>
      </div>
    </div>
  );
}

function GeneratePanel() {
  const { prompt, source } = useQuizContext();
  const allowedTypes = ["application/pdf"];

  function handleFileInput(event: any) {
    const target = event.target as HTMLInputElement | null;
    if (!target) return;

    const file = target.files?.[0];
    const maxSizeBytes = 15 * 1024 * 1024;

    if (!file) {
      alert("Error reading file! Please try again");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert("Only .pdf documents are supported");
      return;
    }

    if (file.size > maxSizeBytes) {
      alert("File surpased maximum size");
      return;
    }

    return file;
  }

  return (
    <div className="flex-1 fade-in">
      <PanelHeader
        {...AvailableOptions.generate}
        desc="Controls how the quiz's content is generated"
      />

      <div className="flex-1 flex" style={{ gap: 30 }}>
        <div>
          <InputFileDnD
            label="Upload file (PDF)"
            style={{ width: 200, height: 150 }}
            icon="description"
            state={source}
            onChange={handleFileInput}
            maxSizeMB={15}
            accept={allowedTypes.join(",")}
          />
        </div>
        <div className="flex-1">
          <TextAreaInput
            placeholder="Ex: Make the questions about equations!"
            label="Tell us more about what you want?"
            maxLength={64}
            height={182}
            state={prompt}
          />
        </div>
      </div>
    </div>
  );
}

function OthersPanel() {
  return (
    <div className="flex coll flex-1 fade-in">
      <PanelHeader {...AvailableOptions.others} desc="Miscellaneous options" />
      <UnavailablePreviewPanel />
      <Padder height={64} />
    </div>
  );
}

function PanelHeader(p: { text: string; icon: string; desc?: string }) {
  return (
    <>
      <div className="flex aiend spbtw" style={{ gap: 28 }}>
        <div>
          <h3 style={{ textTransform: "capitalize" }}>{p.text}</h3>
          <Padder height={8} />
          <div className="disclaimer">{p?.desc}</div>
        </div>
        <Icon name={p.icon} size="3.4em" />
      </div>
      <Padder height={38} />
    </>
  );
}
