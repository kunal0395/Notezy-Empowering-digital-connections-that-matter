import React, { useState, useEffect } from "react";

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "John Doe",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      message: "Notezy makes link management so easy!",
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      message: "The QR codes have improved my marketing campaigns!",
    },
    {
      id: 3,
      name: "Alice Johnson",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      message: "A fantastic platform for connecting with my audience!",
    },
    {
      id: 4,
      name: "Michael Brown",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      message: "I love how simple and effective it is to use Notezy!",
    },
    {
      id: 5,
      name: "Emily Davis",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      message: "Creating and managing QR codes has never been easier!",
    },
    {
      id: 6,
      name: "David Wilson",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
      message: "Great tool for both personal and business use!",
    },
    {
      id: 7,
      name: "Sophia Miller",
      image: "https://randomuser.me/api/portraits/women/7.jpg",
      message: "The customization options for QR codes are fantastic!",
    },
    {
      id: 8,
      name: "James Anderson",
      image: "https://randomuser.me/api/portraits/men/8.jpg",
      message: "Notezy has streamlined my link-sharing process!",
    },
    {
      id: 9,
      name: "Olivia Martinez",
      image: "https://randomuser.me/api/portraits/women/9.jpg",
      message: "User-friendly and visually appealing platform!",
    },
    {
      id: 10,
      name: "William Thomas",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
      message: "Highly recommend Notezy for anyone looking to manage links!",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000); // a bit slower for better reading time

    return () => clearInterval(interval);
  }, [reviews.length]);

  const getPositionClass = (index) => {
    if (index === currentIndex) return "z-10 scale-105 opacity-100";
    if (index === (currentIndex - 1 + reviews.length) % reviews.length)
      return "z-0 -translate-x-24 blur-sm opacity-50";
    if (index === (currentIndex + 1) % reviews.length)
      return "z-0 translate-x-24 blur-sm opacity-50";
    return "hidden";
  };

  return (
    <section
      aria-label="Customer Reviews"
      className="relative bg-[#f36600] py-16 px-4 sm:px-6 lg:px-8 overflow-visible"
      style={{ minHeight: "500px" }}
    >
      {/* Title */}
      <h1 className="text-center text-white text-4xl sm:text-5xl font-extrabold mb-12 select-none drop-shadow-lg">
        What our customers are saying
      </h1>

      {/* Review Cards Container */}
      <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto h-[380px] sm:h-[420px] md:h-[450px] overflow-visible">
        {reviews.map((review, index) => (
          <article
            key={review.id}
            className={`absolute w-64 sm:w-72 h-80 bg-white rounded-xl shadow-2xl flex flex-col items-center justify-center px-6 py-8 transition-all duration-700 ease-in-out cursor-default select-text ${
              getPositionClass(index)
            }`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${review.name} testimonial`}
          >
            {/* User Image */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-600 mb-6 shadow-lg">
              <img
                src={review.image}
                alt={`${review.name}'s portrait`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* User Name */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {review.name}
            </h3>

            {/* User Message */}
            <p className="text-center text-gray-700 text-base leading-relaxed">
              {review.message}
            </p>
          </article>
        ))}
      </div>

      {/* Dots Navigation */}
      <nav
        aria-label="Reviews navigation"
        className="flex justify-center mt-10 gap-3"
      >
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
              index === currentIndex
                ? "bg-white"
                : "bg-white/40 hover:bg-white/70"
            }`}
            aria-current={index === currentIndex}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </nav>
    </section>
  );
};

export default Review;
