import React, { useState } from "react";
import linkedin from "../assets/linkedin.png";
import email from "../assets/email.png";

function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // This is just a client-side simulation of submission
    setTimeout(() => {
      alert("Form submitted successfully!");
      setFormState({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="bg-[#031f39] text-white p-8 min-h-screen flex flex-col items-center">
      {/* Page Heading */}
      <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-8xl text-center mb-8 sm:mb-14">
        Contact
      </h1>

      {/* Description */}
      <p className="max-w-2xl text-center text-lg sm:text-xl lg:text-lg mb-8">
        If you have any questions, requests, or feedback, we would love to hear
        it!
      </p>

      {/* Contact Icons */}
      <div className="flex justify-center space-x-8 mb-10">
        <a
          href="mailto:kp3244510@gmail.com"
          aria-label="Send email"
          className="hover:opacity-80 transition"
        >
          <img
            src={email}
            alt="Email icon"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg"
          />
        </a>
        <a
          href="https://in.linkedin.com/in/kunal-patil-98a593285"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          className="hover:opacity-80 transition"
        >
          <img
            src={linkedin}
            alt="LinkedIn icon"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg"
          />
        </a>
      </div>

      {/* Form Section */}
      <form
        className="max-w-xl w-full mx-auto"
        action="https://formspree.io/f/xvoebwzg"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formState.name}
          onChange={handleChange}
          required
          className="mb-6 p-3 w-full bg-[#031f39] text-white outline-none border-b border-white placeholder-gray-400"
        />

        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
          required
          className="mb-6 p-3 w-full bg-[#031f39] text-white outline-none border-b border-white placeholder-gray-400"
        />

        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Enter your message here. If you want to report a bug or something, please let us know if you were using the app or web version."
          value={formState.message}
          onChange={handleChange}
          required
          className="mb-4 p-3 w-full bg-[#031f39] text-white outline-none border-b border-white resize-none h-28 sm:h-30 placeholder-gray-400"
        ></textarea>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-orange-500 text-white py-3 px-6 rounded-md w-full sm:w-auto hover:bg-orange-600 transition duration-200 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
          aria-live="polite"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default Contact;
