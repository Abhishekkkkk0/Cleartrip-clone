import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import "./navbar.css";

function Navbar(props) {
  const { ImageSrc, AltText, text, navigateTo } = props;
  const navigate = useNavigate(); // Use useNavigate hook to handle navigation

  const handleNavigation = () => {
    navigate(navigateTo); // Navigate to the provided path when clicked
  };

  return (
    <div className='navbar' onClick={handleNavigation}> {/* Add onClick to handle the click */}
      <img src={ImageSrc} alt={AltText} />
      <p className='para'>{text}</p>
    </div>
  );
}

export default Navbar;
