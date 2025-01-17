import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./index.css";

const ImageSlider = () => {
  const [images, setImages] = useState([]); // State to store image URLs
  const location = useLocation();
  const { hotelId } = location.state || {};

  const [hotelData, setHotelData] = useState(null); // State to store fetched hotel data
  const [error, setError] = useState(null); // State to handle errors
  const [isLoading, setIsLoading] = useState(true); // State to handle loading

  const [currentIndex, setCurrentIndex] = useState(0); // State to track current image

  useEffect(() => {
    if (!hotelId) {
      setError("No Hotel ID provided. Please navigate from the hotels page.");
      setIsLoading(false);
      return;
    }

    const fetchHotelData = async () => {
      try {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotelId}`,
          {
            method: "GET",
            headers: {
              projectID: "afznkxyf8vti",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setHotelData(data);
        setImages(data.data.images); // Update images state with fetched image URLs
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotelData();
  }, [hotelId]);

  // Function to handle the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to handle the previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image-container">
      {isLoading && <p>Loading hotel data...</p>}
      {error && <p>Error: {error}</p>}
      {hotelData && (
        <>
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <div className="arrows">
            <button onClick={prevImage}>&#10094;</button>
            <button onClick={nextImage}>&#10095;</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
