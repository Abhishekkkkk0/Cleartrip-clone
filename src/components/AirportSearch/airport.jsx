import React, { useState, useEffect } from "react";

function AirportSearch({ city, onAirportSelect, type }) {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city) {
      setLoading(true);
      setError(null);
      fetch(`https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${city}"}`, {
        headers: {
          projectID: "afznkxyf8vti",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const airportData = data?.data?.airports || [];
          setAirports(airportData);
          console.log(airportData);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch airports", err);
          setLoading(false);
        });
    }
  }, [city]);

  const handleAirportSelect = (airportName) => {
    onAirportSelect(airportName, type);
  };

  return (
    <div className="airport-suggestions">
      {loading && <p>Loading suggestions...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && airports.length > 0 && (
        <div>
          {airports.map((airport) => (
            <button
              key={airport._id}
              onClick={() =>
                handleAirportSelect(`${airport.city} (${airport.iata_code})`)
              }>
               {airport.city}, {airport.country}
              <br />
              <small>IATA: {airport.iata_code}</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AirportSearch;
