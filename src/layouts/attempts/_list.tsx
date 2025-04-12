import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { SecButton } from "@components/buttons";
import { Padder } from "@components/others";
import { Icon } from "@components/icons";
import CardItem from "@components/cards";

import { formatDate } from "@utilities/converter";
import { attempt } from "@utilities/test";

export default function AttemptListPanel() {
  const nav = useNavigate();
  const [attempts] = useState([attempt]);

  return (
    <div className="content-wrapper flex coll">
      <Padder height={64} />
      <div style={{ gap: 16 }} className="flex aiend">
        <Icon name="history" size={84} color="var(--color-prim)" />

        <div className="flex coll flex-1" style={{ gap: 8 }}>
          <h1>Quiz history</h1>
          <div className="disclaimer">These are your previous attempts</div>
        </div>

        <SecButton onClick={() => nav("/quiz/create")}>
          Take another quiz
        </SecButton>
      </div>

      <Padder height={64} />

      <div className="flex card-list scrollable hide-scroll">
        {attempts.map((att) => {
          const finalScore = att.attemptData.reduce(
            (a, b) => a + b.pointsReceived,
            0
          );
          const possibleScore = att.attemptData.reduce(
            (a, b) => a + b.question.maxScore,
            0
          );

          return (
            <CardItem
              title={att.quiz.label}
              onClick={() => nav("/attempt/eetu5e8")}
            >
              <h4>
                Final score: {finalScore} / {possibleScore}
              </h4>
              <div className="disclaimer">Taken on: {formatDate()}</div>
            </CardItem>
          );
        })}
      </div>
    </div>
  );
}
