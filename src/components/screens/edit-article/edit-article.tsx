import { Col, PageHeader } from "antd";
import { FC, memo } from "react";
import { useNavigate } from "react-router";

import EditArticleForm from "@/components/screens/edit-article/components/edit-article-form";
import routes from "@/navigation/routes";

import styles from "./assets/edit-article.module.scss";

const EditArticle: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.editFormPageHeader}>
      <PageHeader
        ghost={false}
        title={"Edit Article"}
        onBack={() => navigate(routes.HOME)}
      >
        <Col>
          <EditArticleForm />
        </Col>
      </PageHeader>
    </div>
  );
};

export default memo(EditArticle);
