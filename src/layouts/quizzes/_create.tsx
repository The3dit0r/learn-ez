import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "../../components/icons";
import { TextAreaInput, TextInput } from "../../components/input/text";
import { Padder } from "../../components/others";
import {
  SecButton,
  Button,
  CauButton,
  WarnButton,
} from "../../components/buttons";
import UnavailablePreviewPanel from "../others";
import { TabSelector } from "../../components/navigate/_tabselector";
import FileSelectModal from "../modals/_file_selector";

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
          <TabSelector
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
  const { name, description } = useQuizContext();

  return (
    <div className="flex-1 fade-in">
      <PanelHeader
        {...AvailableOptions.general}
        desc="General information of the quiz"
      />
      <div className="flex" style={{ gap: 32 }}>
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
  const modalState = useState(false);
  const { prompt, source } = useQuizContext();

  const openModal = () => modalState[1](true);

  return (
    <div className="flex-1 fade-in">
      <PanelHeader
        {...AvailableOptions.generate}
        desc="Controls how the quiz's content is generated"
      />

      <div className="flex-1 flex coll">
        <div className="label">Source material (PDF)</div>
        <div className="flex" style={{ gap: 16 }}>
          <div className="dft-input-frame flex aictr flex-1">
            <span style={{ padding: "0 16px", fontWeight: 700 }}>
              {source[0]?.name || "No file selected"}
            </span>
          </div>
          {!source[0] ? (
            <SecButton onClick={openModal}>Select a file</SecButton>
          ) : (
            <>
              <WarnButton onClick={() => source[1](null)}>Remove</WarnButton>
              <CauButton onClick={openModal}>Change</CauButton>
            </>
          )}
        </div>
        <div>
          <TextAreaInput
            label="(Optional) Tell us more about what you want?"
            placeholder="Ex: Make the roadmap focus more on roadmaps"
            maxLength={256}
            height={130}
            state={prompt}
          />
        </div>
      </div>

      <FileSelectModal
        state={modalState}
        onFileConfirm={(file) => {
          if (file) source[1](file);
        }}
      />
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
