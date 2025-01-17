import React, { useEffect, useState } from "react";

function HotelCity({ onCitySelect }) {
  const [cityData, setCityData] = useState([]);

  async function fetchCity() {
    try {
      const response = await fetch("https://academics.newtonschool.co/api/v1/bookingportals/city", {
        method: "GET",
        headers: {
          projectID: "afznkxyf8vti",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cities.");
      }

      const data = await response.json();
      setCityData(data.data.cities);
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  }

  useEffect(() => {
    fetchCity();
  }, []);

  return (
    <div className="suggestions-container">
      <ul>
        {cityData.map((city, index) => (
          <li key={index} onClick={() => onCitySelect(city.cityState)} className="suggestion-item">
            <img src="../assets/images/Location-city.png" alt="city-icon" />
            <span>{city.cityState}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HotelCity;
