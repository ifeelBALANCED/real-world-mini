import { Avatar, Col, Comment, PageHeader, Skeleton } from "antd";
import classNames from "classnames";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { defaultProfileImage } from "@/app/constants/images";
import ArticleActions from "@/components/screens/article/components/article-actions/article-actions";
import CommentList from "@/components/screens/article/components/comments/comments";
import CreateComment from "@/components/screens/article/components/create-comment/create-comment";
import {
  articleLoadingSelector,
  singleArticleStateSelector,
} from "@/store/selectors/articles.selectors";
import { profileUserStateSelector } from "@/store/selectors/profile.selectors";
import { useTypedDispatch, useTypedSelector } from "@/store/store";
import { getSingleArticle } from "@/store/thunks/article.thunks";
import { getUsersSettings } from "@/store/thunks/profile.thunks";

import routes from "../../../navigation/routes";
import styles from "./assets/article.module.scss";

type ArticleParams = {
  slug: string;
};

const Article = () => {
  const navigate = useNavigate();
  const { slug } = useParams<ArticleParams>();
  const dispatch = useTypedDispatch();
  const singleArticle = useTypedSelector(singleArticleStateSelector);

  const isArticleLoading = useTypedSelector(articleLoadingSelector);
  const [article] = Object.values(singleArticle ?? {});
  const userInfo = useTypedSelector(profileUserStateSelector);

  useEffect(() => {
    slug && dispatch(getSingleArticle(slug));
    dispatch(getUsersSettings());
  }, [dispatch, slug]);

  return (
    <div className={styles.articlePageHeader}>
      <Skeleton active title={false} loading={isArticleLoading}>
        <PageHeader
          ghost={false}
          title={`Article "${slug}"`}
          onBack={() => navigate(routes.HOME)}
        >
          <Col>
            <div className={styles.banner}>
              <div className={styles.bannerInfo}>
                <div className="container">
                  <h1 className={styles.bannerTitle}>
                    {isArticleLoading ? "Loading..." : article?.title}
                  </h1>
                  <ArticleActions article={article} />
                </div>
              </div>
              <div className="container">
                <div className={styles.articleBody}>{article?.body}</div>
                {article?.tagList?.map(tag => (
                  <span key={tag} className={classNames(styles.tagItem)}>
                    {tag}
                  </span>
                ))}
                <hr />
              </div>
            </div>
            <div className="container">
              {article?.comments.length > 0 && (
                <CommentList
                  authorName={userInfo?.username}
                  comments={article?.comments}
                />
              )}
              <Comment
                avatar={
                  <Avatar
                    src={defaultProfileImage}
                    alt={article?.author?.username}
                  />
                }
                content={<CreateComment />}
              />
            </div>
          </Col>
        </PageHeader>
      </Skeleton>
    </div>
  );
};

export default Article;
