import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const AppFooter = () => {
  const navigate = useNavigate();

  // Navigate to Buy Me a Coffee page
  const handleOnClick = () => {
    navigate("/buy");
  };

  return (
    <footer className="py-6 bg-[#031f39]">
      {/* Divider line above the footer */}
      <div className="flex justify-center items-center">
        <div className="border-t border-orange-500 w-[80%]"></div>
      </div>

      {/* Main content section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-10 mt-4 gap-6">
        {/* Left: Logo and copyright */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <img
            src={logo}
            alt="Notezy Logo"
            className="w-32 h-16 md:w-44 md:h-20"
          />
          <span className="text-sm text-gray-400">
            © 2025 Notezy | All rights are reserved.
          </span>
        </div>

        {/* Right: Buy Me a Coffee CTA */}
        <div
          onClick={handleOnClick}
          className="flex items-center justify-center gap-2 text-lg text-white cursor-pointer hover:text-orange-500 transition"
        >
          <span>If you like, Buy Me a Coffee</span>
          <span className="text-orange-500">→</span>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
