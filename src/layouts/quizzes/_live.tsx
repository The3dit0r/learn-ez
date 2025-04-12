type Props = {};

import { Padder, QuestionContent } from "@components/others";
import { attempt } from "@utilities/test";
import { useState } from "react";

export default function QuizAttemptLivePanel({}: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(5);

  const attempts = attempt.attemptData;
  const question = attempts[currentQuestion].question;

  const progress = [4, 4, 4, 4, 4, 0, 2, 2, 2, 2];

  return (
    <div className="content-wrapper flex aictr jcctr">
      <div className="flex-1 flex coll" style={{ maxWidth: 900, gap: 16 }}>
        <div className="tactr">
          <h4>Quiz</h4>
          <h3>HTML, CSS & JavaScript Basics Assessment</h3>
        </div>
        <Padder height={64} />
        <div className="prog" style={{ height: 8 }}>
          {progress.map((a) => (
            <div className={"bar s-" + a}></div>
          ))}
        </div>
        <QuestionContent
          data={question}
          index={"uestion " + (currentQuestion + 1) + " / " + attempts.length}
          className="flex-1"
        />
        <Padder height={128} />
      </div>
    </div>
  );
}
