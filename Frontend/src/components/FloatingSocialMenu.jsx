import React, { useState, useRef, useEffect } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaShareNodes } from "react-icons/fa6";

const FloatingSocialMenu = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls visibility of social icons
  const menuRef = useRef(null); // Reference to the menu for detecting outside clicks

  // Toggle visibility of the radial menu
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = () => {
    alert(
      "Apologies, the links are currently unavailable. Please reach out to us through the 'Contact Us' page."
    );
  };

  return (
    <div ref={menuRef} className="fixed bottom-16 right-6 z-50">
      {/* Floating Action Button */}
      <button
        onClick={toggleMenu}
        className="bg-blue-600 text-white w-16 h-16 rounded-full flex justify-center items-center shadow-lg hover:bg-blue-700 transition duration-300"
      >
        <FaShareNodes size={24} />
      </button>

      {/* Radial Social Menu */}
      <div
        className={`absolute flex items-center justify-center ${
          isOpen ? "scale-100" : "scale-0"
        } transition-transform duration-500 ease-out origin-bottom-right`}
        onClick={handleClick}
      >
        {isOpen && (
          <>
            {/* Facebook */}
            <div
              className="absolute w-12 h-12 bg-blue-600 text-white rounded-full flex justify-center items-center shadow-lg hover:scale-110 hover:bg-blue-500 transition-all duration-300"
              style={{ transform: `translate(1px, 40px)` }}
            >
              <FaFacebook size={20} />
            </div>

            {/* X (formerly Twitter) */}
            <div
              className="absolute w-12 h-12 bg-black text-white rounded-full flex justify-center items-center shadow-lg hover:scale-110 hover:bg-gray-800 transition-all duration-300"
              style={{ transform: `translate(-65px, 0px)` }}
            >
              <FaXTwitter size={20} />
            </div>

            {/* Instagram */}
            <div
              className="absolute w-12 h-12 bg-pink-500 text-white rounded-full flex justify-center items-center shadow-lg hover:scale-110 hover:bg-pink-400 transition-all duration-300"
              style={{ transform: `translate(-65px, -75px)` }}
            >
              <FaInstagram size={20} />
            </div>

            {/* LinkedIn */}
            <div
              className="absolute w-12 h-12 bg-blue-700 text-white rounded-full flex justify-center items-center shadow-lg hover:scale-110 hover:bg-blue-600 transition-all duration-300"
              style={{ transform: `translate(5px, -115px)` }}
            >
              <FaLinkedin size={20} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FloatingSocialMenu;
