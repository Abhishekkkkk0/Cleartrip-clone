import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../Pagess/home";
import HotelResults from "../Pagess/HotelResults";
import Body from "./Search";
import HotelCardResults from "./HotelCardResult";
import FlightResults from "../Pagess/FlightResult";
import FlighBookingResults from "../Pagess/flightBooking";
import HotelBooking from "../Pagess/hotelBooking";
import Trips from "../Pagess/trips";
import HotelBookingConfirmPage from "../Pagess/hotelBookingFinal";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Body />} />
          <Route path="/flights" element={<FlightResults />} />
          <Route path="/hotels" element={<HotelResults />} />
          <Route path="/hotelsCard" element={<HotelCardResults />} />
          <Route path="/Flight-booking" element={<FlighBookingResults />} />
          <Route path="/hotel-booking" element={<HotelBooking />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/hotelBookingConfirm" element={<HotelBookingConfirmPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
