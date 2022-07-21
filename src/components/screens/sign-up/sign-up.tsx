import classNames from "classnames";
import { FC, memo } from "react";

import SignUpForm from "@/components/screens/sign-up/components/signup-form";

import styles from "./assets/signup.module.scss";

const SignUpPage: FC = () => {
  return (
    <div className={classNames(styles.signUpWrapper)}>
      <SignUpForm />
    </div>
  );
};

export default memo(SignUpPage);
