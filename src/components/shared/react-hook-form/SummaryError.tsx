import classNames, { Argument } from "classnames";
import { FC, memo } from "react";

import styles from "./assets/summary-error.module.scss";

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
      <span className={classNames("text-danger", classes?.errorMessage)}>
        {error}
      </span>
    </div>
  );
};

export default memo(FormError);
