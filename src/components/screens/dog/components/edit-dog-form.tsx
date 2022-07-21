import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, message } from "antd";
import classNames from "classnames";
import { FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { createDogSchema } from "@/components/screens/create-dog/schema/createDogSchema";
import FieldInput from "@/components/shared/react-hook-form/fields/FieldInput";
import FieldNumberInput from "@/components/shared/react-hook-form/fields/FieldNumberInput";
import FormError from "@/components/shared/react-hook-form/FormError";
import { GlobalError } from "@/components/shared/react-hook-form/utils/make-form-errors";
import routes from "@/navigation/routes";
import { dogStateSelector } from "@/store/selectors/dog.selectors";
import { useTypedDispatch, useTypedSelector } from "@/store/store";
import { updateDog } from "@/store/thunks/dog.thunks";

import styles from "../../create-dog/assets/create-dog.module.scss";

export interface UpdateDogFormData {
  name: string;
  breed: string;
  age: number;
}

type DogParams = {
  dogId: string;
};

const UpdateDogForm: FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { dog } = useTypedSelector(dogStateSelector);
  const { dogId } = useParams<DogParams>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isValid, isDirty },
  } = useForm<UpdateDogFormData>({
    resolver: yupResolver(createDogSchema),
    mode: "onBlur",
    defaultValues: useMemo(() => {
      return dog ?? {};
    }, [dog]),
  });

  const onSubmit = async (data: UpdateDogFormData) => {
    const res = await dispatch(updateDog({ data, id: dogId ?? "" })).unwrap();
    if (res) {
      message.success("Dog successfully edited!");
      navigate(routes.DOGS);
    }
  };

  useEffect(() => {
    reset(dog ?? {});
  }, [dog, reset]);

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
                  "Save"
                )}
              </Button>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default UpdateDogForm;
