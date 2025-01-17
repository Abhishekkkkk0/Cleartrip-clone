import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./offers.css";

const OfferSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    shortProducts();
  }, []);

  const shortProducts = async () => {
    try {
      const url =
        "https://academics.newtonschool.co/api/v1/bookingportals/offers";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          projectId: "afznkxyf8vti",
        },
      });
      const json = await response.json();
      const offers = json.data.offers;
      
      setData(offers);
      console.log(offers);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="advertisement-slider-container">
      <Slider {...settings}>
        {data.slice(0, 5).map((item, index) => (
          <div key={index} className="advertisement-slide">
            <img src={item.heroUrl} alt={`Advertisement ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <h3>More Offers</h3>
      <div className="more-offer-slider-container">
        <Slider {...settings}>
          {data.slice(5, 10).map((item, index) => (
            <div key={index} className="more-offer-card">
              <h4>{item.ctaText}</h4>
              <p>{item.pTl}</p>
              <p>{item.pTx}</p>
              <a href="#" className="cta-link">
                Know more
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default OfferSection;
