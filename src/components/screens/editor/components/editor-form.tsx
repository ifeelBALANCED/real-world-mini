import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, message } from "antd";
import classNames from "classnames";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { editorSchema } from "@/components/screens/editor/schema/editorSchema";
import FieldInput from "@/components/shared/react-hook-form/fields/FieldInput";
import FormError from "@/components/shared/react-hook-form/FormError";
import { GlobalError } from "@/components/shared/react-hook-form/utils/make-form-errors";
import { useTypedDispatch } from "@/store/store";
import { createOneArticle } from "@/store/thunks/article.thunks";

import styles from "../assets/editor.module.scss";

export interface EditorFormData {
  title: string;
  description: string;
  body: string;
  tagList: string;
}

const EditorForm: FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors, isValid, isDirty },
  } = useForm<EditorFormData>({
    resolver: yupResolver(editorSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: EditorFormData) => {
    const res = await dispatch(createOneArticle(data)).unwrap();
    if (res) {
      message.success("Article created successfully");
      navigate(`/user-article/${res.article.slug}`);
    }
  };

  return (
    <Form
      className={classNames("form", styles.editorForm)}
      onFinish={handleSubmit(onSubmit)}
    >
      <div className={classNames("card", styles.editorCard)}>
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
              placeholder={"What's this user-article about?"}
            />
            <FieldInput
              name={"body"}
              control={control}
              type="text"
              error={errors?.body?.message}
              placeholder={"Write your user-article (in markdown)"}
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
                  "Publish"
                )}
              </Button>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default EditorForm;
