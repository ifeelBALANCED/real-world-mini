import { Form } from "antd";
import classNames, { Argument } from "classnames";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";
import { Controller } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";

import styles from "../assets/field-input.module.scss";
import { CommonFieldProps } from "../types/common";
import FieldWrapper, { FieldWrapperProps } from "./FieldWrapper";

interface FieldInputProps<Control> extends CommonFieldProps {
  wrapperProps?: FieldWrapperProps;
  errorClassName?: Argument;
  control: Control;
  inputClassName?: Argument;
  invalidInputClassName?: Argument;
  country?: string;
  disabled?: boolean;
}

type Props<C> = FieldInputProps<C> &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const FieldTextArea = <C extends Control<any>>({
  control,
  wrapperProps,
  className = "form-control p-3",
  errorClassName = "border-danger text-danger",
  error,
  children,
  ...props
}: PropsWithChildren<Props<C>>) => (
  <Form.Item>
    <Controller
      name={props.name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <FieldWrapper
          {...wrapperProps}
          classNames={wrapperProps?.classNames}
          name={props.name}
          error={error}
        >
          <textarea
            id={props.id || props.name}
            {...field}
            className={classNames(
              styles.input,
              className,
              error && errorClassName
            )}
            placeholder={props.placeholder}
          />
          {children}
        </FieldWrapper>
      )}
    />
  </Form.Item>
);

export default FieldTextArea;
