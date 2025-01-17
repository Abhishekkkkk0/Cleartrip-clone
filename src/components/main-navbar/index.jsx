import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import Logo from "../logo/logo";
import "./index.css";
import ModalManager from "../singnup-signin/modal";

function MainNavbar() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown menu
  const navigate = useNavigate(); // Initialize navigate function

  // Check if the user is logged in
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setUsername("");
    setDropdownOpen(false); // Close dropdown on logout
  };

  const handleLoginSuccess = (name) => {
    setUsername(name);
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="main-navbar">
      <div className="logo-container">
        {/* Use Link component to navigate to home page */}
        <Link to="/" className="logo-link">
          <Logo />
        </Link>
      </div>
      <div className="auth-section">
        {username ? (
          <div className="dropdown" ref={dropdownRef}>
            <div onClick={toggleDropdown} className="dropdown-trigger">
              <img
                src="../../assets/images/user.png"
                alt="User"
                className="user-icon"
              />
              <button className="auth-welcome-btn">Hi, {username}</button>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/trips"); // Redirect to /trips page
                  }}
                  className="dropdown-item"
                >
                  My Trips
                </button>
                <button onClick={handleLogout} className="dropdown-item">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="auth-btn" onClick={toggleModal}>
            Sign Up / Sign In
          </button>
        )}
      </div>
      <ModalManager
        isModalVisible={isModalVisible}
        closeModal={() => setModalVisible(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default MainNavbar;
