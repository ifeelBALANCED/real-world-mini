import isArray from "lodash/isArray";
import { FieldErrors, FieldName, UseFormSetError } from "react-hook-form";

export type GlobalError = FieldErrors<{ _error: string }>;

export interface FormError<T> {
  field: FieldName<T>;
  error: {
    type: "manual";
    message: string;
  };
}

export type FormErrors<T> = FormError<T>[];

interface Violation<T> {
  property: keyof T;
  constraints: {
    [name: string]: string;
  };
}

interface ErrorResponse<T> {
  error: string;
  message: Violation<T>[];
  statusCode: number;
}

export function makeFormErrorsFromResponse<T>({
  error,
  message,
}: ErrorResponse<T>): FormErrors<T> {
  const result: FormErrors<T> = [];

  if (isArray(message)) {
    message.forEach((violation: Violation<T>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [key, value] of Object.entries(violation.constraints)) {
        result.push({
          field: violation.property as FieldName<T>,
          error: {
            type: "manual",
            message: value,
          },
        });
      }
    });
  } else {
    result.push({
      field: "_error" as FieldName<T>,
      error: {
        type: "manual",
        message: error ?? "Server error",
      },
    });
  }

  return result;
}

export function makeFormErrors<T>(
  errors: { [P in keyof T]: string } | { _error: string }
): FormErrors<T | { _error: string }> {
  const result: FormErrors<T | { _error: string }> = [];

  Object.entries(errors).forEach(([field, error]: Array<any>) => {
    result.push({
      field: field,
      error: {
        type: "manual",
        message: error,
      },
    });
  });

  return result;
}

export function withErrors<T>(
  promise: Promise<any>,
  setError: UseFormSetError<T>
): Promise<any> {
  return promise.catch((errors: FormErrors<T>) => {
    errors.forEach(item => setError(item.field as any, item.error));
    return false;
  });
}
