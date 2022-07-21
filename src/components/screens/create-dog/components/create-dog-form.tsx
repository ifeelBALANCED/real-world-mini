import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, message } from "antd";
import classNames from "classnames";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { createDogSchema } from "@/components/screens/create-dog/schema/createDogSchema";
import FieldInput from "@/components/shared/react-hook-form/fields/FieldInput";
import FieldNumberInput from "@/components/shared/react-hook-form/fields/FieldNumberInput";
import FormError from "@/components/shared/react-hook-form/FormError";
import { GlobalError } from "@/components/shared/react-hook-form/utils/make-form-errors";
import routes from "@/navigation/routes";
import { useTypedDispatch } from "@/store/store";
import { createDog } from "@/store/thunks/dog.thunks";

import styles from "../assets/create-dog.module.scss";

export interface CreateDogFormData {
  name: string;
  breed: string;
  age: number;
}

const CreateDogForm: FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors, isValid, isDirty },
  } = useForm<CreateDogFormData>({
    resolver: yupResolver(createDogSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: CreateDogFormData) => {
    const res = await dispatch(createDog(data)).unwrap();
    if (res) {
      message.success("Dog successfully created!");
      navigate(routes.DOGS);
    }
  };

  return (
    <Form
      className={classNames("form", styles.createDogForm)}
      onFinish={handleSubmit(onSubmit)}
    >
      <div className={classNames("card", styles.createDogCard)}>
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
              name={"name"}
              control={control}
              type="text"
              error={errors?.name?.message}
              placeholder={"Name"}
            />
            <FieldInput
              name={"breed"}
              control={control}
              type="text"
              error={errors?.breed?.message}
              placeholder={"Breed"}
            />
            <FieldNumberInput
              name={"age"}
              control={control}
              type="number"
              error={errors?.age?.message}
              placeholder={"Age"}
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
                  "Create"
                )}
              </Button>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CreateDogForm;
