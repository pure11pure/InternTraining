import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Carousel = ({ images, startIndex, autoplay, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  // Function to go to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Autoplay effect
  useEffect(() => {
    if (autoplay) {
      const timer = setInterval(() => {
        nextImage();
      }, interval);
      return () => clearInterval(timer);
    }
  }, [currentIndex, autoplay, interval]);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="relative w-full max-w-4xl">
        {images && images.length > 0 && (
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="h-auto w-full rounded-lg object-cover shadow-lg"
          />
        )}

        <button
          onClick={prevImage}
          className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 text-black shadow hover:bg-opacity-75"
        >
          Previous
        </button>
        <button
          onClick={nextImage}
          className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 text-black shadow hover:bg-opacity-75"
        >
          Next
        </button>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  // images should be an array of strings (URLs) and is required
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  // startIndex should be a number and optional
  startIndex: PropTypes.number,
  // autoplay should be a boolean and optional
  autoplay: PropTypes.bool,
  // interval should be a number and optional
  interval: PropTypes.number,
};

Carousel.defaultProps = {
  startIndex: 0,
  autoplay: true,
  interval: 3000,
};

export default Carousel;
