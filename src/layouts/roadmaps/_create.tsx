import { Icon } from "../../components/icons";
import { Padder } from "../../components/others";

export default function RoadmapCreatePanel() {
  return (
    <div className="content-wrapper">
      <div className="content-wrapper flex coll">
        <Padder height={64} />

        <div style={{ gap: 16 }} className="flex aictr">
          <Icon name="edit_document" size={80} color="var(--color-prim)" />

          <div className="flex coll" style={{ gap: 8 }}>
            <h1>Create a roadmap</h1>
            <div className="disclaimer">
              Roadmap will be saved locally on your device
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
