import React, { useEffect, useState } from "react";
import link from "../assets/link.svg";
import qr from "../assets/qr.svg";
import note from "../assets/note.png";
import axios from "axios";

const Userscount = () => {
  const [stats, setStats] = useState({
    note_count: null,
    url_count: null,
    qr_count: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/stats`);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      icon: <img src={note} alt="Notes Icon" className="w-12 h-12" />,
      value: stats.note_count,
      description: "Notes used by users",
    },
    {
      icon: <img src={link} alt="Link Icon" className="w-12 h-12" />,
      value: stats.url_count,
      description: "Links generated monthly",
    },
    {
      icon: <img src={qr} alt="QR Icon" className="w-12 h-12" />,
      value: stats.qr_count,
      description: "QR Codes created monthly",
    },
  ];

  return (
    <section className="bg-gray-200 py-12">
      <div className="max-w-5xl mx-auto px-4 text-center mb-12">
        <h2 className="text-black text-4xl sm:text-5xl font-extrabold leading-tight">
          Adopted and loved by millions of users for over a decade
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-10 px-4 max-w-6xl mx-auto">
        {statsData.map(({ icon, value, description }, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-56 sm:w-60 text-center transition-transform hover:scale-105"
          >
            <div className="mb-4">{icon}</div>
            <div className="text-4xl font-bold text-gray-900">
              {value !== null ? `${value}+` : "100+"}
            </div>
            <p className="text-gray-600 mt-2">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Userscount;
