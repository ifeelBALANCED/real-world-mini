import {
  Button,
  Col,
  Descriptions,
  Image,
  message,
  PageHeader,
  Skeleton,
  Typography,
} from "antd";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { dogeImageURL } from "@/app/constants/images";
import EditDogForm from "@/components/screens/dog/components/edit-dog-form";
import routes from "@/navigation/routes";
import {
  dogLoadingSelector,
  dogStateSelector,
} from "@/store/selectors/dog.selectors";
import { useTypedDispatch, useTypedSelector } from "@/store/store";
import { deleteDog, getOneDog } from "@/store/thunks/dog.thunks";

import styles from "./assets/dog.module.scss";

type DogParams = {
  dogId: string;
};

const { Paragraph, Text } = Typography;

const Dog: FC = () => {
  const { dogId } = useParams<DogParams>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const dispatch = useTypedDispatch();
  const { dog } = useTypedSelector(dogStateSelector);
  const isLoading = useTypedSelector(dogLoadingSelector);
  const navigate = useNavigate();

  const onDogEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const onCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const onDeleteDog = useCallback(async () => {
    const res = dogId && (await dispatch(deleteDog(dogId)));
    if (res) {
      message.success("Dog successfully deleted!");
      navigate(routes.DOGS);
    }
  }, [dispatch, dogId, navigate]);

  useEffect(() => {
    dogId && dispatch(getOneDog(dogId));
  }, [dispatch, dogId]);

  return (
    <div className={styles.pageHeaderGhostWrapper}>
      <Skeleton avatar active title={false} loading={isLoading}>
        <PageHeader
          ghost={false}
          title={dog?.name}
          extra={
            !isEditing
              ? [
                  <Button key="2" type="primary" onClick={onDogEdit}>
                    Edit
                  </Button>,
                  <Button key="1" type="default" onClick={onDeleteDog}>
                    Delete
                  </Button>,
                ]
              : [
                  <Button key="1" type="default" onClick={onCancel}>
                    Cancel
                  </Button>,
                ]
          }
          onBack={() => navigate(routes.DOGS)}
        >
          <Col>
            <Image width={200} src={dogeImageURL} preview={false} />
            {isEditing ? (
              <EditDogForm />
            ) : (
              <Descriptions
                size="small"
                column={1}
                className={styles.descriptions}
              >
                <Descriptions.Item label={<Text strong>Name</Text>}>
                  <Paragraph copyable={{ tooltips: false }}>
                    {dog?.name}
                  </Paragraph>
                </Descriptions.Item>
                <Descriptions.Item label={<Text strong>Age</Text>}>
                  <Paragraph copyable={{ tooltips: false }}>
                    {dog?.age}
                  </Paragraph>
                </Descriptions.Item>
                <Descriptions.Item label={<Text strong>Breed</Text>}>
                  <Paragraph copyable={{ tooltips: false }}>
                    {dog?.breed}
                  </Paragraph>
                </Descriptions.Item>
              </Descriptions>
            )}
          </Col>
        </PageHeader>
      </Skeleton>
    </div>
  );
};

export default memo(Dog);
