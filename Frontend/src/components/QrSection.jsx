import React, { useState } from "react";
import qrsection from "../assets/qrsection.png";
import axios from "axios";

const QrSection = () => {
  const [qrCode, setQrCode] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateQR = async () => {
    if (!url.trim()) {
      alert("Please enter a valid URL");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/generate_qr`,
        { url },
        { headers: { "Content-Type": "application/json" } }
      );
      setQrCode(response.data.qr_code);
    } catch (error) {
      console.error("Error generating QR Code:", error);
      alert("Failed to generate QR Code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyQR = async () => {
    if (!qrCode) {
      alert("No QR code to copy.");
      return;
    }
    try {
      const base64Response = await fetch(`data:image/png;base64,${qrCode}`);
      const blob = await base64Response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ]);
      alert("QR Code copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy QR Code:", error);
      alert("Failed to copy QR Code. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-10 min-h-[24rem]">
      {/* Left Content Section */}
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Create a QR Code
        </h2>
        <p className="text-sm text-gray-500 mb-6">No credit card required.</p>

        <label
          htmlFor="url"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Enter your QR Code destination
        </label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/my-long-url"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
        />

        <button
          onClick={handleGenerateQR}
          disabled={loading}
          className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center mb-4 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Generating..." : "Get your QR Code for free"}
          <span className="ml-2">→</span>
        </button>

        {qrCode && (
          <div className="flex justify-center gap-6 mt-2">
            <button
              onClick={handleCopyQR}
              className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-4 12h4a2 2 0 002-2v-4m-7-1h8m-8 4h4"
                />
              </svg>
              Copy QR Code
            </button>
          </div>
        )}
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-4/12 flex items-center justify-center bg-gray-200 rounded-xl shadow-xl">
        {qrCode ? (
          <img
            src={`data:image/png;base64,${qrCode}`}
            alt="QR Code"
            className="max-w-full max-h-72 object-contain"
          />
        ) : (
          <img
            src={qrsection}
            alt="qrcode"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default QrSection;
