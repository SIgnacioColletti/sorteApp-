import { useState, useEffect } from "react";

export const useFormValidation = (initialState, validationRules) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validate = () => {
    const newErrors = {};

    Object.keys(validationRules).forEach((field) => {
      const rule = validationRules[field];
      const value = values[field];

      if (rule.required && !value.trim()) {
        newErrors[field] = `${rule.label} es requerido`;
      } else if (
        rule.email &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        newErrors[field] = "Email inválido";
      } else if (rule.phone && value && !/^[0-9+\-\s()]{8,15}$/.test(value)) {
        newErrors[field] = "Teléfono inválido";
      }
    });

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
    return Object.keys(newErrors).length === 0;
  };

  const setValue = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (Object.keys(values).some((key) => values[key])) {
      validate();
    }
  }, [values]);

  return { values, errors, isValid, setValue, validate, setValues };
};
