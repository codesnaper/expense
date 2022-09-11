import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { Tag } from "../modal/response/Tag";
import { Validations } from "../modal/validation";

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

export const useFormValidation = <T extends Record<keyof T, any> = {}>(options?: {
  // We will soon see how to create this interface
  validations?: Validations<T>;
  // Allows a subset of T
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}) => {
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  const handleChange = <S extends unknown>(
    key: keyof T,
    sanitizeFn?: (value: string) => S
  ) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleChangeWithValue = <S extends unknown>(
    key: keyof T,
    value: any
  ) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    // const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
    setData({
      ...data,
      [key]: '',
    });
  };

  const handleTagValue = <S extends unknown>(
    key: keyof T
  ) => (tags: Array<Tag>) => {
    const value = tags;
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSelectChange = <S extends unknown>(
    key: keyof T,
    sanitizeFn?: (value: string) => S
  ) => (e: SelectChangeEvent<any>) => {
    const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
    setData({
      ...data,
      [key]: value,
    });
  };

  const setValue = (key: keyof T, value: any) => {
    setData({
      ...data,
      [key]: value,
    });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors: ErrorRecord<T> = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  const refreshError = () => {
    setErrors({})
  }

  return {
    data,
    handleChange,
    handleSubmit,
    handleSelectChange,
    setValue,
    errors,
    handleTagValue,
    refreshError
  };
};