import { PlusCircleTwoTone } from "@ant-design/icons";
import { Avatar, Button, Comment, message } from "antd";
import classNames from "classnames";
import { FC, memo, ReactNode, useCallback, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { defaultProfileImage } from "@/app/constants/images";
import routes from "@/navigation/routes";
import {
  profileStateSelector,
  profileUserStateSelector,
} from "@/store/selectors/profile.selectors";
import { useTypedDispatch, useTypedSelector } from "@/store/store";
import { deleteArticle } from "@/store/thunks/article.thunks";
import {
  followProfile,
  getUserProfileByUsername,
  getUsersSettings,
  unfollowProfile,
} from "@/store/thunks/profile.thunks";
import { Article } from "@/types/types";

import styles from "../../assets/article.module.scss";

type ArticleActionsProps = {
  article: Article | null;
};

type SlugParams = {
  slug: string;
};

const ArticleActions: FC<ArticleActionsProps> = ({ article }) => {
  const { slug } = useParams<SlugParams>();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const user = useTypedSelector(profileUserStateSelector);
  const profile = useTypedSelector(profileStateSelector);
  const onArticleDelete = useCallback(async () => {
    const res = await dispatch(deleteArticle(slug ?? ""));
    if (res) {
      message.success("Article successfully deleted!");
      navigate(routes.HOME);
    }
  }, [dispatch, navigate, slug]);
  const createdAt = new Date(
    article?.createdAt ?? Date.now()
  ).toLocaleDateString("en-EN", options);
  const isCurrentUserArticle = article?.author?.username === user?.username;

  useEffect(() => {
    dispatch(getUsersSettings());
    article?.author?.username &&
      dispatch(getUserProfileByUsername(article?.author.username as string));
  }, [dispatch, article?.author?.username]);

  const handleClick = () => {
    if (profile?.following) {
      dispatch(unfollowProfile(article?.author?.username ?? ""));
    } else {
      dispatch(followProfile(article?.author?.username ?? ""));
    }
  };

  const actions: ReactNode[] = isCurrentUserArticle
    ? [
        <Button
          key="primary"
          type="primary"
          className={styles.editArticleButton}
          onClick={() => navigate(`/editor/${slug}`)}
        >
          Edit
        </Button>,
        <Button key="default" type="default" onClick={onArticleDelete}>
          Delete
        </Button>,
      ]
    : [
        <Button
          key="following"
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
        </Button>,
      ];
  return (
    <>
      <Comment
        actions={actions}
        author={
          <Link to={routes.PROFILE} className={styles.articleUsername}>
            {article?.author?.username}
          </Link>
        }
        avatar={
          <Avatar src={defaultProfileImage} alt={article?.author?.username} />
        }
        content={<div className="badge bg-primary text-wrap">{createdAt}</div>}
      />
    </>
  );
};

export default memo(ArticleActions);
