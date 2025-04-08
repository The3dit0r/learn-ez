import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "../../components/icons";
import { TextAreaInput, TextInput } from "../../components/input/text";
import { Padder } from "../../components/others";
import { SecButton, Button } from "../../components/buttons";
import { TabSelectorVertical } from "../../components/navigate";
import { InputFileDnD } from "../../components/input/files";

const AvailableOptions = {
  general: { text: "General info", id: "general", icon: "info" },
  generate: { text: "Generator settings", id: "gener", icon: "book_4_spark" },
  others: { text: "Other options", id: "others", icon: "more_horiz" },
};

type ReactState<T> = [T, React.Dispatch<React.SetStateAction<T>>];

type QCT = {
  name: ReactState<string>;
  desc: ReactState<string>;
};

const QuizContext = createContext<QCT | null>(null);

export default function QuizCreatePanel() {
  const nav = useNavigate();
  const panelState = useState("general");

  const nameState = useState("");
  const descState = useState("");

  return (
    <div className="content-wrapper flex coll">
      <Padder height={64} />

      <div style={{ gap: 16 }} className="flex aictr">
        <Icon name="edit_document" size={80} color="var(--color-prim)" />

        <div className="flex coll" style={{ gap: 8 }}>
          <h1>Generate a quiz</h1>
          <div className="disclaimer">
            Quizzes wii be saved locally on your device
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

      <div style={{ padding: 32, gap: 12 }} className="flex jcend">
        <Button onClick={() => nav(-1)}>Cancel</Button>
        <SecButton>Generate quiz</SecButton>
      </div>
    </div>
  );
}

function GeneralPanel() {
  return (
    <div className="flex-1 fade-in">
      <PanelHeader
        {...AvailableOptions.general}
        desc="General information of the quiz"
      />
      <div className="flex" style={{ gap: 32 }}>
        <div>
          <InputFileDnD
            label="Cover image"
            style={{ width: 200, height: 150 }}
            icon="add_photo_alternate"
          />
        </div>

        <div className="flex-1">
          <TextInput
            placeholder="Ex: Statistical Intervals for a Single Sample"
            label="Quiz name (Leave blank to auto generate)"
            maxLength={64}
            // state={nameState}
          />

          <TextAreaInput
            placeholder="Ex: This quiz will help me learn math by making me remember equations"
            label="Description (Leave blank to auto generate)"
            maxLength={128}
            height={128}
            // state={descState}
          />
        </div>
      </div>
    </div>
  );
}

function GeneratePanel() {
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
            maxSizeMB={15}
            icon="description"
          />
        </div>
        <div className="flex-1">
          <TextAreaInput
            placeholder="Ex: Make the questions about equations!"
            label="Tell us more about what you want?"
            maxLength={64}
            height={182}
            // state={nameState}
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

      <div className="tactr flex coll aictr jcctr flex-1">
        <img src={location.origin + "/assets/sad.png"} width={88} />
        <Padder height={64} />

        <h4> This is a preview build</h4>

        <p>
          This section is currently unavailable
          <br /> We are sorry for any inconveniences
        </p>
      </div>

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
