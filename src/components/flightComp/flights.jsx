import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./flight.css"; // Import the CSS file for styling
import ModalManager from "../singnup-signin/modal";

function FlightComponent({
  key,
  image,
  name,
  departureTime,
  duration,
  arrivalTime,
  source,
  destination,
  stops,
  seats,
  amenities,
  price,
}) {
  const [isExpanded, setIsExpanded] = useState(false); // State to control expansion
  const [isModalVisible, setModalVisible] = useState(false); // To control modal visibility
  const navigate = useNavigate(); // Initialize navigate hook

  const toggleExpand = () => {
    setIsExpanded(!isExpanded); // Toggle the expansion of the parent container
  };

  const formattedPrice = price
    ? `₹${price.toLocaleString()}`
    : "Price not available";

  // Function to handle booking click and navigate to booking page
  const handleBookClick = () => {
    if (!localStorage.getItem("authToken")) {
      // Trigger login modal if not authenticated
      setModalVisible(true);
    } else {
      // Proceed with booking if logged in
      navigate("/Flight-booking", {
        state: {
          flightResults: {
            key,
            image,
            seats,
            name,
            departureTime,
            duration,
            arrivalTime,
            source,
            destination,
            stops,
            amenities,
            price,
          },
        },
      });
    }
  };

  // Handle login failure (user cancels or doesn't log in)
  const handleLoginFailure = () => {
    setModalVisible(false); // Close the modal
    navigate("/hotel-booking"); // Navigate to the hotel booking page
  };

  return (
    <div
      className={`flight-card ${isExpanded ? "expanded" : ""}`}
      onClick={toggleExpand} // Toggle expansion on clicking anywhere inside the card
    >
      {/* Upper Section */}
      <div className="flight-info">
        <div className="upper-info">
          <div className="flight-image-name">
            <img
              src={image}
              alt={`Flight with ${name}`}
              className="flight-image"
            />
            <p className="flight-name">{name}</p>
          </div>

          <div className="flight-details">
            <div className="flight-item">{departureTime}</div>
            <div className="flight-item">{duration} hours</div>
            <div className="flight-item">{arrivalTime}</div>
            <div className="flight-item">{formattedPrice}</div>
            <div>
              <button className="book-button" onClick={handleBookClick}>
                Book
              </button>
              <p
                className={`seats-info ${
                  seats < 70 ? "low-seats" : "available-seats"
                }`}
              >
                {seats} seats left
              </p>
            </div>
            {/* Book button with onClick handler */}
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <button className="dropdown-button" onClick={toggleExpand}>
        {isExpanded ? "Hide Details" : "Show Details"}
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="expanded-details">
          <div className="expanded-additional-details">
            <div className="expanded-image-container">
              <img src={image} alt="Flight Image" className="expanded-image" />
            </div>

            <div className="expanded-detail-item">
              <span className="time time-departure">{departureTime}</span>{" "}
              {source}
            </div>

            <div className="expanded-detail-item">
              <svg width="20" height="20">
                <g fill="#4D4D4D" fillRule="evenodd">
                  <path
                    d="M19.202 6.102c-1.055-2.459-2.847-4.246-5.325-5.304A9.83 9.83 0 009.984 0a9.728 9.728 0 00-3.882.798C3.643 1.853 1.844 3.64.787 6.102A9.732 9.732 0 000 9.984c0 1.356.258 2.659.787 3.893 1.057 2.462 2.857 4.26 5.315 5.314a9.728 9.728 0 003.882.798c1.355 0 2.654-.27 3.892-.798 2.48-1.057 4.271-2.856 5.326-5.314A9.782 9.782 0 0020 9.984a9.724 9.724 0 00-.798-3.882zm-1.597 8.3a8.773 8.773 0 01-3.215 3.203 8.613 8.613 0 01-4.406 1.181c-1.192 0-2.33-.23-3.412-.7-1.083-.47-2.017-1.088-2.8-1.87-.781-.781-1.404-1.725-1.87-2.81a8.61 8.61 0 01-.688-3.422c0-1.586.39-3.054 1.17-4.396a8.778 8.778 0 013.204-3.204 8.546 8.546 0 014.396-1.181c1.585 0 3.06.396 4.406 1.18a8.8 8.8 0 013.215 3.205 8.547 8.547 0 011.181 4.396 8.629 8.629 0 01-1.18 4.417z"
                    fillRule="nonzero"
                  ></path>
                  <path d="M10.618 9.902V4.237c0-.339-.295-.612-.634-.612a.616.616 0 00-.602.612V9.99c0 .011.022.055.022.088a.572.572 0 00.164.492l3.27 3.27a.622.622 0 00.842 0 .59.59 0 000-.854l-3.062-3.083z"></path>
                </g>
              </svg>
              <span className="hours">{duration} hours</span>
              <span className="hours">
                {stops === 0
                  ? "Non-stop"
                  : stops === 1
                  ? "1 Stop"
                  : `${stops} Stops`}
              </span>
            </div>

            <div className="expanded-detail-item">
              <span className="time time-arrival">{arrivalTime}</span>{" "}
              {destination}
            </div>

            <div className="expanded-detail-item">
              <ul className="amenities-list">
                {amenities.map((amenity, index) => (
                  <li key={index} className="amenity-item">
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Modal for login/signup */}
      {isModalVisible && (
        <ModalManager 
        isModalVisible={isModalVisible}
          closeModal={() => setModalVisible(false)}
          onLoginFailure={handleLoginFailure}
          onLoginSuccess={() => {
            setModalVisible(false);
            handleBookClick(); // Proceed to booking after successful login
          }}
          />
      )}
    </div>
  );
}

export default FlightComponent;
