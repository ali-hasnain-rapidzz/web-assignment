import React, { useState } from 'react';
import InputField from '../components/Layout/InputField';
import SubmitButton from '../components/Layout/Button';
import useAxios from '../hooks/useAxios';
import authService from '../services/authService';
import { Link } from 'react-router-dom';
import Loader from '../components/Layout/Loader';
import { validateForm } from '../validations/validationUtils';
import { registerValidationSchema } from '../validations/register.validation';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { callApi, isLoading, error } = useAxios();

  console.log('isLoadinglkk', isLoading);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Clear error for the current field
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };
  console.log('formDatakkk', formData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    // Validate form
    const validationErrors = validateForm(formData, registerValidationSchema);
    console.log('validationErrors888', validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit form data
    const apiConfig = authService.register(
      formData.name,
      formData.email,
      formData.password
    );
    const response = await callApi(apiConfig);

    if (response) {
      console.log('User registered successfully:', response);
      // Redirect user or show a success message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        {error && (
          <div className="p-2 mt-2 text-sm text-red-600 bg-red-100 rounded">
            {error}
          </div>
        )}
        <form className="mt-6" onSubmit={handleSubmit}>
          <InputField
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name} // Pass error dynamically
            required
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email} // Pass error dynamically
            required
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password} // Pass error dynamically
            required
          />
          <div className="mt-4">
            {isLoading ? (
              <Loader size="medium" />
            ) : (
              <SubmitButton type='submit' label="Sign Up" />
            )}
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
