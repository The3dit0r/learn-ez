import { Icon } from "../../icons";
import "./index.css";

type Props = {
  label?: string;
  maxSizeMB?: number;
  icon?: string;
} & React.JSX.IntrinsicElements["div"];

export function InputFileDnD({
  maxSizeMB = 5,
  className,
  label,
  icon = "upload_file",
  ...rest
}: Props) {
  const clssArr = ["dft-input-file flex coll aictr jcctr"];
  if (className) {
    clssArr.push(className);
  }

  return (
    <>
      {!label || <div className="label">{label}</div>}
      <div className={clssArr.join(" ")} {...rest}>
        <Icon name={icon} size="4em" />
        <div className="flex coll aictr tactr" style={{ gap: 8 }}>
          <h4>Upload file here</h4>
          <div>(Maximum: {maxSizeMB} MB)</div>
        </div>
      </div>
    </>
  );
}
