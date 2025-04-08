type TabItems =
  | string
  | {
      text: string;
      color: string;
      id: string;
    };

type Props = {
  items: TabItems[];
};

export default function TabSelector({}: Props) {
  return <div className="dft-tab-selector"></div>;
}
