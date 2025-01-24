import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SettingsModal from '../Layout/Modal/SettingsModal';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<string[]>([]);
  const navigate = useNavigate();

  const availablePreferences = [
    'NewsAPI',
    'OpenNews',
    'NewsCred',
    'The Guardian',
    'BBC News',
    'NewsAPI.org'
  ];

  const handleLogout = () => {
    // Add your logout logic here
    console.log('User logged out');
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

      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 bg-blue-500 rounded-full px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <div className="w-8 h-8 bg-gray-500 text-white flex items-center justify-center rounded-full">
            <span className="text-lg font-bold">A</span>
          </div>
          <span className="hidden sm:block">Username</span>
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 shadow-lg rounded-lg">
            <ul>
              <li>
                <button
                  onClick={handleSettingsClick}
                  className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                >
                  Settings
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Settings Modal */}
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
