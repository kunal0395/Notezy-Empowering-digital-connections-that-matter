import React from 'react';
import QrCodeurl from '../assets/Qrcode.jpg'; // Importing the QR code image

/**
 * Buy Component
 * Displays a "Buy Me a Coffee" section with a QR code for support donations.
 */
const Buy = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#031f39] p-4">
      {/* Card Container */}
      <div className="bg-gray-300 shadow-lg rounded-lg p-8 text-center">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Buy Me a Coffee ☕
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          If you enjoy my work, consider supporting me by buying me a coffee! 😊
        </p>

        {/* QR Code */}
        <img
          src={QrCodeurl}
          alt="Payment QR Code"
          className="w-48 h-48 mx-auto mb-6"
        />

        {/* Scan Instruction */}
        <p className="text-gray-600">
          Scan the QR code to send your support.
        </p>
      </div>
    </div>
  );
};

export default Buy;
