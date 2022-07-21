import { Row, Spin } from "antd";
import { FC } from "react";

import styles from "./assets/loader.module.scss";

const Loader: FC = () => {
  return (
    <Row justify="center" align="middle" className={styles.loader}>
      <Spin size={"large"} tip="Loading..." />
    </Row>
  );
};

export default Loader;
