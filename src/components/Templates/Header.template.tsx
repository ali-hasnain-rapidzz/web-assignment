import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsModal from '@Components/Templates/SettingsModal.template';
import Dropdown from '@Components/Molecules/Dropdown.molecule';
import Heading from '@Components/Atoms/Heading.atom';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  const handleSettingsClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePreferenceChange = (selected: string[]) => {
    setPreferences(selected);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md">
      <div className="flex items-center space-x-4">
        <img src="/assets/logo.png" alt="Logo" className="h-8" />
        <Heading
          text="My Application"
          level={1}
          className="text-2xl font-semibold"
        />
      </div>
      <Dropdown onSettingsClick={handleSettingsClick} onLogout={handleLogout} />
      <SettingsModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        preferences={preferences}
        onPreferenceChange={handlePreferenceChange}
      />
    </header>
  );
};

export default Header;
