import React, { useState } from 'react';
import InputField from '../components/Layout/InputField';
import SubmitButton from '../components/Layout/Button';
import useAxios from '../hooks/useAxios';
import authService from '../services/authService';
import { Link } from 'react-router-dom';
import Loader from '../components/Layout/Loader';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { callApi, isLoading, error } = useAxios();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
            required
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="mt-4">
            {isLoading ? (
              <Loader size="medium" />
            ) : (
              <SubmitButton label="Sign Up" />
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
