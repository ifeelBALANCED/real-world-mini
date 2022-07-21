import classNames from "classnames";
import { FC, memo } from "react";

import LoginForm from "@/components/screens/login/components/login-form";

import styles from "./assets/login.module.scss";

const LoginPage: FC = () => {
  return (
    <div className={classNames(styles.loginWrapper)}>
      <LoginForm />
    </div>
  );
};

export default memo(LoginPage);
