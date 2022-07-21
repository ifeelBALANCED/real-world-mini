import { Menu } from "antd";

type TopicMenuProps = {
  topics: string[];
  selectedKey: string;
  changeSelectedKey: (event: { key: string }) => void;
};

const TopicMenu = ({
  topics,
  selectedKey,
  changeSelectedKey,
}: TopicMenuProps) => {
  const styledTopics: JSX.Element[] = [];
  const capitalizedTopic = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  topics.forEach(topic =>
    styledTopics.push(
      <Menu.Item key={topic.toLowerCase()} onClick={changeSelectedKey}>
        {capitalizedTopic(topic)}
      </Menu.Item>
    )
  );

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      defaultSelectedKeys={[selectedKey]}
    >
      {styledTopics}
    </Menu>
  );
};
export default TopicMenu;
