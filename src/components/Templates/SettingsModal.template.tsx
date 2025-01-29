import React, { useEffect, useState } from 'react';
import MultiSelect from '@Components/Molecules/MultiSelect.molecule'; // Import the MultiSelect component
import Button from '@Components/Atoms/Button.atom';
import { showToast } from '@Utils/toast.util'; // Import the showToast utility
import Heading from '@Components/Atoms/Heading.atom';
import Paragraph from '@Components/Atoms/Paragraph.atom';
import Modal from '@Components/Organisms/Modal.organism';
import { availablePreferences } from '@Utils/constants.util';
import prefernceService from '@/services/preferenceService.service';
import useAxios from '@/hooks/useAxios';
import Loader from '../Organisms/Loader.organism';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  // Manage preferences locally within the modal
  const [preferences, setPreferences] = useState<string[]>([]);
  const { callApi, isLoading } = useAxios();

  const handlePreferenceChange = (selected: string[]) => {
    setPreferences(selected);
  };

  const getUserPrefernce = async () => {
    const apiConfig = prefernceService.getPrefernce();
    const response = await callApi(apiConfig);
    setPreferences(response?.source_names);
  };

  useEffect(() => {
    getUserPrefernce();
  }, []);

  // Check if user has selected at least 3 preferences
  const isSaveDisabled = preferences?.length < 3;

  const handleSaveChanges = async () => {
    // Proceed with the API call if validation passes
    const apiConfig = prefernceService.postPrefernce(preferences);
    const response = await callApi(apiConfig);
    if (response) {
      // Use the showToast function to display success message
      showToast({
        title: 'Success',
        text: 'Preferences saved successfully!',
        type: 'success',
      });
      onClose(); // Close the modal after saving
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="relative">
        {isLoading && (
          <div>
            <div
            className="absolute inset-0 bg-white opacity-50 z-10 backdrop-blur-md"
            style={{ top: 0 }}
          />
            <div className="absolute backdrop-blur-md  top-40 left-1/2 transform -translate-x-1/2 z-30">
              <Loader size="medium" />
            </div>
          </div>
        )}
        <Heading text="Settings" level={2} className="text-xl font-semibold mb-4 z-20" />
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
        <div className="mt-4 flex justify-center relative z-20">
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
            className="text-sm text-red-500 mt-2 z-20"
          />
        )}
      </div>
    </Modal>
  );
};

export default SettingsModal;
