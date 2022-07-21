import { PlusCircleTwoTone } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  PageHeader,
  Row,
  Skeleton,
  Typography,
} from "antd";
import classNames from "classnames";
import { FC, memo, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import styles from "@/components/screens/dog/assets/dog.module.scss";
import UserArticles from "@/components/ui/user-articles/user-articles";
import routes from "@/navigation/routes";
import {
  profileLoadingSelector,
  profileStateSelector,
  profileUserStateSelector,
} from "@/store/selectors/profile.selectors";
import { useTypedDispatch, useTypedSelector } from "@/store/store";
import {
  followProfile,
  getUserProfileByUsername,
  getUsersSettings,
  unfollowProfile,
} from "@/store/thunks/profile.thunks";

const { Paragraph, Text } = Typography;

type UserParams = {
  username: string;
};

const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const { username } = useParams<UserParams>();
  const dispatch = useTypedDispatch();
  const settingsInfo = useTypedSelector(profileUserStateSelector);
  const isLoading = useTypedSelector(profileLoadingSelector);
  const profile = useTypedSelector(profileStateSelector);

  useEffect(() => {
    dispatch(getUsersSettings());
    dispatch(getUserProfileByUsername(username ?? ""));
  }, [dispatch, username]);

  const isCurrentUser = username === settingsInfo?.username;

  const handleClick = () => {
    if (profile?.following) {
      dispatch(unfollowProfile(username ?? ""));
    } else {
      dispatch(followProfile(username ?? ""));
    }
  };

  return (
    <div className={styles.pageHeaderGhostWrapper}>
      <Skeleton avatar active title={false} loading={isLoading}>
        <PageHeader
          ghost={false}
          title={isCurrentUser ? settingsInfo?.username : username}
          onBack={() => navigate(routes.HOME)}
        >
          <Col>
            {isCurrentUser ? (
              <Col>
                <Avatar
                  shape="square"
                  size={64}
                  src={"https://joeschmoe.io/api/v1/random"}
                  className={classNames(styles.settingsAvatar)}
                />
                <Descriptions
                  size="small"
                  column={1}
                  className={styles.descriptions}
                >
                  <Descriptions.Item label={<Text strong>Username</Text>}>
                    <Paragraph copyable={{ tooltips: false }}>
                      {settingsInfo?.username}
                    </Paragraph>
                  </Descriptions.Item>
                  <Descriptions.Item label={<Text strong>Email</Text>}>
                    <Paragraph copyable={{ tooltips: false }}>
                      {settingsInfo?.email}
                    </Paragraph>
                  </Descriptions.Item>
                  <Descriptions.Item label={<Text strong>Bio</Text>}>
                    <Paragraph copyable={{ tooltips: false }}>
                      {settingsInfo?.bio === "" && "empty"}
                    </Paragraph>
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            ) : (
              <Row align="middle" justify="space-between">
                <Avatar
                  shape="square"
                  size={64}
                  src={"https://joeschmoe.io/api/v1/random"}
                  className={classNames(styles.settingsAvatar)}
                />
                <Button
                  type="primary"
                  className={classNames("d-flex align-items-center")}
                  icon={<PlusCircleTwoTone />}
                  size={"middle"}
                  onClick={handleClick}
                >
                  <span className={classNames("mx-1")}>
                    {profile?.following ? "Unfollow" : "Follow"}
                  </span>
                  <span>{profile?.username}</span>
                </Button>
              </Row>
            )}
            <UserArticles />
          </Col>
        </PageHeader>
      </Skeleton>
    </div>
  );
};

export default memo(ProfilePage);
