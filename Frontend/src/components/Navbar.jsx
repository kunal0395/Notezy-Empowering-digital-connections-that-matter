import React, { useState } from "react";
import { FiMenu } from "react-icons/fi"; // Hamburger menu icon for mobile
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu open state

  return (
    <div className="relative">
      {/* Navbar container */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <img
          src={logo}
          alt="Notezy Logo"
          className="w-36 sm:w-44 mx-2 sm:mx-4"
        />

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center text-white font-medium text-sm sm:text-lg gap-4 sm:gap-8">
          <Link
            to="/"
            className="bg-[#031f39] rounded-lg px-3 py-2 sm:px-5 sm:py-2 hover:bg-[#3d92e2] transition duration-200 ease-in-out"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="bg-[#031f39] rounded-lg px-3 py-2 sm:px-5 sm:py-2 hover:bg-[#3d92e2] transition duration-200 ease-in-out"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="bg-[#031f39] rounded-lg px-3 py-2 sm:px-5 sm:py-2 hover:bg-[#3d92e2] transition duration-200 ease-in-out"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Button (Hamburger Icon) */}
        <div className="flex md:hidden">
          <button
            className="text-white bg-[#031f39] p-2 rounded-lg hover:bg-[#3d92e2] transition duration-200"
            onClick={() => setMenuOpen((prev) => !prev)} // Toggle mobile menu
            aria-label="Toggle menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-[#031f39] text-white text-sm font-medium py-4 space-y-2 shadow-lg z-50">
          <Link
            to="/"
            className="w-full block text-center py-2 hover:bg-[#3d92e2] transition duration-200 ease-in-out"
            onClick={() => setMenuOpen(false)} // Close menu on link click
          >
            Home
          </Link>
          <Link
            to="/about"
            className="w-full block text-center py-2 hover:bg-[#3d92e2] transition duration-200 ease-in-out"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="w-full block text-center py-2 hover:bg-[#3d92e2] transition duration-200 ease-in-out"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
