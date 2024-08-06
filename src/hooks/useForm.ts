import { useState } from "react";

export const useForm = <T>(initialForm: T) => {
  const [formState, setFormState] = useState(initialForm);
  const handleInputChange = ({ target }: any) => {
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
  };
};
