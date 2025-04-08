import { CSSProperties } from "react";
import "./index.css";

type Props = {
  name: string;
  size?: CSSProperties["fontSize"];
  fill?: boolean;
  clickable?: boolean;
  cursor?: CSSProperties["cursor"];
} & React.JSX.IntrinsicElements["span"];

export function Icon({
  name,
  size,
  style,
  className,
  color,
  fill,
  clickable,
  cursor,
  onClick,
  ...spanProps
}: Props) {
  const clssArr = ["dft-icon material-symbols-rounded"];
  if (className) {
    clssArr.push(className);
  }

  return (
    <span
      className={clssArr.join(" ")}
      style={{
        ...style,
        fontSize: size,
        userSelect: "none",
        color: color,
        fontVariationSettings: fill
          ? "'FILL' 1, 'wght' 500, 'opsz' 48"
          : "'wght' 500, 'opsz' 48",

        cursor,
      }}
      onClick={onClick}
      {...spanProps}
    >
      {name}
    </span>
  );
}
