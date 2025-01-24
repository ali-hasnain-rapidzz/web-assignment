import React, { useState } from 'react';
import InputField from '../components/Layout/InputField';
import SubmitButton from '../components/Layout/Button';
import useAxios from '../hooks/useAxios';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../components/Layout/Loader';
import authService from '../services/authService';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Using useNavigate from react-router-dom v6+
  const { callApi, isLoading, error } = useAxios();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiConfig = authService.login(formData.email, formData.password);
    const response = await callApi(apiConfig);
    if (response) {
      console.log('User logged in successfully:', response);
      navigate('/home');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        {error && (
          <div className="p-2 mt-2 text-sm text-red-600 bg-red-100 rounded">
            {error}
          </div>
        )}
        <form className="mt-6" onSubmit={handleSubmit}>
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
              <SubmitButton
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                label="Login"
              />
            )}
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
