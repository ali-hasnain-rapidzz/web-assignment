import { ValidationSchema } from '../types/validation.type';

export const registerValidationSchema: ValidationSchema = {
  name: {
    required: true,
    minLength: 2,
    errorMessage: 'Name must be at least 2 characters long!',
  },
  email: {
    required: true,
    pattern: /\S+@\S+\.\S+/,
    errorMessage: 'Please enter a valid email address!',
  },
  password: {
    required: true,
    minLength: 6,
    maxLength: 20,
    errorMessage: 'Password must be between 6 and 20 characters long!',
  },
};
