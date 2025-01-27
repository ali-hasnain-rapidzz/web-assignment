// validationSchemas.ts
import { ValidationSchema } from '../types/validation.type';

export const loginValidationSchema: ValidationSchema = {
  email: {
    required: true,
    pattern: /\S+@\S+\.\S+/,
    errorMessage: 'Invalid email format!',
  },
  password: {
    required: true,
    errorMessage: 'Password is required!',
  },
};
