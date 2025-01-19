import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./index.css";
import FlightComponent from "../../components/flightComp/flights";
import StaticHeader from "../../components/flightHeader";
import { airlineImages } from "../../components/helper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Skeleton from "@mui/material/Skeleton";
import MainNavbar from "../../components/main-navbar";

const airlineIdToCodeMap = {
  "65144a1b664a43628887c460": "UK", // Vistara
  "65144a1b664a43628887c45e": "6E", // IndiGo
  "65144a1b664a43628887c45d": "AI", // AirIndia
  "65144a1b664a43628887c45f": "SG", // SpiceJet
  "65144a1b664a43628887c461": "G8", // GoFirst
};

const airlineFullNames = {
  AI: "Air India",
  "6E": "IndiGo",
  SG: "SpiceJet",
  UK: "Vistara",
  G8: "GoFirst",
};

const getAirlineDetails = (airlineId) => {
  const airlineCode = airlineIdToCodeMap[airlineId];
  if (airlineCode && airlineImages[airlineCode]) {
    const [image, name] = airlineImages[airlineCode];
    return { image, name };
  }
  return { image: null, name: airlineId };
};

function FlightResults() {
  const location = useLocation();
  const { flightResults = {}, searchDetails } = location.state || {};
  const flights = flightResults.data?.flights || [];
  const [loading, setLoading] = useState(true); // Loading state

  // Simulate a loading delay for demonstration
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  const [selectedSorting, setSelectedSorting] = useState({
    priceLowToHigh: false,
    priceHighToLow: false,
    stops: false,
    departureTime: false,
    airlineSort: false, // New sorting for airlines
  });

  const [selectedAirlines, setSelectedAirlines] = useState({
    "Air India": false,
    "IndiGo": false,
    "SpiceJet": false,
    "Vistara": false,
    "GoFirst": false,
  });

  if (!searchDetails) {
    return <p>No flight data available. Please search again.</p>;
  }

  const {
    passengerCount,
    sourceCity,
    destinationCity,
    departureDate,
    sourceAirport,
    destinationAirport,
  } = searchDetails;

  // const formattedDate = new Date(departureDate).toLocaleDateString("en-US", {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });

  // Filtering logic for airlines
  const filterFlightsByAirlines = (flights) => {
    const selectedAirlineNames = Object.keys(selectedAirlines).filter(
      (key) => selectedAirlines[key]
    );

    if (selectedAirlineNames.length === 0) {
      return flights;
    }

    return flights.filter((flight) =>
      selectedAirlineNames.includes(
        airlineFullNames[airlineIdToCodeMap[flight.airline]] || flight.airline
      )
    );
  };

  // Sorting logic
  const sortFlights = (flights) => {
    let sortedFlights = [...flights];

    if (selectedSorting.priceLowToHigh) {
      sortedFlights = sortedFlights.sort((a, b) => a.ticketPrice - b.ticketPrice);
    } else if (selectedSorting.priceHighToLow) {
      sortedFlights = sortedFlights.sort((a, b) => b.ticketPrice - a.ticketPrice);
    } else if (selectedSorting.stops) {
      sortedFlights = sortedFlights.sort((a, b) => a.stops - b.stops);
    } else if (selectedSorting.departureTime) {
      sortedFlights = sortedFlights.sort(
        (a, b) => new Date(a.departureTime) - new Date(b.departureTime)
      );
    }

    if (selectedSorting.airlineSort) {
      sortedFlights = sortedFlights.sort((a, b) => {
        const airlineA = getAirlineDetails(a.airline).name;
        const airlineB = getAirlineDetails(b.airline).name;
        return airlineA.localeCompare(airlineB);
      });
    }

    return sortedFlights;
  };

  const filteredAndSortedFlights = sortFlights(
    filterFlightsByAirlines(flights)
  );

  const handleSortingCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setSelectedSorting({
      priceLowToHigh: false,
      priceHighToLow: false,
      stops: false,
      departureTime: false,
      airlineSort: false,
      [name]: checked,
    });
  };

  const handleAirlineCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setSelectedAirlines((prevSelectedAirlines) => ({
      ...prevSelectedAirlines,
      [name]: checked,
    }));
  };

  return (
    <div className="flight-results">
      
        <MainNavbar />

      <div className="main-layout">
        <div className="left-section">
          <h3>Sort & Filter</h3>
          {loading ? (
            <Skeleton animation="wave" height={150} />
          ) : (
            <div className="filter-item">
              <h4>Sort By:</h4>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedSorting.priceLowToHigh}
                      onChange={handleSortingCheckboxChange}
                      name="priceLowToHigh"
                    />
                  }
                  label="Price: Low to High"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedSorting.priceHighToLow}
                      onChange={handleSortingCheckboxChange}
                      name="priceHighToLow"
                    />
                  }
                  label="Price: High to Low"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedSorting.stops}
                      onChange={handleSortingCheckboxChange}
                      name="stops"
                    />
                  }
                  label="Stops: 0 → 1 → 2"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedSorting.departureTime}
                      onChange={handleSortingCheckboxChange}
                      name="departureTime"
                    />
                  }
                  label="Departure Time"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedSorting.airlineSort}
                      onChange={handleSortingCheckboxChange}
                      name="airlineSort"
                    />
                  }
                  label="Sort by Airline"
                />
              </FormGroup>
            </div>
          )}
        </div>

        <div className="right-section">
          <div className="search-details">
            <div className="detail-box">
              <span className="detail">One Way</span>
            </div>
            <div className="detail-box">
              <span className="detail">
                {sourceCity} ↔ {destinationCity}
              </span>
            </div>
            <div className="detail-box">
              <span className="detail">{departureDate}</span>
            </div>
            <div className="detail-box">
              <span className="detail">{passengerCount} Traveller(s)</span>
            </div>
          </div>

          <div className="parent-container">
  <div className="static-header">
    <StaticHeader />
  </div>
  {loading
    ? Array(5)
        .fill()
        .map((_, index) => (
          <Skeleton
            key={index}
            animation="wave"
            height={150}
            variant="rectangular"
            style={{ margin: "10px 0" }}
          />
        ))
    : filteredAndSortedFlights.map((flight) => {
        const { image, name } = getAirlineDetails(flight.airline);
        return (
          <FlightComponent
            key={flight.id}
            image={image}
            name={name}
            sourceAirport={sourceAirport}
            destinationAirport={destinationAirport}
            departureTime={flight.departureTime}
            duration={flight.duration}
            seats={flight.availableSeats}
            arrivalTime={flight.arrivalTime}
            source={flight.source}
            destination={flight.destination}
            stops={flight.stops}
            amenities={flight.amenities}
            price={flight.ticketPrice}
          />
        );
      })}
</div>
        </div>
      </div>
    </div>
  );
}

export default FlightResults;





// date