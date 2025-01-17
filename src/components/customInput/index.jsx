import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";

function ComboBox({ selectedCity, setSelectedCity }) {
  const [cityData, setCityData] = useState([]); // State to store city data
  const [adornmentImage, setAdornmentImage] = useState("../assets/images/location.png"); // Default adornment image
  const [placeholderText, setPlaceholderText] = useState("Enter City"); // Default placeholder
  const [inputValue, setInputValue] = useState(""); // Tracks input value for display

  // Fetch city data from API
  async function fetchCity() {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/city`,
        {
          method: "GET",
          headers: {
            projectID: "afznkxyf8vti",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cities. Please try again.");
      }

      const data = await response.json();
      setCityData(data.data.cities.map((city) => city.cityState)); // Assuming 'cityState' is correct
    } catch (err) {
      console.error("Error fetching city data:", err);
    }
  }

  // Fetch city data when the component mounts
  useEffect(() => {
    fetchCity();
  }, []);

  // Handle focus to change the adornment image and placeholder
  const handleFocus = () => {
    setAdornmentImage("../assets/images/location-color.png"); // Focus state image
    setPlaceholderText(""); // Remove placeholder on focus
  };

  // Handle blur to reset the adornment image and placeholder
  const handleBlur = () => {
    setAdornmentImage("../assets/images/location.png"); // Default image
    setPlaceholderText("Enter City"); // Reset placeholder
  };

  // Handle change when a city is selected
  const handleCitySelect = (event, newValue) => {
    if (newValue) {
      setInputValue(newValue); // Update input value to display full name
      const firstWord = newValue.split(",")[0].trim(); // Extract the first word before a comma
      setSelectedCity(firstWord); // Pass first word to the parent state
    } else {
      setInputValue(""); // Clear input value
      setSelectedCity(""); // Clear selected city in parent state
    }
  };

  // Handle input changes (e.g., manual typing)
  const handleInputChange = (event, newValue) => {
    setInputValue(newValue); // Update the input field with the typed value
  };

  return (
    <Autocomplete
      disablePortal
      options={cityData} // Use fetched city data as options
      sx={{ width: "100%" }}
      popupIcon={null} // Removes the dropdown arrow
      value={inputValue} // Show the full name in the input field
      onInputChange={handleInputChange} // Track manual input
      onChange={handleCitySelect} // Handle city selection
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholderText} // Dynamic placeholder
          onFocus={handleFocus} // Focus event
          onBlur={handleBlur} // Blur event
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <img
                  src={adornmentImage} // Dynamic image based on focus state
                  alt="custom-icon"
                  style={{ width: 24, height: 24 }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}

export default ComboBox;
