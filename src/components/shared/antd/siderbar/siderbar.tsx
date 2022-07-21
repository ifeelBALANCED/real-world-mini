import { Layout } from "antd";
import { FC } from "react";

import styles from "./assets/sidebar.module.scss";

type SideBarProps = {
  menu: JSX.Element;
};

const SideBar: FC<SideBarProps> = ({ menu }: SideBarProps) => {
  return (
    <Layout.Sider
      className={styles.sidebar}
      breakpoint={"lg"}
      theme="light"
      collapsedWidth={0}
      trigger={null}
    >
      {menu}
    </Layout.Sider>
  );
};
export default SideBar;
