import { useEffect } from "react";
import { useState } from "react";

export default function useForm(formProps, formValidationFunc) {
  const generateWarningText = ({ required, value, validator }, form) => {
    if (required && (value === undefined || value === "")) {
      return "Required";
    }
    if (validator) {
      return validator(value, form);
    }
    return null;
  };
  const [form, setForm] = useState(
    Object.entries(formProps).reduce((prevState, [key, attributes]) => {
      prevState[key] = {
        ...attributes,
        validation: generateWarningText(attributes, formProps),
      };
      return prevState;
    }, {})
  );
  const validateForm = (form) =>
    Object.values(form).reduce((prevState, props) => {
      return prevState && generateWarningText(props, form) == null;
    }, true);
  const [isformValid, setFormValid] = useState(validateForm(formProps));

  useEffect(() => {
    setFormValid(
      validateForm(form) && (!formValidationFunc || formValidationFunc(form))
    );
  }, [form]);
  const changeFormInput = (key, value) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [key]: {
          ...prevState[key],
          validation: generateWarningText(
            { ...prevState[key], value },
            prevState
          ),
          value,
        },
      };
    });
  };
  return { form, isformValid, changeFormInput };
}
