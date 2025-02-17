"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HiSun, HiMoon } from "react-icons/hi";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <header
      className={`flex items-center justify-end gap-6 w-full h-20 p-6 shadow-lg ${
        isDarkMode ? "bg-[#1C2434]" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-6">
        <div
          className="relative flex items-center cursor-pointer"
          onClick={toggleTheme}
        >
          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-all ${
              isDarkMode
                ? "bg-blue-500 justify-end"
                : "bg-gray-300 justify-start"
            }`}
          >
            <span
              className={`absolute transition-transform duration-300 ${
                isDarkMode ? "right-1" : "left-1"
              }`}
            >
              {isDarkMode ? (
                <HiMoon size={20} className="text-white" />
              ) : (
                <HiSun size={20} className="text-yellow-500" />
              )}
            </span>
          </div>
        </div>
        <button
          className="text-gray-500 hover:text-blue-500"
          onClick={() => alert("Notifications")}
        >
          🛎️
        </button>
        <button
          className="text-gray-500 hover:text-blue-500"
          onClick={() => alert("Chat")}
        >
          💬
        </button>
      </div>

      <div className="flex items-center gap-4 relative">
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-sm">
            <p
              className={`${
                isDarkMode ? "text-white" : "text-gray-900"
              } font-semibold`}
            >
              John Doe
            </p>
            <p className="text-gray-500">Verified Member</p>
          </div>
          <Image
            src="/profil.png"
            alt="User Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>

        <button onClick={toggleDropdown} className="relative">
          ▼
        </button>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-full mt-2 bg-white shadow-lg rounded-md w-40"
          >
            <button
              onClick={() => router.push("/settings")}
              className="block w-full text-left p-2 text-gray-800 hover:bg-gray-100"
            >
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left p-2 text-gray-800 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
