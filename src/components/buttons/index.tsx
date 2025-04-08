import "./index.css";

import { COLOR, StyleSize } from "../../utilities/type";

type Props = React.JSX.IntrinsicElements["div"] & {
  radius?: StyleSize;
  background?: string;
  color?: string;
  inactive?: boolean;
  disabled?: boolean;
};

export function Button(props: Props) {
  const {
    background,
    color,
    radius,
    className,
    style,
    children,
    inactive,
    disabled,
    ...rest
  } = props;

  const clssArr = ["dft-btt usn"];

  if (className) {
    clssArr.push(className);
  }

  if (background) {
    clssArr.push("filled");
  }

  if (inactive) {
    clssArr.push("inactive");
  }

  if (disabled) {
    clssArr.push("disabled");
  }

  return (
    <div
      className={clssArr.join(" ")}
      style={{
        ...style,
        borderRadius: radius,
        ...({
          "--bg": background,
          "--c": color,
        } as any),
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export function PriButton(props: Props) {
  return (
    <Button
      color={COLOR.SECONDARY}
      background={COLOR.PRIMARY}
      {...props}
    ></Button>
  );
}

export function SecButton(props: Props) {
  return (
    <Button color="#FFFFFF" background={COLOR.SECONDARY} {...props}></Button>
  );
}

export function CauButton(props: Props) {
  return (
    <Button color="#FFF" background={COLOR.TERTIARY_1} {...props}></Button>
  );
}

export function WarnButton(props: Props) {
  return <Button color="#FFF" background={COLOR.ERROR} {...props}></Button>;
}
