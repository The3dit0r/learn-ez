import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Icon, MainLogo } from "@components/icons";

import LayoutRouter from "@layouts/index";

import { useUserData } from "@context/user";
import LoginPanel from "@layouts/auth";

function App() {
  const { user } = useUserData();

  if (!user) {
    return (
      <div className="app-wrapper">
        <LoginPanel />
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <NavigationBar />
      <LayoutRouter />
    </div>
  );
}

export function NavigationBar() {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const [runner, setRunner] = useState(0);

  const options = [
    { icon: <MainLogo width="2em" />, name: "Home", path: "/" },
    {
      icon: <Icon name="history" />,
      name: "Quiz attempts",
      path: "/attempt",
    },
    {
      icon: <Icon name="conversion_path" />,
      name: "Roadmap",
      path: "/roadmap",
    },
    { icon: <Icon name="folder" />, name: "My Resource", path: "/resource" },
  ];

  function isActive(index: number) {
    return runner === index;
  }

  useEffect(() => {
    const [curPanel] = pathname.slice(1).split("/");

    const newRun = options.map((m) => m.path.slice(1)).indexOf(curPanel);
    setRunner(newRun);
  }, [pathname]);

  return (
    <div className="navigation-bar" style={{ fontSize: 16, zIndex: 1 }}>
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
              nav(item.path);
            }}
            key={"item-" + index}
          >
            {item.icon}
          </div>
        );
      })}

      {runner < 0 || (
        <div
          className="running-bar"
          style={{
            transform: `translateY(calc(11px + ${72 * runner}px))`,
            transition: "all 0.1s",
          }}
        ></div>
      )}
    </div>
  );
}

export default App;
