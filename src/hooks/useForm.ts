import { useEffect, useMemo, useState } from "react";

type FormValidationName = "required" | "minLength" | "pattern";
type Validation = { value: (value: any) => boolean; message: string };
type FormValidation = {
  [key in FormValidationName]?: Validation;
};
type ValidationError = {
  [key: string]: string;
};

export type FormValidations = Record<string, FormValidation>;

export const useForm = <T>(
  initialForm: T,
  validations: FormValidations = {}
) => {
  const [formState, setFormState] = useState(initialForm);
  const [errors, setErrors] = useState<ValidationError>({});

  const validateForm = () => {
    const errors: ValidationError = {};
    Object.entries(validations).forEach(([name, validations]) => {
      const value = formState[name as keyof T];
      Object.entries(validations).forEach(([_, validation]) => {
        if (!validation.value(value)) {
          if (!errors[name]) errors[name] = "";
          errors[name] += validation.message;
        }
      });
    });
    return errors;
  };

  useEffect(() => {
    setErrors(validateForm());
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  const handleInputChange = ({ target }: { target: any }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };
  const onResetForm = () => setFormState(initialForm);

  return {
    formState,
    handleInputChange,
    onResetForm,
    errors,
    isValid,
  };
};
