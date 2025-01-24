import React from 'react';
import Modal from './Modal'; // Import the Modal component
import MultiSelect from '../MultiSelect'; // Import the MultiSelect component
import Button from '../Button';

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
      alert('Changes saved!');
      onClose(); // Close the modal after saving
    } else {
      alert('Please select at least 3 preferences.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

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
        <p className="text-sm text-red-500 mt-2">
          You must select at least 3 preferences to save changes.
        </p>
      )}
    </Modal>
  );
};

export default SettingsModal;
