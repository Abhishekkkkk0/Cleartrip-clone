import React, { useState, useEffect } from "react";

const FlightModal = ({ flightID, closeModal }) => {
  const [flightData, setFlightData] = useState(null);

  useEffect(() => {
    // Fetch flight data using fetch API
    const fetchFlightData = async () => {
      const url = `https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightID}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            projectID: "afznkxyf8vti", // Replace with your actual projectID
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setFlightData(data);
        } else {
          const errorBody = await response.text();
          console.error("Failed to fetch flight data:", response.status, errorBody);
        }
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlightData();
  }, [flightID]);

  if (!flightData) return <div>Loading...</div>;

  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={closeModal}>Close</button>
        <h2>Flight Information</h2>
        <div className="flight-info">
          <p><strong>Airline:</strong> {flightData.airline}</p>
          <p><strong>Flight Number:</strong> {flightData.flightID}</p>
          <p><strong>Departure:</strong> {flightData.source} at {flightData.departureTime}</p>
          <p><strong>Arrival:</strong> {flightData.destination} at {flightData.arrivalTime}</p>
          <p><strong>Duration:</strong> {flightData.duration} hours</p>
          <p><strong>Available Seats:</strong> {flightData.availableSeats}</p>
          <p><strong>Cabin Baggage:</strong> 7kg</p>
          <p><strong>Check-in Baggage:</strong> 15kg</p>
        </div>
        <h3>Amenities</h3>
        <ul>
          {flightData.amenities && flightData.amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
        <button onClick={() => alert("Proceeding to booking...")}>Book</button>
      </div>
    </div>
  );
};

export default FlightModal;
