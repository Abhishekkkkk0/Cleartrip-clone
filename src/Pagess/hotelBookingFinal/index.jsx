import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainNavbar from "../../components/main-navbar";
import Footer from "../../components/Footer/footer";
import "./HotelBookingConfirmPage.css";

const HotelBookingConfirmPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails, hotelData, loggedInUser } = location.state || {};

  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  if (!bookingDetails || !hotelData) {
    return <div className="no-details">No booking details found</div>;
  }

  const handleConfirmBooking = () => {
    const currentBookings = JSON.parse(localStorage.getItem(`${loggedInUser}_hotels`)) || [];
    const newBooking = {
      hotelName: hotelData.data.name,
      location: hotelData.data.location,
      amenities: hotelData.data.amenities,
      bedDetails: bookingDetails.bed,
      cancellationPolicy: bookingDetails.cancellation,
      price: bookingDetails.price,
    };

    // Save updated bookings to localStorage
    localStorage.setItem(`${loggedInUser}_hotels`, JSON.stringify([...currentBookings, newBooking]));

    setIsBookingConfirmed(true);
    setShowAlert(true); // Show confirmation alert

    // Hide alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleViewBookings = () => {
    navigate("/trips", { state: { loggedInUser } }); // Navigate to Trips with logged-in user state
  };

  const amenityImages = {
    "Free WiFi": (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 640 512"
        height="22"
        width="22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M634.91 154.88C457.74-8.99 182.19-8.93 5.09 154.88c-6.66 6.16-6.79 16.59-.35 22.98l34.24 33.97c6.14 6.1 16.02 6.23 22.4.38 145.92-133.68 371.3-133.71 517.25 0 6.38 5.85 16.26 5.71 22.4-.38l34.24-33.97c6.43-6.39 6.3-16.82-.36-22.98zM320 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm202.67-83.59c-115.26-101.93-290.21-101.82-405.34 0-6.9 6.1-7.12 16.69-.57 23.15l34.44 33.99c6 5.92 15.66 6.32 22.05.8 83.95-72.57 209.74-72.41 293.49 0 6.39 5.52 16.05 5.13 22.05-.8l34.44-33.99c6.56-6.46 6.33-17.06-.56-23.15z"></path>
      </svg>
    ),
    "Swimming Pool": (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 640 512"
        height="22"
        width="22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M189.61 310.58c3.54 3.26 15.27 9.42 34.39 9.42s30.86-6.16 34.39-9.42c16.02-14.77 34.5-22.58 53.46-22.58h16.3c18.96 0 37.45 7.81 53.46 22.58 3.54 3.26 15.27 9.42 34.39 9.42s30.86-6.16 34.39-9.42c14.86-13.71 31.88-21.12 49.39-22.16l-112.84-80.6 18-12.86c3.64-2.58 8.28-3.52 12.62-2.61l100.35 21.53c25.91 5.53 51.44-10.97 57-36.88 5.55-25.92-10.95-51.44-36.88-57L437.68 98.47c-30.73-6.58-63.02.12-88.56 18.38l-80.02 57.17c-10.38 7.39-19.36 16.44-26.72 26.94L173.75 299c5.47 3.23 10.82 6.93 15.86 11.58zM624 352h-16c-26.04 0-45.8-8.42-56.09-17.9-8.9-8.21-19.66-14.1-31.77-14.1h-16.3c-12.11 0-22.87 5.89-31.77 14.1C461.8 343.58 442.04 352 416 352s-45.8-8.42-56.09-17.9c-8.9-8.21-19.66-14.1-31.77-14.1h-16.3c-12.11 0-22.87 5.89-31.77 14.1C269.8 343.58 250.04 352 224 352s-45.8-8.42-56.09-17.9c-8.9-8.21-19.66-14.1-31.77-14.1h-16.3c-12.11 0-22.87 5.89-31.77 14.1C77.8 343.58 58.04 352 32 352H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h16c38.62 0 72.72-12.19 96-31.84 23.28 19.66 57.38 31.84 96 31.84s72.72-12.19 96-31.84c23.28 19.66 57.38 31.84 96 31.84s72.72-12.19 96-31.84c23.28 19.66 57.38 31.84 96 31.84h16c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zm-512-96c44.18 0 80-35.82 80-80s-35.82-80-80-80-80 35.82-80 80 35.82 80 80 80z"></path>
      </svg>
    ),
    Spa: (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 576 512"
        height="22"
        width="22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M568.25 192c-29.04.13-135.01 6.16-213.84 83-33.12 29.63-53.36 63.3-66.41 94.86-13.05-31.56-33.29-65.23-66.41-94.86-78.83-76.84-184.8-82.87-213.84-83-4.41-.02-7.79 3.4-7.75 7.82.23 27.92 7.14 126.14 88.77 199.3C172.79 480.94 256 480 288 480s115.19.95 199.23-80.88c81.64-73.17 88.54-171.38 88.77-199.3.04-4.42-3.34-7.84-7.75-7.82zM287.98 302.6c12.82-18.85 27.6-35.78 44.09-50.52 19.09-18.61 39.58-33.3 60.26-45.18-16.44-70.5-51.72-133.05-96.73-172.22-4.11-3.58-11.02-3.58-15.14 0-44.99 39.14-80.27 101.63-96.74 172.07 20.37 11.7 40.5 26.14 59.22 44.39a282.768 282.768 0 0 1 45.04 51.46z"></path>
      </svg>
    ),
    Gym: (
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="22"
        width="22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.2739 9.86883L16.8325 4.95392L18.4708 3.80676L21.9122 8.72167L20.2739 9.86883Z"
          fill="currentColor"
        ></path>
        <path
          d="M18.3901 12.4086L16.6694 9.95121L8.47783 15.687L10.1985 18.1444L8.56023 19.2916L3.97162 12.7383L5.60992 11.5912L7.33068 14.0487L15.5222 8.31291L13.8015 5.8554L15.4398 4.70825L20.0284 11.2615L18.3901 12.4086Z"
          fill="currentColor"
        ></path>
        <path
          d="M20.7651 7.08331L22.4034 5.93616L21.2562 4.29785L19.6179 5.445L20.7651 7.08331Z"
          fill="currentColor"
        ></path>
        <path
          d="M7.16753 19.046L3.72607 14.131L2.08777 15.2782L5.52923 20.1931L7.16753 19.046Z"
          fill="currentColor"
        ></path>
        <path
          d="M4.38208 18.5549L2.74377 19.702L1.59662 18.0637L3.23492 16.9166L4.38208 18.5549Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
    Restaurant: (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 512 512"
        height="22"
        width="22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke-linejoin="round"
          stroke-width="32"
          d="m57.49 47.74 368.43 368.43a37.28 37.28 0 0 1 0 52.72 37.29 37.29 0 0 1-52.72 0l-90-91.55a32 32 0 0 1-9.2-22.43v-5.53a32 32 0 0 0-9.52-22.78l-11.62-10.73a32 32 0 0 0-29.8-7.44 48.53 48.53 0 0 1-46.56-12.63l-85.43-85.44C40.39 159.68 21.74 83.15 57.49 47.74z"
        ></path>
        <path
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
          d="m400 32-77.25 77.25A64 64 0 0 0 304 154.51v14.86a16 16 0 0 1-4.69 11.32L288 192m32 32 11.31-11.31a16 16 0 0 1 11.32-4.69h14.86a64 64 0 0 0 45.26-18.75L480 112m-40-40-80 80M200 368l-99.72 100.28a40 40 0 0 1-56.56 0h0a40 40 0 0 1 0-56.56L128 328"
        ></path>
      </svg>
    ),
    Bar: (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 24 24"
        height="22"
        width="22"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="none" d="M0 0h24v24H0V0z"></path>
        <path d="M14.77 9 12 12.11 9.23 9h5.54M21 3H3v2l8 9v5H6v2h12v-2h-5v-5l8-9V3zM7.43 7 5.66 5h12.69l-1.78 2H7.43z"></path>
      </svg>
    ),
  };
  

  return (
    <div className="hotel-booking-confirm-page">
      {/* Navbar */}
      <MainNavbar />

      {/* Booking Confirmation Card */}
      <div className="confirmation-card">
        <h2 className="confirmation-title">Booking Confirmation</h2>

        {/* Hotel Details */}
        <div className="hotel-details">
          <h3 className="hotel-name">{hotelData.data.name}</h3>
          <p className="hotel-location">{hotelData.data.location}</p>
          <div className="hotel-amenities">
            <h5>Amenities:</h5>
            <ul className="amenities-list">
              {hotelData.data.amenities.map((amenity, index) => (
                <li key={index} className="amenity-item">
                  {amenityImages[amenity] && (
                    <span className="amenity-icon">
                      {amenityImages[amenity]}
                    </span>
                  )}
                  <span className="amenity-text">{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking Details */}
        <div className="booking-details">
          <p>
            <strong>Bed Details:</strong> {bookingDetails.bed}
          </p>
          <p>
            <strong>Cancellation Policy:</strong> {bookingDetails.cancellation}
          </p>
          <p>
            <strong>Price:</strong> ₹{bookingDetails.price}/ night
          </p>
        </div>

        {/* Confirm Booking Button */}
        {!isBookingConfirmed ? (
          <button onClick={handleConfirmBooking}>Confirm Booking</button>
        ) : (
          <>
            <p className="confirmation-message">Booking Confirmed!</p>
            <button onClick={handleViewBookings}>View Bookings</button>
          </>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HotelBookingConfirmPage;

