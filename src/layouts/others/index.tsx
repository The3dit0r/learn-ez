import { Padder } from "../../components/others";

export default function UnavailablePreviewPanel() {
  return (
    <div className="tactr flex coll aictr jcctr flex-1">
      <img src={location.origin + "/assets/sad.png"} width={88} />
      <Padder height={64} />

      <h4>This is a preview build</h4>

      <p>
        This section is currently unavailable
        <br /> We are sorry for any inconveniences
      </p>
    </div>
  );
}
