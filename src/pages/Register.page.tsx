import React, { useState } from 'react';
import InputField from '@Components/Atoms/InputField.atom';
import SubmitButton from '@Components/Atoms/Button.atom';
import useAxios from '@Hooks/useAxios';
import authService from '@Services/authService.service';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '@Components/Organisms/Loader.organism';
import { validateForm } from '@Validations/validation';
import { registerValidationSchema } from '@Validations/register.validation';
import { showToast } from '@Utils/toast.util';
import Heading from '@Components/Atoms/Heading.atom';
import Paragraph from '@Components/Atoms/Paragraph.atom';
import MultiSelect from '@Components/Molecules/MultiSelect.molecule'; // MultiSelect component for preference selection
import { availablePreferences } from '@Utils/constants.util'; // Your available preferences

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { callApi, isLoading } = useAxios();
  const [preferences, setPreferences] = useState<string[]>([]); // Track selected preferences

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  const handlePreferenceChange = (selected: string[]) => {
    setPreferences(selected);
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
      formData.password,
      preferences
    );
    const response = await callApi(apiConfig);

    if (response) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.user.name);
      showToast({
        title: 'Success',
        text: 'User registered successfully!',
        type: 'success',
      });
      navigate('/article');
      // Here, you can redirect or handle the next steps (such as showing the preferences modal)
    }
  };
  // Check if any field is empty or preferences are less than 3
  const isSubmitDisabled =
    !formData.name ||
    !formData.email ||
    !formData.password ||
    preferences.length < 3;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <Heading
          text="Sign Up"
          level={2}
          className="text-2xl font-bold text-center text-gray-800"
        />

        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Name, Email, and Password Fields */}
          <InputField
            id="name"
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
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

          {/* MultiSelect for Preferences */}
          <div className="mt-4">
            <MultiSelect
              label="Select Your News Preferences (At least 3)"
              options={availablePreferences.map((preference) => ({
                id: preference,
                title: preference,
              }))}
              selectedOptions={preferences}
              onChange={handlePreferenceChange}
            />
            {preferences.length < 3 && (
              <p className="text-sm text-red-500 mt-2">
                You must select at least 3 preferences to proceed.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            {isLoading ? (
              <Loader size="medium" />
            ) : (
              <SubmitButton
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
                label="Sign Up"
                disabled={isSubmitDisabled} // Disable submit button if less than 3 preferences selected
              />
            )}
          </div>
        </form>

        {/* Already have an account link */}
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
    </div>
  );
};

export default Register;
