import { Padder } from "@components/others";

export function UnavailablePreviewPanel() {
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

export function NoContentPanel() {
  return (
    <div className="flex aictr jcctr coll flex-1" style={{ gap: 64 }}>
      <img
        src={location.origin + "/assets/sad-box.png"}
        style={{ filter: "invert(1)", width: 200 }}
      />

      <p className="tactr">
        <div>You haven't generated any content yet</div>
        <div>but you can still change that</div>
      </p>
    </div>
  );
}
