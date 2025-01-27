import React from 'react';
// import Modal from '@/col'; // Import the Modal component
import MultiSelect from '@/components/Molecules/MultiSelect'; // Import the MultiSelect component
import Button from '@/components/atoms/Button';
import { showToast } from '@/utils/toastUtils'; // Import the showToast utility
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Modal from '@/components/Organisms/Modal';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  availablePreferences: string[];
  preferences: string[];
  onPreferenceChange: (selectedPreferences: string[]) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  availablePreferences,
  preferences,
  onPreferenceChange,
}) => {
  const handlePreferenceChange = (selected: string[]) => {
    onPreferenceChange(selected);
  };

  // Check if user has selected at least 3 preferences
  const isSaveDisabled = preferences.length < 3;

  const handleSaveChanges = () => {
    if (preferences.length >= 3) {
      // Use the showToast function to display success message
      showToast({
        title: 'Success',
        text: 'Changes saved!',
        type: 'success',
      });
      onClose(); // Close the modal after saving
    } else {
      // Use the showToast function to display error message
      showToast({
        title: 'Error',
        text: 'Please select at least 3 preferences.',
        type: 'error',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Heading
        text="Settings"
        level={2}
        className="text-xl font-semibold mb-4"
      />
      {/* Multi-select preferences */}
      <MultiSelect
        label="Select Your Preferences"
        options={availablePreferences.map((preference) => ({
          id: preference,
          title: preference,
        }))}
        selectedOptions={preferences}
        onChange={handlePreferenceChange}
      />

      {/* Save button */}
      <div className="mt-4 flex justify-end">
        <Button
          label="Save Changes"
          onClick={handleSaveChanges}
          disabled={isSaveDisabled}
          className="rounded-md"
        />
      </div>
      {isSaveDisabled && (
        <Paragraph
          text="You must select at least 3 preferences to save changes."
          className="text-sm text-red-500 mt-2"
        />
      )}
    </Modal>
  );
};

export default SettingsModal;
