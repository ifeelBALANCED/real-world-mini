import { Form, Input } from "antd";
import classNames, { Argument } from "classnames";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";
import { Controller } from "react-hook-form";
import { Control } from "react-hook-form/dist/types/form";

import styles from "../assets/field-number.module.scss";
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
  postfix?: string;
}

type Props<C> = FieldInputProps<C> &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const FieldNumberInput = <C extends Control<any>>({
  control,
  wrapperProps,
  className = "form-control",
  errorClassName = "border-danger text-danger",
  error,
  children,
  postfix,
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
          <label className={classNames(styles.postfixLabel)}>{postfix}</label>
          <Input
            data-content={postfix}
            id={props.id || props.name}
            onKeyDown={event => {
              ["e", "E"].includes(event.key) && event.preventDefault();
            }}
            {...field}
            className={classNames(
              styles.input,
              styles.withPostfix,
              "form-control",
              className,
              error && errorClassName
            )}
            placeholder={props.placeholder}
            type="number"
          />
          {children}
        </FieldWrapper>
      )}
    />
  </Form.Item>
);

export default FieldNumberInput;
