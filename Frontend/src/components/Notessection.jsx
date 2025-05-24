import React from "react";
import { useNavigate } from "react-router-dom";
import note from "../assets/note.png";

const Notessection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/note");
  };

  return (
    <section
      className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-10 min-h-[24rem]"
      aria-label="Notes Section"
    >
      {/* Left Content Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        {/* Title Section */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          You can Note here
        </h2>
        <p className="text-sm text-gray-500 mb-6">No credit card required.</p>

        {/* Input Section */}
        <label
          htmlFor="start-note"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Start writing your notes here
        </label>

        {/* Button Section */}
        <button
          id="start-note"
          onClick={handleClick}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          aria-label="Start writing your notes"
        >
          Click and Start writing your Notes
          <span className="ml-2" aria-hidden="true">
            →
          </span>
        </button>
      </div>

      {/* Right Image Section */}
      <div className="w-full md:w-4/12 flex items-center justify-center bg-gray-200 rounded-xl shadow-xl">
        <img
          src={note}
          alt="Illustration of taking notes"
          className="max-w-full max-h-72 object-contain"
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default Notessection;
