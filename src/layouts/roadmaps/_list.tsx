import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SecButton } from "@components/buttons";
import { Padder } from "@components/others";
import { Icon } from "@components/icons";
import CardItem from "@components/cards";

import { roadmap } from "@utilities/test";
import { convertLLtoArr, formatDate } from "@utilities/converter";

export default function QuizzesListPanel() {
  const nav = useNavigate();
  const [roadmaps] = useState([roadmap]);

  return (
    <div className="content-wrapper flex coll">
      <Padder height={64} />
      <div style={{ gap: 16 }} className="flex aiend">
        <Icon name="conversion_path" size={84} color="var(--color-prim)" />

        <div className="flex coll flex-1" style={{ gap: 8 }}>
          <h1>Roadmaps (0)</h1>
          <div className="disclaimer">
            Roadmap are currently saved on your device
          </div>
        </div>

        <SecButton onClick={() => nav("/roadmap/create")}>
          <Icon name="add_circle" />
          Create
        </SecButton>
      </div>

      <Padder height={64} />

      <div className="flex-1 card-list">
        {roadmaps.map((r) => {
          const list = convertLLtoArr(r.startNode);
          const checkpoints = list
            .map((a) => a.content.length)
            .reduce((a, b) => a + b);

          return (
            <CardItem
              title={r.label}
              onClick={() => nav("/roadmap/hamburgerasde")}
            >
              <Padder height={16} />

              <h4>• {list.length} milestones</h4>
              <h4>• {checkpoints} checkpoints</h4>
              <div className="disclaimer">
                Create on: {formatDate(r.createdAt.toISOString())}
              </div>
            </CardItem>
          );
        })}
      </div>
    </div>
  );
}
