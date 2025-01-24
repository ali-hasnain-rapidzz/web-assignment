import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SettingsModal from '../Layout/Modal/SettingsModal';
import Dropdown from '../Layout/Dropdown';
import { availablePreferences } from '../../utils/constants';

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
    <div>
      <header className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md">
        <div className="flex items-center space-x-4">
          <img src="/assets/logo.png" alt="Logo" className="h-8" />
          <h1 className="text-2xl font-semibold">My Application</h1>
        </div>
        <Dropdown
          onSettingsClick={handleSettingsClick}
          onLogout={handleLogout}
        />
        <SettingsModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          availablePreferences={availablePreferences}
          preferences={preferences}
          onPreferenceChange={handlePreferenceChange}
        />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Header;
