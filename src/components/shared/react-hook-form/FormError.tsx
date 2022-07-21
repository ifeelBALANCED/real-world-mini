import classNames, { Argument } from "classnames";
import { FC, memo } from "react";

import alertCircleRed from "../../../assets/alert-circle-red.svg";
import styles from "./assets/form-error.module.scss";

interface Props {
  error?: string;
  classNames?: {
    errorContainer?: Argument;
    errorMessage?: Argument;
  };
}

const FormError: FC<Props> = ({ error, classNames: classes }: Props) => {
  if (!error) {
    return null;
  }

  return (
    <div
      className={classNames(styles.errorRow, classes?.errorContainer)}
      role="alert"
    >
      <img
        src={alertCircleRed}
        alt=""
        className={classNames(styles.errorIcon)}
      />
      <span
        className={classNames(
          "text-danger",
          styles.errorRowText,
          classes?.errorMessage
        )}
      >
        {error}
      </span>
    </div>
  );
};

export default memo(FormError);
