import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar, Button, Form, message } from "antd";
import classNames from "classnames";
import { FC, memo } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";

import { defaultProfileImage } from "@/app/constants/images";
import { createCommentSchema } from "@/components/screens/article/components/create-comment/schema/createCommentSchema";
import FieldTextArea from "@/components/shared/react-hook-form/fields/FieldTextArea";
import FormError from "@/components/shared/react-hook-form/FormError";
import { GlobalError } from "@/components/shared/react-hook-form/utils/make-form-errors";
import { useTypedDispatch } from "@/store/store";
import { createOneComment } from "@/store/thunks/article.thunks";

export interface CreateCommentFormData {
  body: string;
}

type ArticleParams = {
  slug: string;
};

const CreateComment: FC = () => {
  const dispatch = useTypedDispatch();
  const { slug } = useParams<ArticleParams>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isValid, isDirty },
  } = useForm<CreateCommentFormData>({
    resolver: yupResolver(createCommentSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: CreateCommentFormData) => {
    const res = await dispatch(
      createOneComment({ data, slug: slug ?? "" })
    ).unwrap();
    if (res) {
      reset({ body: "" });
      message.success("Comment successfully published!");
    }
  };

  return (
    <Form className="card comment-form" onFinish={handleSubmit(onSubmit)}>
      <FormError
        error={(errors as GlobalError)._error?.message}
        classNames={{
          errorContainer: "text-center mb-2 mt-0 d-flex justify-content-center",
        }}
      />
      <div className="card-block">
        <FieldTextArea
          name={"body"}
          control={control}
          error={errors?.body?.message}
          placeholder={"Write a comment..."}
        />
      </div>
      <Form.Item>
        <div className={"d-flex justify-content-between card-footer"}>
          <Avatar src={defaultProfileImage} />
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isDirty || !isValid}
          >
            {isSubmitting ? (
              <span
                className={classNames("spinner-border spinner-border-sm")}
              />
            ) : (
              "Post Comment"
            )}
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default memo(CreateComment);
