import React, { useState } from "react";
import stars from "../assets/stars.svg";
import link from "../assets/link.svg";
import qr from "../assets/qr.svg";
import note from "../assets/note.png";
import Notessection from "../components/Notessection";
import Urlsection from "../components/UrlSection";
import Qrsection from "../components/QrSection";
import Userscount from "../components/Userscount";
import Review from "../components/Review";
import Footer from "../components/AppFooter";

const Home = () => {
  const [activeDiv, setActiveDiv] = useState(1);

  // Map sections to components and labels for cleaner JSX
  const sections = [
    { id: 1, label: "Notes", icon: note, component: <Notessection /> },
    { id: 2, label: "Short Link", icon: link, component: <Urlsection /> },
    { id: 3, label: "QR Code", icon: qr, component: <Qrsection /> },
  ];

  return (
    <div className="bg-[#031f39] min-w-full overflow-hidden text-white">
      {/* Banner Section */}
      <section
        className="bg-cover bg-center w-full py-10 px-4"
        style={{ backgroundImage: `url(${stars})` }}
        aria-label="Home banner"
      >
        <h1 className="text-center text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4">
          Empowering digital connections that matter
        </h1>
        <p className="max-w-5xl mx-auto text-center text-xl sm:text-2xl font-medium leading-relaxed px-4">
          Use our URL shortener, QR Codes, and Note Page to engage your audience
          and connect them to the right information. Build, edit, and track
          everything inside the Notezy Connections Platform.
        </p>
      </section>

      {/* Section Switcher */}
      <nav
        className="flex justify-center gap-10 text-2xl font-semibold py-10 cursor-pointer"
        role="tablist"
        aria-label="Select feature section"
      >
        {sections.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setActiveDiv(id)}
            className={`flex items-center px-4 py-2 rounded-xl transition-colors duration-300 ${
              activeDiv === id ? "bg-white text-black" : "text-white"
            }`}
            role="tab"
            aria-selected={activeDiv === id}
            aria-controls={`section-panel-${id}`}
            id={`section-tab-${id}`}
          >
            <img
              src={icon}
              alt={`${label} icon`}
              className="w-10 h-10 sm:w-12 sm:h-12 mr-2"
              aria-hidden="true"
            />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </nav>

      {/* Section Content */}
      <section className="p-5" aria-live="polite">
        {sections.map(({ id, component }) => (
          <div
            key={id}
            id={`section-panel-${id}`}
            role="tabpanel"
            aria-labelledby={`section-tab-${id}`}
            hidden={activeDiv !== id}
            className="flex items-center justify-center bg-[#031f39]"
          >
            {activeDiv === id && component}
          </div>
        ))}
      </section>

      {/* Additional Sections */}
      <Userscount />
      <Review />
      <Footer />
    </div>
  );
};

export default Home;
