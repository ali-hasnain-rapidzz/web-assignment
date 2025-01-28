import React, { useState } from 'react';
import InputField from '@Components/Atoms/InputField.atom';
import SubmitButton from '@Components/Atoms/Button.atom';
import useAxios from '@Hooks/useAxios';
import authService from '@Services/authService.service';
import { Link } from 'react-router-dom';
import Loader from '@Components/Organisms/Loader.organism';
import { validateForm } from '@Validations/validation';
import { registerValidationSchema } from '@Validations/register.validation';
import { showToast } from '@Utils/toast.util';
import Heading from '@Components/Atoms/Heading.atom';
import Paragraph from '@Components/Atoms/Paragraph.atom';
import SettingsModal from '@Components/Templates/SettingsModal.template';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { callApi, isLoading } = useAxios();

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Clear error for the current field
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateForm(formData, registerValidationSchema);
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
      showToast({
        title: 'Success',
        text: 'User registered successfully! Please set your preferences.',
        type: 'success',
      });
      setIsSettingsModalOpen(true); // Open preferences modal
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <Heading
          text="Sign Up"
          level={2}
          className="text-2xl font-bold text-center text-gray-800"
        />
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
          <div className="text-center mt-4">
            {isLoading ? (
              <Loader size="medium" />
            ) : (
              <SubmitButton
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
                label="Sign Up"
              />
            )}
          </div>
        </form>
        <div className="mt-4 flex justify-center items-center">
          <Paragraph
            text="Already have an account?"
            className="text-sm text-gray-600"
          />
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>

      {/* Preferences Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </div>
  );
};

export default Register;
