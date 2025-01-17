import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import MainNavbar from "../../components/main-navbar";
import Footer from "../../components/Footer/footer";

function FlightBookingResults() {
  const [showAlert, setShowAlert] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { flightResults, loggedInUser } = location.state || {}; // Get user and flight data

  if (!flightResults) {
    return <div>No flight details available</div>;
  }

  const {
    image,
    name,
    departureTime,
    duration,
    arrivalTime,
    source,
    destination,
    stops,
    amenities,
    price,
  } = flightResults;

  const handleConfirm = () => {
    setBookingConfirmed(true);
    setShowAlert(true);

    // Save the booking to localStorage for the logged-in user
    const currentBookings = JSON.parse(localStorage.getItem(`${loggedInUser}_flights`)) || [];
    const newBooking = {
      image,
      name,
      departureTime,
      duration,
      arrivalTime,
      source,
      destination,
      stops,
      amenities,
      price,
    };
    localStorage.setItem(`${loggedInUser}_flights`, JSON.stringify([...currentBookings, newBooking]));

    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleViewBookings = () => {
    navigate("/trips", { state: { loggedInUser } }); // Navigate to Trips with logged-in user state
  };

  return (
    <div className="flight-summary-wrapper">
      <MainNavbar />
      <div className="main-content">
        <div className="flight-summary-card">
          <img src={image} alt="Flight" className="flight-card-image" />
          <h3 className="flight-card-title">{name}</h3>

          <div className="flight-card-details">
            <div className="flight-time-row">
              <div className="flight-source">
                <span className="flight-time">{departureTime}</span>
                <span className="flight-location">{source}</span>
              </div>
              <div className="flight-duration">
                <span>{duration} hrs</span>
                <span>{stops === 0 ? "Non-stop" : `${stops} Stop${stops > 1 ? "s" : ""}`}</span>
              </div>
              <div className="flight-destination">
                <span className="flight-time">{arrivalTime}</span>
                <span className="flight-location">{destination}</span>
              </div>
            </div>
            <div className="flight-amenities">
              <h5>Amenities:</h5>
              <ul>
                {amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
            <div className="flight-price">
              <h4>₹{price.toLocaleString()}</h4>
            </div>
          </div>

          <div className="flight-card-actions">
            {!bookingConfirmed ? (
              <>
                <button onClick={() => navigate(-1)} className="back-btn">
                  Back
                </button>
                <button onClick={handleConfirm} className="confirm-btn">
                  Confirm Booking
                </button>
              </>
            ) : (
              <div className="confirmation-message">
                <h3>Booking Confirmed!</h3>
                <button onClick={handleViewBookings} className="view-bookings-btn">
                  View Bookings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FlightBookingResults;
