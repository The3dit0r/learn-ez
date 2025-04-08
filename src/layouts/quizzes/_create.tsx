import { useState } from "react";
import { Icon } from "../../components/icons";

import TextInput from "../../components/input/text";

import { Padder } from "../../components/others";
import { SecButton } from "../../components/buttons";

export default function QuizCreatePanel() {
  const nameState = useState("");
  const descState = useState("");

  return (
    <div className="content-wrapper flex coll">
      <Padder height={64} />

      <div style={{ gap: 16 }} className="flex aictr">
        <Icon name="add_box" size={88} color="var(--color-prim)" />

        <div className="flex coll" style={{ gap: 8 }}>
          <h1>Generate a quiz</h1>
          <div className="disclaimer">
            Quizzes are currently saved on your device
          </div>
        </div>
      </div>

      <div style={{ padding: "32px 0", gap: 32 }} className="flex">
        <div className="flex coll" style={{ gap: 16, width: 180 }}>
          <Padder height={12} />
          <SecButton>General</SecButton>
          <SecButton>Source</SecButton>
        </div>

        <div style={{ border: "1px solid #fff7" }}></div>

        <div className="flex-1">
          <TextInput
            placeholder="Ex: Statistical Intervals for a Single Sample"
            label="Give your quiz a name (Leave blank to auto generate)"
            state={nameState}
          />

          <TextInput
            placeholder="Ex: This quiz will help me learn math by making me remember equations"
            label="Description"
            state={descState}
          />
        </div>
      </div>
    </div>
  );
}
