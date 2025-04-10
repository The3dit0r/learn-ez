import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Icon, MainLogo } from "./components/icons";

import LayoutRouter from "./layouts";

function App() {
  return (
    <div className="app-wrapper">
      <NavigationBar />
      <LayoutRouter />
    </div>
  );
}

export function NavigationBar() {
  const nav = useNavigate();
  const [runTrans, setRunTrans] = useState(0);

  const options = [
    { icon: <MainLogo width="2em" />, name: "Home", path: "/" },
    { icon: <Icon name="quiz" />, name: "Quiz", path: "/quiz" },
    {
      icon: <Icon name="conversion_path" />,
      name: "Roadmap",
      path: "/roadmap",
    },
    { icon: <Icon name="folder" />, name: "My Resource", path: "/resource" },
  ];

  function isActive(index: number) {
    return runTrans === index;
  }

  return (
    <div className="navigation-bar" style={{ fontSize: 16 }}>
      {options.map((item, index) => {
        if (!item) {
          return <div className="sep"></div>;
        }

        const clssArr = ["option"];

        if (isActive(index)) {
          clssArr.push("active");
        }

        return (
          <div
            className={clssArr.join(" ")}
            onClick={() => {
              setRunTrans(index);
              nav(item.path);
            }}
          >
            {item.icon}
          </div>
        );
      })}

      <div
        className="running-bar"
        style={{
          transform: `translateY(calc(11px + ${72 * runTrans}px))`,
          transition: "all 0.1s",
        }}
      ></div>
    </div>
  );
}

export default App;
