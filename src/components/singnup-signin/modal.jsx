import React, { useState, useEffect } from "react";
import Login from "./signin";
import SignUp from "./signup";
import "./modal.css"; // Your modal styling

function ModalManager({ isModalVisible, closeModal, onLoginSuccess }) {
  const [isLoginOpen, setIsLoginOpen] = useState(true);

  // Reset the modal state
  const resetModalState = () => {
    setIsLoginOpen(true);
  };

  // Handle modal close with reset
  const closeWithReset = () => {
    resetModalState();
    closeModal();
  };

  // Effect to handle overflow and escape key behavior
  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeWithReset();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalVisible]);

  return (
    <>
      {isModalVisible && (
        <div className={`new-modal-overlay ${isModalVisible ? "visible" : ""}`}>
          <div className="new-modal-content">
            <button className="new-close-button" onClick={closeWithReset} title="Close Modal">
              &times;
            </button>
            {isLoginOpen ? (
              <Login
                key="login-form"
                onSignUpClick={() => setIsLoginOpen(false)}
                onLoginSuccess={onLoginSuccess}
              />
            ) : (
              <SignUp
                key="signup-form"
                onLoginClick={() => setIsLoginOpen(true)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ModalManager;
