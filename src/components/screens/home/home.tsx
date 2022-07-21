import { InfoCircleTwoTone } from "@ant-design/icons";
import { Skeleton, Tabs } from "antd";
import classNames from "classnames";
import { FC, memo, useEffect, useState } from "react";

import { AntTabPane } from "@/components/shared/antd/ui";
import MainLayout from "@/components/shared/layout";
import ArticlesList from "@/components/ui/articles-list/articles-list";
import { articleStateSelector } from "@/store/selectors/articles.selectors";
import {
  homeLoadingSelector,
  homeStateSelector,
  tagsStateSelector,
} from "@/store/selectors/home.selectors";
import { useTypedDispatch, useTypedSelector } from "@/store/store";
import {
  dislikeArticleAll,
  getAllArticles,
  likeArticleAll,
} from "@/store/thunks/article.thunks";
import {
  dislikeArticleFeed,
  getCurrentUserFeed,
  getTags,
  likeArticleFeed,
} from "@/store/thunks/home.thunks";

import styles from "./assets/home.module.scss";

const HomePage: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("your feed");
  const [selectedTag, setSelectedTag] = useState<string>("");
  const dispatch = useTypedDispatch();
  const userFeed = useTypedSelector(homeStateSelector);
  const allArticles = useTypedSelector(articleStateSelector);
  const tagsList = useTypedSelector(tagsStateSelector);
  const isLoading = useTypedSelector(homeLoadingSelector);

  useEffect(() => {
    if (activeTab === "your feed") {
      dispatch(getCurrentUserFeed({ limit: 10, offset: 0 }));
    } else if (activeTab === "global feed") {
      dispatch(getAllArticles({ limit: 10, offset: 0 }));
    } else {
      dispatch(
        getAllArticles({
          limit: 10,
          offset: 0,
          tag: selectedTag,
        })
      );
    }
    dispatch(getTags());
  }, [activeTab, dispatch, selectedTag]);

  return (
    <MainLayout>
      <div className="container page">
        <Skeleton active title={false} loading={isLoading}>
          <div className="row">
            <div className="col-md-9">
              <Tabs
                activeKey={activeTab}
                defaultActiveKey={activeTab}
                onChange={currentTab => setActiveTab(currentTab)}
              >
                <AntTabPane key="your feed" tab="Your Feed">
                  {userFeed?.articles?.length === 0 ? (
                    <p>No articles are here... yet.</p>
                  ) : (
                    <ArticlesList
                      allArticles={userFeed?.articles ?? []}
                      likeArticle={likeArticleFeed}
                      dislikeArticle={dislikeArticleFeed}
                    />
                  )}
                </AntTabPane>
                <AntTabPane key="global feed" tab="Global Feed">
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
                {!["your feed", "global feed"].includes(activeTab) && (
                  <AntTabPane
                    key={selectedTag}
                    tab={
                      <span className={"d-flex align-items-center"}>
                        <InfoCircleTwoTone />
                        {selectedTag}
                      </span>
                    }
                  >
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
                )}
              </Tabs>
            </div>
            <div className="col-md-3">
              <div className={classNames("sidebar", styles.tagList)}>
                <p className={classNames(styles.popularTags)}>Popular Tags</p>
                <div className={classNames("tag-list")}>
                  {tagsList?.map(tag => (
                    <span
                      key={tag}
                      className={classNames(styles.tag)}
                      onClick={() => {
                        setSelectedTag(tag);
                        setActiveTab(tag);
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
    </MainLayout>
  );
};

export default memo(HomePage);
