
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import React, { useState, useRef, useEffect } from "react"; 

import "./index.css";

const airportData = [
  { code: "HYD", name: "Hyderabad", country: "IN" },
  { code: "AMD", name: "Ahmedabad", country: "IN" },
  { code: "GOI", name: "Goa", country: "IN" },
  { code: "PNQ", name: "Pune", country: "IN" },
  { code: "GAU", name: "Guwahati", country: "IN" },
  { code: "JAI", name: "Jaipur", country: "IN" },
  { code: "NAG", name: "Nagpur", country: "IN" },
  { code: "DEL", name: "Delhi", country: "IN" },
  { code: "BOM", name: "Mumbai", country: "IN" },
  { code: "BLR", name: "Bengaluru", country: "IN" },
  { code: "CCU", name: "Kolkata", country: "IN" },
  { code: "MAA", name: "Chennai", country: "IN" },
  { code: "COK", name: "Kochi", country: "IN" },
  { code: "IXC", name: "Chandigarh", country: "IN" },
  { code: "BBI", name: "Bhubaneswar", country: "IN" },
  { code: "CJB", name: "Coimbatore", country: "IN" },
  { code: "LKO", name: "Lucknow", country: "IN" },
  { code: "TRV", name: "Thiruvananthapuram", country: "IN" },
  { code: "IXE", name: "Mangalore", country: "IN" },
  { code: "ATQ", name: "Amritsar", country: "IN" },
  { code: "DED", name: "Dehradun", country: "IN" },
  { code: "BDQ", name: "Vadodara", country: "IN" },
  { code: "IXM", name: "Madurai", country: "IN" },
  { code: "PAT", name: "Patna", country: "IN" },
  { code: "IXL", name: "Leh", country: "IN" },
  { code: "IXA", name: "Agartala", country: "IN" },
  { code: "GAY", name: "Gaya", country: "IN" },
  { code: "STV", name: "Surat", country: "IN" },
  { code: "RPR", name: "Raipur", country: "IN" },
  { code: "IXJ", name: "Jammu", country: "IN" },
];

const CustomFlightInput = ({ placeholder, onAirportSelect, type, adornmentSvg }) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null); // Reference to the input field
  const suggestionsRef = useRef(null); // Reference to the suggestions container

  const filteredSuggestions = airportData.filter(
    (airport) =>
      airport.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      airport.code.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Handle clicking outside of the input or suggestions to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current && !inputRef.current.contains(event.target) &&
        suggestionsRef.current && !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false); // Close suggestions if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestionSelect = (airport) => {
    const formattedValue = `${airport.name} (${airport.code})`;
    setInputValue(formattedValue);
    setShowSuggestions(false);
    onAirportSelect(formattedValue, type);
  };

  return (
    <div className="custom-flight-input" style={{ position: "relative", marginBottom: "20px" }} ref={inputRef}>
      <TextField
  variant="outlined"
  label={placeholder}
  value={inputValue}
  onChange={(e) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  }}
  onFocus={() => setShowSuggestions(true)}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <IconButton edge="start">{adornmentSvg}</IconButton>
      </InputAdornment>
    ),
  }}
  fullWidth
  sx={{ fontWeight: 'bold' }} // Use sx prop to apply the bold style
/>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="suggestions-dropdown" ref={suggestionsRef}>
          {filteredSuggestions.map((airport) => (
            <div
              key={airport.code}
              className="suggestion-item"
              onClick={() => handleSuggestionSelect(airport)}
            >
              <strong>{airport.name}</strong>, {airport.country} <br />
              <small>IATA: {airport.code}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomFlightInput;