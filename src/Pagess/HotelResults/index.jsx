
import HotelBody from "../../components/hotelBody";

import MainNavbar from "../../components/main-navbar";
import Navbar from "../../components/navbar";
import OfferSection from "../../components/Offers";
import "./index.css";

function HotelResults() {
  return (
    <div className="hotel-home">
      <div>
        <MainNavbar />
        </div>
        <div className='body'>
          <div className='nav-left'>
          <Navbar
            ImageSrc="/assets/images/plane.png"
            AltText="Flights"
            text="Flights"
            navigateTo="/" // Navigates to the home route
          />
          <Navbar
            ImageSrc="/assets/images/hotels.png"
            AltText="Hotel"
            text="Hotel"
            navigateTo="/hotels" // Navigates to the hotels route
          />
          <Navbar
            ImageSrc="/assets/images/luggage.png"
            AltText="Trips"
            text="My Trips"
            navigateTo="/trips" // Navigates to the trips route
          />
          </div>
          <div className="search-box">
              <HotelBody />
          </div>
          <div className='offers'>
            <OfferSection />
          </div>
          
        </div> 
    </div>
  );
}
export default HotelResults;
