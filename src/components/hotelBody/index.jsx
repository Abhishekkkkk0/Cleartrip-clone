import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ComboBox from "../../components/customInput/index";
import CalendarDisplay from "../../components/calender/calendar";
import RoomGuestSelector from "../../components/RoomGuestSelector";
import dayjs from "dayjs";
import "./index.css";

// Utility function to get the first name before a comma
const getFirstName = (city) => city.split(",")[0].trim();

function HotelBody() {
  const [selectedCity, setSelectedCity] = useState("");
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [hotelsData, setHotelsData] = useState([]);
  const [guestsAndRooms, setGuestsAndRooms] = useState({ rooms: 1, guests: 1 });
  const navigate = useNavigate();

  // Handle the search button click
  const handleSearch = async () => {
    const sanitizedCity = getFirstName(selectedCity);
    const apiUrl = `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${sanitizedCity}"}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          projectID: "afznkxyf8vti",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      const hotels = data.data.hotels;
      setHotelsData(hotels);

      if (hotels.length > 0) {
        const formattedCheckInDate = checkInDate
          ? dayjs(checkInDate).format("YYYY-MM-DD")
          : null;
        const formattedCheckOutDate = checkOutDate
          ? dayjs(checkOutDate).format("YYYY-MM-DD")
          : null;

        navigate("/hotelsCard", {
          state: {
            hotels,
            userInput: {
              city: sanitizedCity,
              checkInDate: formattedCheckInDate,
              checkOutDate: formattedCheckOutDate,
              rooms: guestsAndRooms.rooms,
              guests: guestsAndRooms.guests,
            },
          },
        });
      } else {
        alert("No hotels found for the selected criteria.");
      }
    } catch (error) {
      console.error("Error during API request:", error);
      alert("Unable to fetch hotels. Please try again.");
    }
  };

  return (
    <div className="hotel-container">
      <div className="hotel-header">
        <h1>Search hotels</h1>
        <h4>Enjoy hassle-free bookings with Cleartrip</h4>
      </div>
      <div className="hotel-search-box">
        <div className="hotel-input-wrapper">
          <ComboBox selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
        </div>
        <div className="hotel-details-wrapper">
          <CalendarDisplay
            label="Check-in "
            selectedDate={checkInDate}
            onDateChange={(date) => setCheckInDate(date)}
          />
          <CalendarDisplay
            label="Check-out "
            selectedDate={checkOutDate}
            onDateChange={(date) => setCheckOutDate(date)}
          />
          <RoomGuestSelector
            rooms={guestsAndRooms.rooms}
            guests={guestsAndRooms.guests}
            onChange={(updatedData) => setGuestsAndRooms(updatedData)}
          />
        </div>
        <button className="hotel-search-button" onClick={handleSearch}>
          Search hotels
        </button>
      </div>
    </div>
  );
}

export default HotelBody;
