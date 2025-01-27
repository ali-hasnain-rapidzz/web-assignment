import { useEffect, useRef, useState } from 'react';
import Button from '@Components/atoms/Button.atom';

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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        label="" // or a value if you need the label text
        onClick={toggleDropdown}
        className="flex items-center space-x-2 bg-blue-500 rounded-full px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <div className="w-8 h-8 bg-gray-500 text-white flex items-center justify-center rounded-full">
          <span className="text-lg font-bold">A</span>
        </div>
        <span className="hidden sm:block">Username</span>
      </Button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-gray-700 shadow-lg rounded-lg">
          <ul className="space-y-0">
            <li>
              <Button
                onClick={() => {
                  onSettingsClick();
                  setIsDropdownOpen(false);
                }}
                label="Settings"
                className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 text-gray-700 w-full text-left"
              />
            </li>
            <li>
              <Button
                label="Logout"
                onClick={() => {
                  onLogout();
                  setIsDropdownOpen(false);
                }}
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
