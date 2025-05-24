import React, { useState } from "react";
import axios from "axios";

const UrlSection = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUrlChange = (e) => {
    setLongUrl(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async () => {
    if (!longUrl.trim()) {
      setError("Please enter a valid URL.");
      return;
    }

    setIsLoading(true);
    setShortUrl("");
    setError("");

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/shorten`, {
        long_url: longUrl,
      });
      setShortUrl(data.short_url);
    } catch (err) {
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortUrl && !error) {
      navigator.clipboard.writeText(shortUrl);
      alert("Short URL copied to clipboard!");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto min-h-[24rem] max-h-[24rem]">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
        Shorten a long link
      </h2>
      <p className="text-sm sm:text-base text-gray-500 mb-6">No credit card required.</p>

      <label
        htmlFor="url-input"
        className="block text-sm sm:text-base font-semibold text-gray-700 mb-2"
      >
        Paste your long link here
      </label>
      <input
        id="url-input"
        type="text"
        value={longUrl}
        onChange={handleUrlChange}
        placeholder="https://example.com/my-long-url"
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
      />

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full font-semibold py-3 rounded-lg flex items-center justify-center transition ${
          isLoading
            ? "bg-blue-400 cursor-not-allowed text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {isLoading ? "Shortening..." : "Get your link for free →"}
      </button>

      <div className="shortened-url mt-6">
        <label
          htmlFor="short-link"
          className="block text-sm sm:text-base font-semibold text-gray-700 mb-2"
        >
          Get your short link here
        </label>

        <div className="relative">
          <input
            id="short-link"
            type="text"
            value={error || shortUrl}
            placeholder="notezy.kp/abc123"
            readOnly
            className={`w-full border rounded-lg p-3 text-gray-800 focus:outline-none cursor-not-allowed ${
              error
                ? "border-red-500 bg-red-100 text-red-700"
                : "border-gray-300 bg-gray-100"
            }`}
          />

          <button
            onClick={handleCopy}
            disabled={!shortUrl || Boolean(error)}
            className={`absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-2 ${
              !shortUrl || error
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 hover:text-blue-700 cursor-pointer"
            }`}
            aria-label="Copy short URL"
            title={shortUrl && !error ? "Copy short URL" : "No URL to copy"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrlSection;
