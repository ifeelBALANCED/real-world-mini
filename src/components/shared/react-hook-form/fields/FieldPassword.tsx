import { LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
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
  showDefaultIcon?: boolean;
}

type Props<C> = FieldInputProps<C> &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
const { Password } = Input;
const FieldPassword = <C extends Control<any>>({
  control,
  wrapperProps,
  className = "form-control",
  errorClassName = "border-danger text-danger",
  showDefaultIcon = false,
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
          <Password
            id={props.id || props.name}
            {...field}
            className={classNames(
              styles.input,
              className,
              error && errorClassName
            )}
            placeholder={props.placeholder}
            prefix={
              showDefaultIcon && (
                <LockOutlined className="site-form-item-icon" />
              )
            }
          />
          {children}
        </FieldWrapper>
      )}
    />
  </Form.Item>
);

export default FieldPassword;
