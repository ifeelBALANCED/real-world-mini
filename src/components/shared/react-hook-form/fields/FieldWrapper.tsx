import classNames, { Argument } from "classnames";
import { FC, PropsWithChildren, ReactNode } from "react";

import styles from "../assets/wrapper-input.module.scss";
import FormError from "../FormError";

export interface FieldWrapperProps {
  classNames?: {
    wrapperContainer?: Argument;
    labelContainer?: Argument;
    labelContainerError?: Argument;
    errorContainer?: Argument;
    errorMessage?: Argument;
    inputContainer?: Argument;
  };
  label?: ReactNode;
}

interface Props extends FieldWrapperProps {
  name: string;
  error?: string;
}

const FieldWrapper: FC<Props> = ({
  label,
  children,
  name,
  error,
  classNames: classes,
}: PropsWithChildren<Props>) => (
  <div
    className={classNames(
      styles.wrapperContainer,
      "form-group",
      classes?.wrapperContainer
    )}
  >
    {label && (
      <label
        htmlFor={name}
        className={classNames(
          classes?.labelContainer ?? "form-label",
          error && (classes?.labelContainerError ?? "text-danger")
        )}
      >
        {label}
      </label>
    )}
    <div className={classNames(styles.inputContainer, classes?.inputContainer)}>
      {children}
    </div>
    {error && error.length > 2 && (
      <FormError
        classNames={{
          errorMessage: classes?.errorMessage,
          errorContainer: classes?.errorContainer,
        }}
        error={error}
      />
    )}
  </div>
);

export default FieldWrapper;
