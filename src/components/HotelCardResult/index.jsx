import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../logo/logo";
import Button from "../button/button";
import dayjs from "dayjs";
import "./index.css";
import {
  Popover,
  Button as MUIButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Skeleton,
  Box,
} from "@mui/material";
import HotelCards from "../hotelCard/hotelCard";
import RegistrationButton from "../userRegistrationButton";
import MainNavbar from "../main-navbar";
// import HotelCards from "../hotelCard";

function HotelCardResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { hotels = [], userInput } = location.state || {};

  const [anchorEl, setAnchorEl] = useState(null);
  const [sortOption, setSortOption] = useState("recommended");
  const [tempSortOption, setTempSortOption] = useState("recommended");
  const [filters, setFilters] = useState({
    starRating: 0,
    priceRange: [0, 10000],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSortClick = (event) => setAnchorEl(event.currentTarget);
  const handleSortClose = () => setAnchorEl(null);

  const getOrdinal = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not specified";
    const parsedDate = dayjs(date);
    const day = parsedDate.date();
    const month = parsedDate.format("MMM");
    const year = parsedDate.format("YYYY");
    return `${day}${getOrdinal(day)} ${month} ${year}`;
  };

  const filteredAndSortedHotels = useMemo(() => {
    if (!hotels || isLoading) return [];

    let filteredHotels = hotels.filter((hotel) => {
      const matchesStarRating =
        filters.starRating === 0 || hotel.rating >= filters.starRating;
      const matchesPrice =
        hotel.rooms &&
        hotel.rooms[0]?.costPerNight >= filters.priceRange[0] &&
        hotel.rooms[0]?.costPerNight <= filters.priceRange[1];
      return matchesStarRating && matchesPrice;
    });

    return filteredHotels.sort((a, b) => {
      switch (sortOption) {
        case "topRated":
          return b.rating - a.rating;
        case "priceLowToHigh":
          return (
            (a.rooms?.[0]?.costPerNight || 0) -
            (b.rooms?.[0]?.costPerNight || 0)
          );
        case "priceHighToLow":
          return (
            (b.rooms?.[0]?.costPerNight || 0) -
            (a.rooms?.[0]?.costPerNight || 0)
          );
        default:
          return 0;
      }
    });
  }, [hotels, filters, sortOption, isLoading]);

  const handleSortApply = () => {
    setSortOption(tempSortOption);
    handleSortClose();
  };

  const handleSortCancel = () => {
    setTempSortOption(sortOption);
    handleSortClose();
  };

  const handleCardClick = (hotel) => {
    navigate("/hotel-booking", { state: { hotelId: hotel._id } });
  };

  return (
    <div className="hotel-results-container">
      {/* Navigation Section */}
      <div>
        <MainNavbar />
      </div>

      {/* Sort Options */}
      <div className="sort-nav">
        <div className="sort-a">
          <MUIButton onClick={handleSortClick}>
            Sort By:{" "}
            {sortOption === "recommended"
              ? "Recommended"
              : sortOption === "topRated"
              ? "Top-rated"
              : sortOption === "priceLowToHigh"
              ? "Price: Low to High"
              : "Price: High to Low"}
          </MUIButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleSortClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <div style={{ padding: "16px", width: "300px" }}>
              <Typography variant="h6">Sort hotels by</Typography>
              <RadioGroup
                value={tempSortOption}
                onChange={(event) => setTempSortOption(event.target.value)}
              >
                <FormControlLabel
                  value="topRated"
                  control={<Radio />}
                  label="Top-rated"
                />
                <FormControlLabel
                  value="priceLowToHigh"
                  control={<Radio />}
                  label="Price: Low to High"
                />
                <FormControlLabel
                  value="priceHighToLow"
                  control={<Radio />}
                  label="Price: High to Low"
                />
              </RadioGroup>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "16px",
                }}
              >
                <MUIButton
                  variant="contained"
                  color="primary"
                  onClick={handleSortApply}
                >
                  Apply
                </MUIButton>
                <MUIButton
                  variant="outlined"
                  color="secondary"
                  onClick={handleSortCancel}
                >
                  Cancel
                </MUIButton>
              </div>
            </div>
          </Popover>
        </div>
      </div>

      {/* Hotel Cards Section */}
      <div className="hotel-cards-container">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Box key={index} sx={{ padding: "16px", maxWidth: "300px" }}>
              <Skeleton
                variant="rectangular"
                width={300}
                height={180}
                animation="wave"
              />
              <Skeleton variant="text" sx={{ marginTop: 1 }} />
              <Skeleton variant="text" width="80%" />
            </Box>
          ))
        ) : filteredAndSortedHotels.length > 0 ? (
          filteredAndSortedHotels.map((hotel, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(hotel)}
              style={{ cursor: "pointer" }}
            >
              <HotelCards hotel={hotel} />
            </div>
          ))
        ) : (
          <Typography>No hotels match your criteria.</Typography>
        )}
      </div>
    </div>
  );
}

export default HotelCardResults;