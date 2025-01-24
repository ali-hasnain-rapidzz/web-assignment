import { ValidationSchema } from "../types/validation.type";

export const validateForm = (data: Record<string, any>, schema: ValidationSchema) => {
  const errors: Record<string, string> = {};

  for (const field in schema) {
    const rules = schema[field];
    const value = data[field];

    // Check if field is required and is empty
    if (rules.required && !value) {
      errors[field] = rules.errorMessage || `${field} is required!`;
    }
    // Check for pattern validation
    else if (rules.pattern && value && !rules.pattern.test(value)) {
      errors[field] = rules.errorMessage || `${field} is invalid!`;
    }
    // Check for minLength
    else if (rules.minLength && value && value.length < rules.minLength) {
      errors[field] = rules.errorMessage || `${field} must be at least ${rules.minLength} characters long!`;
    }
    // Check for maxLength
    else if (rules.maxLength && value && value.length > rules.maxLength) {
      errors[field] = rules.errorMessage || `${field} must not exceed ${rules.maxLength} characters!`;
    }
  }

  return errors;
};
