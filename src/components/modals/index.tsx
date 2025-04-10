import { createContext, CSSProperties, useContext, useState } from "react";
import "./index.css";

type ModalData = {
  active?: boolean;
  setActive(a: boolean): void;
};

const ModalDataContext = createContext<ModalData>({
  active: false,
  setActive() {},
});

export function ModalDataProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);

  const value = {
    active,
    setActive,
  };

  return (
    <ModalDataContext.Provider value={value}>
      {children}
    </ModalDataContext.Provider>
  );
}

export function useModalData() {
  const data = useContext(ModalDataContext);

  if (!data) {
    throw new Error("useModalData must be used within a ModalDataProvider");
  }

  return data;
}

type Props = {
  boxWidth?: string | number;
  boxHeight?: string | number;
  modalClassName?: string;
  modalStyle?: CSSProperties;
} & React.JSX.IntrinsicElements["div"];

export function ModalWrapper(props: Props) {
  const { modalClassName, modalStyle, boxHeight, boxWidth, ...rest } = props;

  const modalClssArr = ["modal-box"];
  if (modalClassName) {
    modalClssArr.push(modalClassName);
  }

  return (
    <div {...rest} className="modal-wrapper flex aictr jcctr">
      <div
        className={modalClssArr.join(" ")}
        style={{
          ...modalStyle,
          width: boxWidth,
          height: boxHeight,
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
