import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Button, List } from "antd";
import { FC, memo } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import { defaultProfileImage } from "@/app/constants/images";
import { useTypedDispatch } from "@/store/store";
import { deleteOneComment } from "@/store/thunks/article.thunks";
import { IComment } from "@/types/types";

type CommentListProps = {
  comments: IComment[];
  authorName: string | undefined;
};

type ArticleParams = {
  slug: string;
};

const CommentList: FC<CommentListProps> = ({ comments, authorName }) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const dispatch = useTypedDispatch();
  const { slug } = useParams<ArticleParams>();
  const createdAt = new Date(Date.now()).toLocaleDateString("en-EN", options);

  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
      itemLayout="horizontal"
      renderItem={props => (
        <div className="card mb-3">
          <div className="card-block p-3">
            <p className="card-text">{props?.body}</p>
          </div>
          <div className="card-footer d-flex justify-content-between align-items-center">
            <div>
              <Avatar src={defaultProfileImage} alt={authorName} />
              <Link to={"#"} className="comment-author mx-2">
                {authorName}
              </Link>
              <span className="date-posted ng-binding badge bg-primary">
                {createdAt}
              </span>
            </div>
            <Button
              danger
              type="primary"
              size="small"
              icon={<DeleteOutlined />}
              onClick={() =>
                dispatch(deleteOneComment({ id: props?.id, slug: slug ?? "" }))
              }
            />
          </div>
        </div>
      )}
    />
  );
};

export default memo(CommentList);
