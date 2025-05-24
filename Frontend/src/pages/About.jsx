import React from "react";
import { useNavigate } from "react-router-dom";
import note from "../assets/note.png";
import link from "../assets/link.svg";
import qr from "../assets/qr.svg";
import mission from "../assets/mission.png";
import about from "../assets/about.jpg";

const About = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Scroll smoothly to top before navigating
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  return (
    <div className="bg-[#031f39] min-h-screen text-white">
      <div className="py-16 px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-14 sm:mb-20">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to Notezy</h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
              Your one-stop solution for note-taking, URL shortening, and QR code generation.
            </p>
          </section>

          {/* About Section */}
          <section className="grid gap-12 md:grid-cols-2 mb-20 items-center">
            {/* Left Content */}
            <article className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-semibold">What is Notezy?</h2>
              <p className="text-gray-300 leading-relaxed">
                Notezy is a powerful platform designed to simplify your everyday tasks. Whether
                you're jotting down ideas, shortening URLs, or creating QR codes, Notezy offers an
                intuitive and streamlined experience.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We’re here to help you stay organized, share easily, and work smarter with tools
                that are fast, efficient, and accessible anywhere.
              </p>
            </article>

            {/* Right Image */}
            <figure className="flex justify-center">
              <img
                src={about}
                alt="Illustration showing Notezy features"
                className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm md:w-96 h-auto object-cover"
              />
            </figure>
          </section>

          {/* Features Section */}
          <section className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10">
              Features We’re Proud Of
            </h2>
            <div className="grid gap-10 sm:gap-12 md:grid-cols-3">
              {[
                {
                  img: note,
                  alt: "Notes Icon",
                  title: "Write and Edit Notes",
                  desc:
                    "Note down notes with ease and customize them to your liking. Format your text, change font colors, and edit on the go.",
                },
                {
                  img: link,
                  alt: "URL Shortener Icon",
                  title: "URL Shortener",
                  desc:
                    "Convert long URLs into compact, shareable links in seconds. Perfect for social media, emails, and more.",
                },
                {
                  img: qr,
                  alt: "QR Code Generator Icon",
                  title: "QR Code Generator",
                  desc:
                    "Instantly generate QR codes for links. Share with anyone, anywhere.",
                },
              ].map(({ img, alt, title, desc }, i) => (
                <article
                  key={i}
                  className="bg-white text-gray-800 p-6 rounded-xl shadow-lg text-center flex flex-col items-center"
                >
                  <img src={img} alt={alt} className="mb-5 w-20 h-20 sm:w-24 sm:h-24" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-3">{title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{desc}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Mission Section */}
          <section className="grid gap-12 md:grid-cols-2 items-center mb-20">
            <figure className="flex justify-center">
              <img
                src={mission}
                alt="Our mission illustration"
                className="rounded-xl shadow-lg w-full max-w-xs sm:max-w-sm md:w-96 h-auto object-cover"
              />
            </figure>
            <article>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                At Notezy, our mission is to empower individuals and businesses with tools that
                simplify their workflow. We aim to make your digital life easier, more productive,
                and stress-free.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Join us and experience the ultimate platform for productivity and collaboration.
              </p>
            </article>
          </section>

          {/* CTA Section */}
          <section className="text-center mt-12 sm:mt-20">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Ready to Get Started?</h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Discover how Notezy can transform the way you work and share. Try Now!
            </p>
            <button
              onClick={handleClick}
              className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition focus:outline-none focus:ring-4 focus:ring-blue-400"
              aria-label="Try Notezy now"
            >
              Try It
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
