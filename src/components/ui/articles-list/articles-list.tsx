import { HeartFilled } from "@ant-design/icons";
import { Avatar, Button, List } from "antd";
import classNames from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";

import { defaultProfileImage } from "@/app/constants/images";
import { AntText, AntTitle } from "@/components/shared/antd/ui";
import styles from "@/components/ui/user-articles/assets/user-articles.module.scss";
import { articleLoadingSelector } from "@/store/selectors/articles.selectors";
import { useTypedDispatch, useTypedSelector } from "@/store/store";
import { Article } from "@/types/types";

type ArticlesListProps = {
  allArticles: Article[];
  likeArticle: any;
  dislikeArticle: any;
};

const ArticlesList: FC<ArticlesListProps> = ({
  allArticles,
  likeArticle,
  dislikeArticle,
}: ArticlesListProps) => {
  const initLoading = useTypedSelector(articleLoadingSelector);
  const dispatch = useTypedDispatch();

  return (
    <List
      loading={initLoading}
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={allArticles}
      renderItem={item => {
        const options: Intl.DateTimeFormatOptions = {
          year: "numeric",
          month: "short",
          day: "numeric",
        };

        const createdAt = new Date(
          item?.createdAt ?? Date.now()
        ).toLocaleDateString("en-EN", options);

        const handleLick = () => {
          if (item?.favorited) {
            dispatch(dislikeArticle(item?.slug));
          } else {
            dispatch(likeArticle(item?.slug));
          }
        };

        return (
          <List.Item
            actions={[
              <Button
                key="primary"
                className={classNames([
                  "d-flex align-items-center px-2",
                  styles.button,
                ])}
                type="primary"
                color="#5CB85C"
                icon={<HeartFilled className="" />}
                size={"small"}
                onClick={handleLick}
              >
                {item?.favoritesCount}
              </Button>,
              <Link
                key="read more"
                to={`/user-article/${item?.slug}`}
                className="text-dark"
              >
                Read more...
              </Link>,
              <div key="tagList">
                {item?.tagList?.map(tag => (
                  <span key={tag} className={classNames(styles.tagListItem)}>
                    {tag}
                  </span>
                ))}
              </div>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={defaultProfileImage} />}
              title={
                <Link to={`/${item?.author?.username}`}>
                  {item?.author?.username}
                </Link>
              }
              description={
                <div className="badge bg-info text-wrap">{createdAt}</div>
              }
            />
            <AntTitle level={4}>{item?.title}</AntTitle>
            <AntText>{item?.description}</AntText>
          </List.Item>
        );
      }}
    />
  );
};

export default ArticlesList;
