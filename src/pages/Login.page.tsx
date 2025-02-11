import React, { useState } from 'react';
import InputField from '@Components/Atoms/InputField.atom';
import SubmitButton from '@Components/Atoms/Button.atom';
import useAxios from '@Hooks/useAxios';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '@Components/Organisms/Loader.organism';
import authService from '@Services/authService.service';
import { loginValidationSchema } from '@Validations/login.validation';
import { validateForm } from '@Validations/validation';
import Heading from '@Components/Atoms/Heading.atom';
import Paragraph from '@Components/Atoms/Paragraph.atom';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { callApi, isLoading } = useAxios();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: '' }); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, loginValidationSchema);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const apiConfig = authService.login(formData.email, formData.password);
    const response = await callApi(apiConfig);
    if (response) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.user.name);
      navigate('/article');
    }
  };

  const isSubmitDisabled = !formData.email || !formData.password;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <Heading
          text="Login"
          level={2}
          className="text-2xl font-bold text-center text-gray-800"
        />
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
            />
          </div>
          <div className="mb-4">
            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password} 
              required
            />
          </div>
          <div className="mt-4">
            {isLoading ? (
              <Loader size="medium" />
            ) : (
              <SubmitButton
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                label="Login"
                type="submit"
                disabled={isSubmitDisabled}
              />
            )}
          </div>
        </form>
        <div className="mt-4 flex justify-center items-center">
          <Paragraph
            text="Don't have an account?"
            className="text-sm text-gray-600"
          />
          <Link to="/" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
