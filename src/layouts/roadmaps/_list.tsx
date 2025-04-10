import { useNavigate } from "react-router-dom";
import { Icon } from "../../components/icons";
import { Padder } from "../../components/others";
import { SecButton } from "../../components/buttons";

export default function QuizzesListPanel() {
  return (
    <div className="content-wrapper flex coll">
      <Padder height={64} />
      <div style={{ gap: 16 }} className="flex aiend">
        <Icon name="conversion_path" size={84} color="var(--color-prim)" />

        <div className="flex coll" style={{ gap: 8 }}>
          <h1>Roadmaps (0)</h1>
          <div className="disclaimer">
            Roadmap are currently saved on your device
          </div>
        </div>
      </div>

      <Nothing />
    </div>
  );
}

const panelProps = {
  className: "flex aictr jcctr coll flex-1",
  style: { gap: 64 },
};

function Nothing() {
  const nav = useNavigate();

  return (
    <div {...panelProps}>
      <img
        src={location.origin + "/assets/sad-box.png"}
        style={{ filter: "invert(1)", width: 200 }}
      />

      <p className="tactr">
        <div>You haven't generated any roadmap yet</div>
        <div>But you can change that!</div>
      </p>

      <SecButton onClick={() => nav("/roadmap/create")}>
        <Icon name="add_circle" />
        Create a roadmap
      </SecButton>
    </div>
  );
}
