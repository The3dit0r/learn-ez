import { useState } from "react";
import "./index.css";

type Props<Element extends keyof React.JSX.IntrinsicElements> = {
  label?: string;
  error?: string;
  width?: number;
  height?: number;
  state?: [string, React.Dispatch<React.SetStateAction<string>>];
} & React.JSX.IntrinsicElements[Element];

const errorColor = "var(--color-tert-1)";

export function TextInput(props: Props<"input">) {
  const localState = useState("");

  const { state: xtState, label, error, className, style, ...rest } = props;

  const clssArr = ["dft-input-frame text flex aictr spbtw"];
  if (className) {
    clssArr.push(className);
  }

  const state = xtState ?? localState;
  const maxLength = props.maxLength || 256;

  function handleInput(e: any) {
    state[1](e.target.value.slice(0, maxLength));
  }

  return (
    <>
      {!label || <div className="label">{label}</div>}
      <div
        className={clssArr.join(" ")}
        style={{ ...style, borderColor: error ? errorColor : "" }}
      >
        <input
          {...rest}
          value={state[0]}
          onChange={handleInput}
          onInput={handleInput}
          maxLength={maxLength}
        />
        {!state[0] || (
          <div
            className="flex aiend"
            style={{ padding: "0 16px 0 0", gap: 12 }}
          >
            <div style={{ whiteSpace: "nowrap" }}>
              {state[0].length}/{maxLength}
            </div>
            <div
              style={{
                cursor: "pointer",
                color: "var(--color-tert-1)",
              }}
              onClick={() => state[1]("")}
            >
              Clear
            </div>
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

export function TextAreaInput(props: Props<"textarea">) {
  const localState = useState("");

  const { state: xtState, label, error, className, style, ...rest } = props;

  const clssArr = ["dft-input-frame textarea flex aictr spbtw"];
  if (className) {
    clssArr.push(className);
  }

  const state = xtState ?? localState;
  const maxLength = props.maxLength || 256;

  function handleInput(e: any) {
    state[1](e.target.value.slice(0, maxLength));
  }

  return (
    <>
      {!label || <div className="label">{label}</div>}
      <div
        className={clssArr.join(" ")}
        style={{
          height: props.height,
          ...style,
          borderColor: error ? errorColor : "",
        }}
      >
        <textarea
          {...rest}
          onInput={handleInput}
          maxLength={maxLength}
          value={state[0]}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              return;
            }
          }}
        ></textarea>
        {!state[0] || (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: 16,
              gap: 12,
            }}
            className="flex aiend"
          >
            <div style={{ fontSize: "0.8em" }}>
              {state[0].length}/{maxLength}
            </div>
            <div
              style={{
                cursor: "pointer",
                color: "var(--color-tert-1)",
              }}
              onClick={() => state[1]("")}
            >
              Clear
            </div>
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
