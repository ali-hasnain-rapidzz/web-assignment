import { useEffect, useRef, useState } from 'react';
import Button from '@Components/Atoms/Button.atom';

const Dropdown: React.FC<{
  onSettingsClick: () => void;
  onLogout: () => void;
}> = ({ onSettingsClick, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  const userName = localStorage.getItem('username');

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        label="" 
        onClick={toggleDropdown}
        className="flex items-center space-x-2 bg-blue-500 rounded-full px-4 py-2 hover:bg-blue-700"
      >
        <span className="capitalize block">{userName}</span>
      </Button>
      {isDropdownOpen && (
        <div className="absolute z-[1000] right-0 mt-2 w-40 bg-white text-gray-700 shadow-lg rounded-lg">
          <ul className="space-y-0">
            <li>
              <Button
                onClick={() => {
                  onSettingsClick();
                  setIsDropdownOpen(false);
                }}
                label="Settings"
                className="block px-4 py-2 rounded-none  text-sm hover:bg-gray-100 hover:text-gray-900 text-gray-700 w-full text-left"
              />
            </li>
            <li>
              <Button
                label="Logout"
                onClick={() => {
                  onLogout();
                  setIsDropdownOpen(false);
                }}
                className="block px-4 py-2 rounded-none text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
