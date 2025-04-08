import { useState } from "react";
import { Button, PriButton, SecButton } from "../buttons";
import { Icon } from "../icons";

type TabItems =
  | string
  | {
      text: string;
      icon?: string;
      id: string;
    };

type Props = {
  items: TabItems[];
  state: [string, React.Dispatch<React.SetStateAction<string>>];
} & React.JSX.IntrinsicElements["div"];

export function TabSelectorVertical({
  state: xtState,
  items,
  className,
  ...props
}: Props) {
  const localState = useState("");
  const clssArr = ["dft-tab-selector vertical"];

  if (className) {
    clssArr.push(className);
  }

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
              padding: "16px 48px 16px 18px",
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
