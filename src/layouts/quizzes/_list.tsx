import { useNavigate } from "react-router-dom";

import { SecButton } from "../../components/buttons";
import { Padder } from "../../components/others";
import { Icon } from "../../components/icons";

const panelProps = {
  className: "flex aictr jcctr coll flex-1",
  style: { gap: 64 },
};

export default function QuizzesListPanel() {
  return (
    <div className="content-wrapper flex coll">
      <Padder height={64} />
      <div style={{ gap: 16 }} className="flex aiend">
        <Icon name="docs" size={84} color="var(--color-prim)" />

        <div className="flex coll" style={{ gap: 8 }}>
          <h1>Your quizzes (0)</h1>
          <div className="disclaimer">
            Quizzes are currently saved on your device
          </div>
        </div>
      </div>

      <NoQuizzes />
    </div>
  );
}

function NoQuizzes() {
  const nav = useNavigate();

  return (
    <div {...panelProps}>
      <img
        src={location.origin + "/assets/empty-box.png"}
        style={{ filter: "invert(1)", width: 200 }}
      />

      <p className="tactr">
        <div>You haven't generated any quizzes yet</div>
        <div>Generate a quiz by uploading the material</div>
      </p>

      <SecButton onClick={() => nav("/quiz/create")}>
        <Icon name="create" />
        Create a quiz
      </SecButton>
    </div>
  );
}
