import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";

// Components
import FloatingOptionsButton from "./components/FloatingSocialMenu";
import Buy from "./components/Buy";
import NoteApp from "./components/NoteApp";
import Navbar from "./components/Navbar";

const App = () => {
  const location = useLocation();

  // Automatically scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="bg-[#031f39] min-w-full overflow-hidden text-white">
      {/* Navigation Bar */}
      <Navbar />

      {/* Floating action buttons (QR, Shorten, Notes etc.) */}
      <FloatingOptionsButton />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:noteId" element={<NoteApp />} />
        <Route path="/note" element={<NoteApp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/buy" element={<Buy />} />
      </Routes>
    </div>
  );
};

export default App;
