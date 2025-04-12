import { useNavigate } from "react-router-dom";

import { Button, SecButton, WarnButton } from "@components/buttons";
import { Padder, QuestionContent } from "@components/others";

import { attempt } from "@utilities/test";

export default function AttemptDetailsPanel() {
  const nav = useNavigate();
  const { attemptData } = attempt;

  const finalScore = attemptData.reduce((a, b) => a + b.pointsReceived, 0);
  const possibleScore = attemptData.reduce(
    (a, b) => a + b.question.maxScore,
    0
  );

  return (
    <div className="content-wrapper flex jcctr coll">
      <div className="flex aictr">
        <div
          className="flex coll"
          style={{
            backgroundColor: "#1a2824",

            width: 370,
            height: "calc(100% - 32px)",
            padding: 16,

            gap: 16,

            borderRadius: 16,
          }}
        >
          <div
            className="cover test-cover"
            style={{
              width: "100%",
              aspectRatio: "10 / 7",
              borderRadius: 8,
            }}
          ></div>

          <div className="info">
            <div>Attempt history for</div>
            <Padder height={16} />
            <div>
              <div className="flex coll" style={{ gap: 16 }}>
                <h3>{attempt.quiz.label}</h3>
                <h4>{attempt.attemptData.length} questions</h4>
              </div>
            </div>
          </div>

          <div className="flex-1 flex coll jcctr">
            <h4>FINAL SCORE</h4>
            <h1>
              {finalScore} / {possibleScore}
            </h1>
          </div>

          <div className="flex coll">
            <Button
              onClick={() => {
                nav(-1);
              }}
            >
              Return
            </Button>
          </div>
        </div>

        <div
          className="flex-1 scrollable"
          style={{ padding: 16, height: "calc(100vh - 16px)" }}
        >
          {attemptData.map((attempt, index) => {
            return (
              <QuestionContent
                data={attempt.question}
                index={index + 1}
                score={attempt.pointsReceived}
                choice={attempt.userAnswer}
                showAnswer
                className="lock"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
