import { useState } from "react";
import "./index.css";

type Props = {
  label?: string;
  error?: string;
  state?: [string, React.Dispatch<React.SetStateAction<string>>];
} & React.JSX.IntrinsicElements["input"];

const errorColor = "var(--color-tert-1)";

export default function TextInput(props: Props) {
  const localState = useState("");

  const { state: xtState, label, error, className, style, ...rest } = props;

  const clssArr = ["dft-input-frame text flex aictr spbtw"];
  if (className) {
    clssArr.push(className);
  }

  const state = xtState ?? localState;

  function handleInput(e: any) {
    state[1](e.target.value);
  }

  return (
    <>
      {!label || <div style={{ margin: "24px 0 8px 0" }}>{label}</div>}
      <div
        className={clssArr.join(" ")}
        style={{ ...style, borderColor: error ? errorColor : "" }}
      >
        <input
          {...rest}
          value={state[0]}
          onChange={handleInput}
          onInput={handleInput}
        />
        {!state[0] || (
          <div
            style={{
              padding: 16,
              cursor: "pointer",
              color: "var(--color-tert-1) ",
            }}
            onClick={() => state[1]("")}
          >
            Clear
          </div>
        )}
      </div>
      {!error || (
        <div style={{ margin: "8px 0 24px 0", color: errorColor }}>
          * {error}
        </div>
      )}
    </>
  );
}
