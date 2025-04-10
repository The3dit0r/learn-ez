import { Icon } from "../../components/icons";
import { Padder } from "../../components/others";

type Props = {};

export function ResourceListPanel({}: Props) {
  return (
    <div className="content-wrapper flex coll">
      <Padder height={64} />
      <div style={{ gap: 16 }} className="flex aictr">
        <Icon name="folder" size={84} color="var(--color-prim)" />

        <div className="flex coll" style={{ gap: 8 }}>
          <h1>Uploaded files</h1>
        </div>
      </div>
    </div>
  );
}
