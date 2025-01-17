import React, { useState } from "react";
import Button from '../button/button';
import ModalManager from "../singnup-signin/modal"; // Import ModalManager
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./index.css";

function HotelRooms({ roomType, roomSize, bed, price, cancellation , hotelData}) {
  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [bookingDetails, setBookingDetails] = useState(null); // For storing booking details
  const navigate = useNavigate(); // Initialize the navigate function




  // Handle booking button click
  const handleBookClick = () => {
    if (!localStorage.getItem("authToken")) {
      // Show login modal if not authenticated
      setModalVisible(true);
    } else {
      // Proceed with booking if logged in
      setBookingDetails({ roomType, roomSize, bed, price, cancellation });
      // Navigate to the confirmation page with booking details
      navigate("/hotelBookingConfirm", { 
        state: { 
          bookingDetails: { roomType, roomSize, bed, price, cancellation }, 
          hotelData: hotelData // Add hotelData to the state object
        } 
      });
    }
  };
  const cardImages = {
    bed: (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 9.557V3h-2v2H6V3H4v6.557C2.81 10.25 2 11.525 2 13v4a1 1 0 0 0 1 1h1v4h2v-4h12v4h2v-4h1a1 1 0 0 0 1-1v-4c0-1.475-.811-2.75-2-3.443zM18 7v2h-5V7h5zM6 7h5v2H6V7zm14 9H4v-3c0-1.103.897-2 2-2h12c1.103 0 2 .897 2 2v3z"></path>
      </svg>
    ),
    cancellation: (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M11.21 20H5V10h14v4.38l2-2V6c0-1.1-.9-2-2-2h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h8.21l-2-2zM5 6h14v2H5V6zm11.54 16.5L13 18.96l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66zM10.41 14 12 15.59 10.59 17 9 15.41 7.41 17 6 15.59 7.59 14 6 12.41 7.41 11 9 12.59 10.59 11 12 12.41 10.41 14z"></path>
      </svg>
    ),
  };

  // Handle login failure (when user cancels or doesn't log in)
  const handleLoginFailure = () => {
    setModalVisible(false); // Close modal
  };

  return (
    <div className="room-head">
      <div className="room-type">
        <h3>{roomType}</h3>
      </div>
      <div className="room-size">
        <p>{roomSize}.0 sq.ft.</p>
      </div>
      <div className="room-details">
        <div className="room-bed">
          {cardImages.bed}
          <p>{bed}</p>
        </div>
        <div className="room-cancellation">
          {cardImages.cancellation}
          <p>{cancellation}</p>
        </div>
      </div>
      <div className="room-price">₹{price}<span className='night-line'>/ night</span></div>
      
      {/* Book Button */}
      <Button buttonText="Book" handleClick={handleBookClick} />

      {/* Modal for login/signup */}
      {isModalVisible && (
        <ModalManager 
        isModalVisible={isModalVisible}
        closeModal={() => {
          console.log("Modal closed");
          setModalVisible(false); // Close modal
        }}
        onLoginFailure={() => {
          console.log("Login failed or canceled");
          setModalVisible(false); // Close modal
        }}
        onLoginSuccess={() => {
          console.log("Login successful");
          setModalVisible(false); // Close modal
          handleBookClick(); // Retry booking after login
        }}
      />
      
      )}
    </div>
  );
}

export default HotelRooms;









