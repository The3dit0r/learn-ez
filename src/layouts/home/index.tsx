import { Padder } from "../../components/others";
import UnavailablePreviewPanel from "../others";

type Props = {};

export function HomePanel({}: Props) {
  return (
    <div className="content-wrapper flex coll">
      <Padder height={64} />

      <div style={{ gap: 32 }} className="flex aiend">
        <div className="flex coll" style={{ gap: 8 }}>
          <div style={{ fontSize: "1.35em" }}>Welcome back</div>
          <h1 className="username-greet">GuestUser2025</h1>
        </div>
      </div>

      <UnavailablePreviewPanel />
    </div>
  );
}
