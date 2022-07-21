import { Col, PageHeader } from "antd";
import { FC, memo } from "react";
import { useNavigate } from "react-router";

import CreateDogForm from "@/components/screens/create-dog/components/create-dog-form";
import routes from "@/navigation/routes";

import styles from "./assets/create-dog.module.scss";

const CreateDog: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.createDogPageHeader}>
      <PageHeader
        ghost={false}
        title={"Create Dog"}
        onBack={() => navigate(routes.DOGS)}
      >
        <Col>
          <CreateDogForm />
        </Col>
      </PageHeader>
    </div>
  );
};

export default memo(CreateDog);
