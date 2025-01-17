import React, { useState, useEffect, useRef } from "react";
import "./modal.css";

function SignUp({ onLoginClick }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailInputRef = useRef(null);

  const projectID = "afznkxyf8vti"; // Replace with your actual projectID

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus(); // Focus on the email input field when the modal is open
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/bookingportals/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: projectID,
          },
          body: JSON.stringify({
            name: formData.username,
            email: formData.email,
            password: formData.password,
            appType: "bookingportals",
          }),
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Sign-up failed!");
      }

      const result = await response.json();
      setSuccess("Sign-up successful! Please log in.");
      setFormData({ username: "", email: "", password: "" });
      // Redirect to the Login modal
      setTimeout(() => {
        onLoginClick();
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="new-auth-container">
      <h2>Sign Up</h2>
      <form className="new-auth-form" onSubmit={handleSignUp}>
        <div className="new-form-group">
          <label htmlFor="username" className="new-label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="new-input"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="new-form-group">
          <label htmlFor="email" className="new-label">Email:</label>
          <input
            ref={emailInputRef}
            type="email"
            id="email"
            name="email"
            className="new-input"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="new-form-group">
          <label htmlFor="password" className="new-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="new-input"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p className="new-error-text">{error}</p>}
        {success && <p className="new-success-text">{success}</p>}
        <button type="submit" className="new-primary-btn">Sign Up</button>
      </form>
      <p className="new-toggle-text">
        Already have an account?{" "}
        <span onClick={onLoginClick} className="new-toggle-link">Log In</span>
      </p>
    </div>
  );
}

export default SignUp;
