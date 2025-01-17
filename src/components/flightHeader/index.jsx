import React from "react";
import "./staticHeader.css";

function StaticHeader() {
  return (
    <div className="static-header">
      <div className="header-item">Airlines</div>
      <div className="header-item">Departure</div>
      <div className="header-item">Duration</div>
      <div className="header-item">Arrival</div>
      <div className="header-item">Price</div>
      <div className="header-item">Booking</div>
    </div>
  );
}

export default StaticHeader;
