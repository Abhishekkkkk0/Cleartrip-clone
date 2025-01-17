import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./body.css";
import PassengerCount from "../Passenger-count"; // Adjust path as needed
import CalendarDisplay from "../calender/calendar"; // Adjust path as needed
import Button from "../button/button"; // Adjust path as needed
import CustomFlightInput from "../customeInputFlight"; // Make sure the path is correct
import TakeoffIcon from "../takeOff";
import LandingIcon from "../land";
import Footer from "../Footer/footer";

function Body() {
  const [passengerCount, setPassengerCount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [sourceCity, setSourceCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [sourceAirport, setSourceAirport] = useState("");
  const [destinationAirport, setDestinationAirport] = useState("");
  const [error, setError] = useState(null);
  const [startJourney, setStartJourney] = useState("");
  const [endJoureney, setEndjourney]  = useState("");

  const navigate = useNavigate();

  // Handle Date Change
  const handleDateChange = (date) => {
    const dayAbbreviation = date.format("ddd"); // Use dayjs format method to get short day abbreviation
    setSelectedDate(dayAbbreviation); // Save only the weekday abbreviation
  };

  // Handle Search Flights
  // Handle Search Flights
const handleSearchFlights = async () => {
  console.log("Button clicked")
  if (!sourceAirport || !destinationAirport || !selectedDate) {
    setError("Please fill in source, destination, and date.");
    return;
  }

  setError(null);

  const apiURL = `https://academics.newtonschool.co/api/v1/bookingportals/flight?search={"source":"${sourceAirport}","destination":"${destinationAirport}"}&day=${selectedDate}`;

  try {
    const response = await fetch(apiURL, {
      method: "GET",
      headers: {
        projectID: "afznkxyf8vti",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch flights. Please try again.");
    }

    const flightResults = await response.json();


    console.log("Flight Results:", flightResults);
    console.log("Navigating to /flights");  // Debug log to confirm the data
    navigate("/flights", {
      state: {
        flightResults,
        searchDetails: {
          passengerCount,
          sourceCity,
          sourceAirport,
          destinationCity,
          destinationAirport,
          departureDate: selectedDate,
        },
      },
    });
  } catch (error) {
    setError("Unable to fetch flights. Please try again later.");
    console.log(error); // Debug log to check error
  }
};


  return (
    <div className="container">
      <div className="search-text">
        <h1>Search Flights</h1>
        <h4>Enjoy hassle-free bookings with Cleartrip</h4>
      </div>

      <div className="search-item">
        {/* Passenger Count Section */}
        <div className="passenger-count">
          <PassengerCount
            passengerCount={passengerCount}
            onPassengerCountChange={setPassengerCount}
          />
        </div>

        {/* Source and Destination Inputs */}
        <div className="search-data">
          <CustomFlightInput
            placeholder="Where from?"
            adornmentSvg={<TakeoffIcon />}
            onAirportSelect={(airportName, type) => {
              const cityName = airportName.split(" (")[0]; // Extract the city name
              // console.log(cityName);
              const shortCode = airportName.match(/\(([^)]+)\)/)?.[1]; // Extract the airport code
              setSourceAirport(shortCode);
              setSourceCity(cityName); // Store only the city name
            }}
            type="source"
          />
          <CustomFlightInput
            placeholder="Where to?"
            adornmentSvg={<LandingIcon />}
            onAirportSelect={(airportName, type) => {
              const cityName = airportName.split(" (")[0]; // Extract the city name
              const shortCode = airportName.match(/\(([^)]+)\)/)?.[1]; // Extract the airport code
              setDestinationAirport(shortCode);
              setDestinationCity(cityName); // Store only the city name
            }}
            type="destination"
          />
        </div>

        <div className="down-container">
          <div className="date-container">
            <CalendarDisplay onDateChange={handleDateChange} />
          </div>

          {/* Search Button */}
          <div className="search-btn">
            <Button handleClick={handleSearchFlights} buttonText={"Search flights"} />
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default Body;
