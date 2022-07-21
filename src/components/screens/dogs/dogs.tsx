import { Avatar, Badge, List, Skeleton, Typography } from "antd";
import { FC, memo, useEffect } from "react";
import { Link } from "react-router-dom";

import { dogeImageURL } from "@/app/constants/images";
import MainLayout from "@/components/shared/layout";
import {
  dogsLoadingSelector,
  dogsStateSelector,
} from "@/store/selectors/dogs.selectors";
import { useTypedDispatch, useTypedSelector } from "@/store/store";
import { getAllDogs } from "@/store/thunks/dogs.thunks";

import styles from "./assets/dogs.module.scss";

const { Text } = Typography;

const DogsPage: FC = () => {
  const dispatch = useTypedDispatch();
  const dogsEntities = useTypedSelector(dogsStateSelector);
  const isLoading = useTypedSelector(dogsLoadingSelector);

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  return (
    <MainLayout>
      <List
        className={styles.loadMoreList}
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={dogsEntities ?? []}
        pagination={{
          pageSize: 10,
        }}
        renderItem={item => (
          <Badge.Ribbon text={item.age}>
            <List.Item
              actions={[
                <Link key="open" to={`dog/${item.id}`}>
                  open
                </Link>,
              ]}
            >
              <Skeleton avatar active title={false} loading={isLoading}>
                <List.Item.Meta
                  avatar={<Avatar src={dogeImageURL} />}
                  title={<Text>{item.name}</Text>}
                  description={item.breed}
                />
              </Skeleton>
            </List.Item>
          </Badge.Ribbon>
        )}
      />
    </MainLayout>
  );
};

export default memo(DogsPage);
