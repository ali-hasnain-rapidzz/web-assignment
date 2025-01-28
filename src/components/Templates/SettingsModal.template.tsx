import React, { useState } from 'react';
import MultiSelect from '@Components/Molecules/MultiSelect.molecule'; // Import the MultiSelect component
import Button from '@Components/Atoms/Button.atom';
import { showToast } from '@Utils/toast.util'; // Import the showToast utility
import Heading from '@Components/Atoms/Heading.atom';
import Paragraph from '@Components/Atoms/Paragraph.atom';
import Modal from '@Components/Organisms/Modal.organism';
import { availablePreferences } from '@Utils/constants.util';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Manage preferences locally within the modal
  const [preferences, setPreferences] = useState<string[]>([]);

  const handlePreferenceChange = (selected: string[]) => {
    setPreferences(selected);
  };

  // Check if user has selected at least 3 preferences
  const isSaveDisabled = preferences.length < 3;

  const handleSaveChanges = () => {
    if (preferences.length >= 3) {
      // Use the showToast function to display success message
      showToast({
        title: 'Success',
        text: 'Preferences saved successfully!',
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
