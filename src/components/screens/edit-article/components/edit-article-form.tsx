import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, message } from "antd";
import classNames from "classnames";
import { FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { editorSchema } from "@/components/screens/editor/schema/editorSchema";
import FieldInput from "@/components/shared/react-hook-form/fields/FieldInput";
import FormError from "@/components/shared/react-hook-form/FormError";
import { GlobalError } from "@/components/shared/react-hook-form/utils/make-form-errors";
import { singleArticleStateSelector } from "@/store/selectors/articles.selectors";
import { useTypedDispatch, useTypedSelector } from "@/store/store";
import {
  getSingleArticle,
  updateOneArticle,
} from "@/store/thunks/article.thunks";

import styles from "../assets/edit-article.module.scss";

export interface EditArticleFormData {
  title: string;
  description: string;
  body: string;
  tagList: string;
}

type ArticleParams = {
  slug: string;
};

const EditArticleForm: FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const { slug } = useParams<ArticleParams>();
  const singleArticle = useTypedSelector(singleArticleStateSelector);

  const [article] = Object.values(singleArticle ?? {});

  useEffect(() => {
    slug && dispatch(getSingleArticle(slug));
  }, [dispatch, slug]);

  const defaultValues = useMemo(
    () => ({ ...article, tagList: article.tagList.join("") }),
    [article]
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isValid, isDirty },
  } = useForm<EditArticleFormData>({
    resolver: yupResolver(editorSchema),
    mode: "onBlur",
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [article, defaultValues, reset]);

  const onSubmit = async (data: EditArticleFormData) => {
    const res = await dispatch(
      updateOneArticle({ data, slug: slug ?? "" })
    ).unwrap();

    if (res) {
      message.success("Article updated successfully");
      navigate(`/user-article/${res.article.slug}`);
    }
  };

  return (
    <Form
      className={classNames("form", styles.editForm)}
      onFinish={handleSubmit(onSubmit)}
    >
      <div className={classNames("card", styles.editFormCard)}>
        <div className={classNames("card-body", "login-card-body")}>
          <div className={styles.formCardInner}>
            <FormError
              error={(errors as GlobalError)._error?.message}
              classNames={{
                errorContainer:
                  "text-center mb-2 mt-0 d-flex justify-content-center",
              }}
            />
            <FieldInput
              name={"title"}
              control={control}
              type="text"
              error={errors?.title?.message}
              placeholder={"Article title"}
            />
            <FieldInput
              name={"description"}
              control={control}
              type="text"
              error={errors?.description?.message}
              placeholder={"What's this article about?"}
            />
            <FieldInput
              name={"body"}
              control={control}
              type="text"
              error={errors?.body?.message}
              placeholder={"Write your article (in markdown)"}
            />
            <FieldInput
              name={"tagList"}
              control={control}
              type="text"
              error={errors?.tagList?.message}
              placeholder={"Enter tags"}
            />
            <Form.Item>
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
                  "Update"
                )}
              </Button>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default EditArticleForm;
