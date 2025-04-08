import {
  CauButton,
  PriButton,
  SecButton,
  WarnButton,
} from "../../components/buttons";
import { Icon } from "../../components/icons";

export function ComponentTestingPanel() {
  return (
    <div className="flex aictr jcctr coll" style={{ height: "100%", gap: 8 }}>
      <PriButton>Save</PriButton>
      <SecButton>Return</SecButton>
      <CauButton>Discard</CauButton>
      <CauButton>
        <Icon name="inventory_2" />
        <div>Archived</div>
      </CauButton>
      <WarnButton>
        <Icon name="delete" />
        Remove
      </WarnButton>
    </div>
  );
}
