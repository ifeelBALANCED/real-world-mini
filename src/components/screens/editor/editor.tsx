import { Col, PageHeader } from "antd";
import { FC, memo } from "react";
import { useNavigate } from "react-router";

import EditorForm from "@/components/screens/editor/components/editor-form";
import routes from "@/navigation/routes";

import styles from "./assets/editor.module.scss";

const Editor: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.editorPageHeader}>
      <PageHeader
        ghost={false}
        title={"Create Article"}
        onBack={() => navigate(routes.HOME)}
      >
        <Col>
          <EditorForm />
        </Col>
      </PageHeader>
    </div>
  );
};

export default memo(Editor);
