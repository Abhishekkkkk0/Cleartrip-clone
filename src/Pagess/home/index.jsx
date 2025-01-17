import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "./home.css";
import Navbar from "../../components/navbar";
import Body from "../../components/Search/index";
import OfferSection from "../../components/Offers";
import ModalManager from "../../components/singnup-signin/modal";
import MainNavbar from "../../components/main-navbar";
import Footer from "../../components/Footer/footer";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    } else {
      setShowLoginModal(true);
    }
  }, []);

  const handleLoginSuccess = (name) => {
    setIsLoggedIn(true);
    setUsername(name);
    setShowLoginModal(false);
  };

 

  return (
    <div className="home-container">
      <MainNavbar />
      <div className="body">
        <div className="nav-left">
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
          <Body />
        </div>
        <div className="offers">
          <OfferSection />
        </div>
      </div>

      <ModalManager
        isModalVisible={showLoginModal}
        closeModal={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <Footer />
    </div>
  );
}

export default Home;
