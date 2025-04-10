import { useState } from "react";
import { Icon } from "../../components/icons";
import { Padder } from "../../components/others";
import { TextAreaInput, TextInput } from "../../components/input/text";
import {
  Button,
  CauButton,
  SecButton,
  WarnButton,
} from "../../components/buttons";
import { TabSelector } from "../../components/navigate/_tabselector";
import { useNavigate } from "react-router-dom";
import FileSelectModal from "../modals/_file_selector";

const AvailableOptions = {
  general: { text: "General info", id: "general", icon: "info" },
  generator: {
    text: "Generator settings",
    id: "generator",
    icon: "settings_applications",
  },
};

export default function RoadmapCreatePanel() {
  const nav = useNavigate();

  const modalState = useState(false);
  const panelState = useState("general");

  const source = useState<File | null>(null);
  const prompt = useState("");
  const name = useState("");
  const description = useState("");

  const openModal = () => modalState[1](true);

  return (
    <div className="content-wrapper">
      <div className="content-wrapper flex coll">
        <Padder height={64} />

        <div style={{ gap: 16 }} className="flex aictr">
          <Icon name="edit_document" size={80} color="var(--color-prim)" />

          <div className="flex coll" style={{ gap: 8 }}>
            <h1>Create a roadmap</h1>
            <div className="disclaimer">
              Roadmap will be saved locally on your device
            </div>
          </div>
        </div>
        <Padder height={64} />

        <div className="flex" style={{ gap: 32 }}>
          <TabSelector
            items={Object.values(AvailableOptions)}
            state={panelState}
          />

          <div style={{ border: "1px solid #fff4" }}></div>

          {
            {
              general: (
                <div className="flex-1">
                  <PanelHeader
                    text="General info"
                    icon="info"
                    desc="General information of the roadmap"
                  />
                  <Padder height={16} />

                  <TextInput
                    placeholder="Leave blank to auto generate"
                    label="Name"
                    maxLength={64}
                    state={name}
                  />

                  <TextAreaInput
                    placeholder="Leave blank to auto generate"
                    label="Description"
                    maxLength={128}
                    height={128}
                    state={description}
                  />
                </div>
              ),

              generator: (
                <div className="flex-1">
                  <PanelHeader
                    text="Generator settings"
                    icon="settings_applications"
                    desc="Controls how the roadmap is generated"
                  />
                  <Padder height={16} />

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
                          <WarnButton onClick={() => source[1](null)}>
                            Remove
                          </WarnButton>
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
                </div>
              ),
            }[panelState[0]]
          }
        </div>
      </div>

      <Padder height={32} />

      <div style={{ gap: 12 }} className="flex jcend">
        <Button onClick={() => nav(-1)}>Cancel</Button>
        <SecButton>Generate roadmap</SecButton>
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
