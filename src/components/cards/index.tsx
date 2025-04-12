import "./index.css";

type Props = {
  cover?: string;
  title?: string;
  desc?: string;
} & React.JSX.IntrinsicElements["div"];

export default function CardItem(props: Props) {
  const { cover, title, desc, className, ...rest } = props;

  const clssArr = ["dft-card-item"];
  if (className) {
    clssArr.push(className);
  }

  return (
    <div className={clssArr.join(" ")} {...rest}>
      <div
        className="cover"
        style={
          {
            // backgroundImage: `url('${cover}')`,
          }
        }
      ></div>
      <div className="info">
        <h4 className="title">{title}</h4>
        <div className="desc">{desc}</div>

        {props.children}
      </div>
    </div>
  );
}
