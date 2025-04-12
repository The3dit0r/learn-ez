import { useState } from "react";

import { Button } from "@components/buttons";
import { Icon } from "@components/icons";

import "./index.css";

type TabItems =
  | string
  | {
      text: string;
      icon?: string;
      id: string;
    };

type Props = {
  items?: TabItems[];
  state?: [string, React.Dispatch<React.SetStateAction<string>>];
  direction?: "vertical" | "horizontal";
} & React.JSX.IntrinsicElements["div"];

export function TabSelector({
  state: xtState,
  items = [],
  className,
  direction = "vertical",
  ...props
}: Props) {
  const localState = useState("");
  const clssArr = ["dft-tab-selector"];

  if (className) {
    clssArr.push(className);
  }

  clssArr.push(direction);

  const [activeKey, setActiveKey] = xtState || localState;

  function isActive(key: string) {
    return activeKey === key;
  }

  function getActiveDispatch(key: string) {
    return () => setActiveKey(key);
  }

  return (
    <div className={clssArr.join(" ")} {...props}>
      {items.map((item, index) => {
        let child = "",
          key = "opt-" + index,
          icon = "";

        if (typeof item === "string") {
          child = item;
        } else {
          child = item.text;
          key = item.id;
          icon = item.icon || "";
        }

        const active = isActive(key);

        return (
          <TaButton
            key={key}
            active={active}
            onClick={getActiveDispatch(key)}
            style={{
              justifyContent: "flex-start",
              gap: 16,
            }}
          >
            {!icon || <Icon size="1.7em" name={icon} />}
            {child}
          </TaButton>
        );
      })}
    </div>
  );
}

function TaButton(a: any) {
  return (
    <Button
      color={a.active ? "#2d473e" : "#fff"}
      background={a.active ? "var(--color-prim)" : ""}
      {...a}
    >
      {a.children}
    </Button>
  );
}
