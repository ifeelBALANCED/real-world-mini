import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, message } from "antd";
import classNames from "classnames";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { loginSchema } from "@/components/screens/login/schema/loginSchema";
import { AntTitle } from "@/components/shared/antd/ui";
import Loader from "@/components/shared/loader/loader";
import FieldInput from "@/components/shared/react-hook-form/fields/FieldInput";
import FieldPassword from "@/components/shared/react-hook-form/fields/FieldPassword";
import FormError from "@/components/shared/react-hook-form/FormError";
import {
  GlobalError,
  withErrors,
} from "@/components/shared/react-hook-form/utils/make-form-errors";
import routes from "@/navigation/routes";
import { authStateSelector } from "@/store/selectors/auth.selectors";
import { reset } from "@/store/slices/auth.slice";
import { useTypedDispatch, useTypedSelector } from "@/store/store";
import { login } from "@/store/thunks/auth.thunk";

import styles from "../assets/login.module.scss";

export interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
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
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
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

  const onSubmit = async (data: LoginFormData) => {
    await dispatch(login(data)).unwrap();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Form
      initialValues={{}}
      className={classNames("form", styles.loginForm)}
      onFinish={handleSubmit(onSubmit)}
    >
      <div className={classNames("card")}>
        <div className={classNames("card-body", styles.loginCard)}>
          <AntTitle level={2}>Login</AntTitle>
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
                disabled={!isDirty || !isValid}
                htmlType="submit"
                className={styles.loginFormButton}
              >
                {isSubmitting ? (
                  <span
                    className={classNames("spinner-border spinner-border-sm")}
                  />
                ) : (
                  "Login"
                )}
              </Button>
              Or <Link to={routes.SIGN_UP}>register now!</Link>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default LoginForm;
