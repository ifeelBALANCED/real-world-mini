import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, message } from "antd";
import classNames from "classnames";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { signUpSchema } from "@/components/screens/sign-up/schema/signupSchema";
import { AntTitle } from "@/components/shared/antd/ui";
import Loader from "@/components/shared/loader/loader";
import FieldInput from "@/components/shared/react-hook-form/fields/FieldInput";
import FieldPassword from "@/components/shared/react-hook-form/fields/FieldPassword";
import FormError from "@/components/shared/react-hook-form/FormError";
import { GlobalError } from "@/components/shared/react-hook-form/utils/make-form-errors";
import routes from "@/navigation/routes";
import { authStateSelector } from "@/store/selectors/auth.selectors";
import { reset } from "@/store/slices/auth.slice";
import { useTypedDispatch, useTypedSelector } from "@/store/store";
import { register } from "@/store/thunks/auth.thunk";

import styles from "../assets/signup.module.scss";

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

const SignUpForm: FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const {
    user,
    isLoading,
    isError,
    isSuccess,
    message: messageError,
  } = useTypedSelector(authStateSelector);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors, isValid, isDirty },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isError) {
      message.error(messageError);
    }

    if (isSuccess || user) {
      navigate(routes.HOME);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, navigate, dispatch, messageError]);

  const onSubmit = async (data: SignUpFormData) => {
    await dispatch(register(data)).unwrap();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Form
      className={classNames("form", styles.signUpForm)}
      onFinish={handleSubmit(onSubmit)}
    >
      <div className={classNames("card", styles.signUpCard)}>
        <div className={classNames("card-body", "login-card-body")}>
          <AntTitle className={classNames("text-center")} level={2}>
            Sign up
          </AntTitle>
          <div className="text-center">
            <FormError
              error={(errors as GlobalError)._error?.message}
              classNames={{
                errorContainer:
                  "text-center mb-2 mt-0 d-flex justify-content-center",
              }}
            />
            <FieldInput
              showDefaultIcon
              name={"username"}
              control={control}
              type="text"
              error={errors?.username?.message}
              placeholder={"Username"}
            />
            <FieldInput
              showDefaultIcon
              name={"email"}
              control={control}
              type="email"
              error={errors?.email?.message}
              placeholder={"Email"}
            />
            <FieldPassword
              showDefaultIcon
              name="password"
              control={control}
              type="password"
              error={errors?.password?.message}
              placeholder={"Password"}
            />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isDirty || !isValid}
                className={styles.signUpFormButton}
              >
                {isSubmitting ? (
                  <span
                    className={classNames("spinner-border spinner-border-sm")}
                  />
                ) : (
                  "Sign up"
                )}
              </Button>
              Or <Link to={routes.LOGIN}>login now!</Link>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SignUpForm;
