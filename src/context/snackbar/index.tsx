import { createContext, ReactNode, useContext, useRef, useState } from "react";
import "./index.css";

import { Icon } from "@components/icons";

type SBT = {
  text: ReactNode;
  color: string;
  icon: string;
  active: boolean;
};

type ToggleProps = Partial<{
  text?: string;
  color?: string;
  icon?: string;
  duration?: number;
}>;

type SBM = [(props: ToggleProps) => void, () => void];

const SnackbarContext = createContext<SBM | null>(null);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const timeoutRef = useRef(setTimeout(() => {}));

  const [text, setText] = useState<SBT["text"]>("");
  const [color, setColor] = useState<SBT["color"]>("var(--color-prim)");
  const [icon, setIcon] = useState<SBT["icon"]>("info");
  const [active, setActive] = useState<SBT["active"]>(false);

  function toggle(props: ToggleProps): void {
    setText(props.text || "");
    setColor(props.color || "var(--color-prim)");
    setIcon(props.icon || "info");
    setActive(true);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(close, props.duration || 3000);
  }

  function close(): void {
    setActive(false);
  }

  const value: SBM = [toggle, close];

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <div className={"snackbar-wrapper " + (active ? "active" : "")}>
        <div className="snackbar" style={{ borderColor: color }}>
          <Icon name={icon} />
          <div className="flex-1" style={{ minWidth: 300 }}>
            {text}
          </div>
          <div style={{ color: "var(--color-prim)" }} onClick={close}>
            OK
          </div>
        </div>
      </div>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const data = useContext(SnackbarContext);

  if (!data) {
    throw new Error("useSnackbar must be used within it's provided context");
  }

  return data;
}
