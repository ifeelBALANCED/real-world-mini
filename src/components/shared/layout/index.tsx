import { Layout } from "antd";
import { FC, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "@/components/shared/antd/navbar/navbar";
import SideBar from "@/components/shared/antd/siderbar/siderbar";
import TopicMenu from "@/components/shared/antd/topic-menu";
import { usePathname } from "@/hooks/usePathname";

import styles from "./assets/layout.module.scss";

type LayoutProps = {
  children?: ReactNode;
};

const MainLayout: FC<LayoutProps> = ({ children }) => {
  const topics = ["dogs", "home", "users"];
  const pathname = usePathname();
  const [_, defaultSelectedKey] = pathname.split("/");
  const [, setContentIndex] = useState(defaultSelectedKey);
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);
  const navigate = useNavigate();
  const changeSelectedKey = (event: { key: string }) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(key);
    navigate(`/${key.toLowerCase()}`);
  };
  const Menu = (
    <TopicMenu
      topics={topics}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );

  return (
    <div>
      <NavBar menu={Menu} />
      <Layout>
        <SideBar menu={Menu} />
        <Layout.Content className={styles.content}>{children}</Layout.Content>
      </Layout>
    </div>
  );
};

export default MainLayout;
