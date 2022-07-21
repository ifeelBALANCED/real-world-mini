import { Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router";

import { AntContent, AntTabPane } from "@/components/shared/antd/ui";
import ArticlesList from "@/components/ui/articles-list/articles-list";
import { articleStateSelector } from "@/store/selectors/articles.selectors";
import { useTypedDispatch, useTypedSelector } from "@/store/store";
import {
  dislikeArticleAll,
  getAllArticles,
  likeArticleAll,
} from "@/store/thunks/article.thunks";

type UserParams = {
  username: string;
};

const UserArticles: FC = () => {
  const [activeTab, setActiveTab] = useState("my articles");
  const { username } = useParams<UserParams>();
  const allArticles = useTypedSelector(articleStateSelector);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(
      getAllArticles(
        activeTab === "my articles"
          ? {
              author: username ?? "",
              offset: 0,
              limit: 5,
            }
          : {
              favorited: username ?? "",
              offset: 0,
              limit: 5,
            }
      )
    );
  }, [activeTab, dispatch, username]);

  return (
    <AntContent>
      <Tabs
        defaultActiveKey={activeTab}
        onChange={currentTab => setActiveTab(currentTab)}
      >
        <AntTabPane key="my articles" tab="My Articles">
          {allArticles?.length === 0 ? (
            <p>No articles are here... yet.</p>
          ) : (
            <ArticlesList
              allArticles={allArticles}
              likeArticle={likeArticleAll}
              dislikeArticle={dislikeArticleAll}
            />
          )}
        </AntTabPane>
        <AntTabPane key="favorited articles" tab="Favorited Articles">
          {allArticles?.length === 0 ? (
            <p>No articles are here... yet.</p>
          ) : (
            <ArticlesList
              allArticles={allArticles}
              likeArticle={likeArticleAll}
              dislikeArticle={dislikeArticleAll}
            />
          )}
        </AntTabPane>
      </Tabs>
    </AntContent>
  );
};

export default UserArticles;
