import React from "react";
import Slider from "react-slick";
import CardMedia from "@mui/material/CardMedia";
import "./index.css";

// Custom Arrow Components
const CustomPrevArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow prev-arrow`}
    style={{ ...style }}
    onClick={(e) => {
      e.stopPropagation(); // Prevent click propagation
      onClick();
    }}
  >
    &#8592;
  </div>
);

const CustomNextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow next-arrow`}
    style={{ ...style }}
    onClick={(e) => {
      e.stopPropagation(); // Prevent click propagation
      onClick();
    }}
  >
    &#8594;
  </div>
);

function HotelCards({ hotel }) {
  // Determine the rating color based on value
  const ratingColor = hotel.rating < 3.5 ? "yellow" : "green";

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // Disable autoplay
    arrows: true, // Enable arrows
    prevArrow: <CustomPrevArrow />, // Custom left arrow
    nextArrow: <CustomNextArrow />, // Custom right arrow
  };

  return (
    <div className="card-head">
      {/* Image Slider Section */}
      <div className="img-section">
        <Slider {...sliderSettings}>
          {hotel.images.map((image, index) => (
            <CardMedia
              key={index}
              component="img"
              height="150"
              image={image}
              alt={hotel.name}
            />
          ))}
        </Slider>
      </div>

      {/* Hotel Details Section */}
      <div className="name-line">
        <p>{hotel.name}</p>
        <p className={`rating-line ${ratingColor}`}>{hotel.rating}/5</p>
      </div>
      <div className="star-line">
        {hotel.location}
      </div>
      <div className="price-line">
        ₹ {Math.round(hotel.avgCostPerNight)} <span className="night-line">/ night</span>
      </div>
    </div>
  );
}

export default HotelCards;
