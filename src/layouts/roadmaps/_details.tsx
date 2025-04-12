import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SecButton } from "@components/buttons";
import { Padder } from "@components/others";
import { Icon } from "@components/icons";

import { convertLLtoArr, formatDate } from "@utilities/converter";
import { roadmap } from "@utilities/test";

export default function RoadmapDetailsPanel() {
  const mouseOn = useRef(false);
  const nav = useNavigate();

  const list = convertLLtoArr(roadmap.startNode);

  const [transX, setTransX] = useState(300);
  const [transY, setTransY] = useState(200);

  const minX = -(list.length - 2) * (400 + 200);
  const maxX = 400;

  function handleMouseMove(e: React.MouseEvent) {
    if (!mouseOn.current) return;
    setTransX((a) => Math.min(maxX, Math.max(minX, a + e.movementX)));
    setTransY((a) => a + e.movementY);
  }

  function disableMove() {
    mouseOn.current = false;
  }

  useEffect(() => {
    window.addEventListener("blur", disableMove);

    return () => {
      window.removeEventListener("blur", disableMove);
    };
  }, []);

  return (
    <div className="content-wrapper">
      <Padder height={32} />
      <div
        className="flex aictr"
        style={{
          padding: 16,
          gap: 16,
          zIndex: 1,
          position: "relative",
        }}
      >
        <Icon name="conversion_path" size="6em" />

        <div style={{ lineHeight: "1.5" }} className="flex-1">
          <h3 style={{ color: "var(--color-prim)" }}>{roadmap.label}</h3>
          <div>{roadmap.description}</div>
          <div>Generated at: {formatDate()}</div>
        </div>

        <SecButton onClick={() => nav(-1)}>Return</SecButton>
      </div>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          cursor: "move",
        }}
        className="flex"
        onMouseMove={handleMouseMove}
        onMouseDown={() => {
          mouseOn.current = true;
        }}
        onMouseUp={() => {
          disableMove();
        }}
        onWheel={(e) => {
          setTransX((a) => a + e.deltaY / 100);
        }}
      >
        <div
          className="flex"
          style={{
            width: "fit-content",
            transform: `translate(${transX}px, ${transY}px)`,
          }}
        >
          {list.map((milestone, index) => {
            const progress = milestone.content.map((a) => a.status);
            const completed = progress.reduce(
              (a, b) => a + (b === 1 ? 1 : 0),
              0
            );

            const length = milestone.content.length;
            const percent = Math.floor((completed * 100) / length);

            return (
              <>
                <div className="flex coll" style={{ gap: 8, width: 400 }}>
                  <div className="frame flex coll border" style={{ gap: 24 }}>
                    <div style={{ fontSize: "0.83em" }}>
                      MILESTONE {index + 1}
                    </div>
                    <div className="flex coll" style={{ gap: 8 }}>
                      <h3>{milestone.label}</h3>
                      <div style={{ fontSize: "0.83em" }}>
                        {milestone.content.length} CHECKPOINTS
                      </div>
                    </div>

                    <div className="flex coll" style={{ gap: 8 }}>
                      <div>
                        {percent === 100 ? (
                          <b>Complete</b>
                        ) : (
                          <b>
                            {completed} / {length}
                            {" • "}
                            <span>{percent}% Complete</span>
                          </b>
                        )}
                      </div>
                      <div className="flex prog">
                        {progress.map((a) => (
                          <div className={"bar s-" + a}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="frame border" style={{ padding: "8px 0" }}>
                    {milestone.content.map((cp, j) => {
                      return (
                        <div
                          style={{ padding: "16px" }}
                          className="hover-bright"
                        >
                          <div style={{ fontSize: "0.83em" }}>
                            C{j} •{" "}
                            {
                              [
                                <span style={{ color: "var(--color-tert-1)" }}>
                                  IN PROGRESS
                                </span>,
                                <span style={{ color: "var(--color-ok)" }}>
                                  COMPLETED
                                </span>,
                                <span>NOT STARTED</span>,
                              ][cp.status]
                            }
                          </div>
                          <h4>{cp.label}</h4>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {!(list.length - index - 1) || (
                  <div
                    style={{
                      width: 200,
                      height: 2,
                      background: "var(--color-prim)",
                      marginTop: 95,
                    }}
                  ></div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
