import React, { useState, useEffect, useRef } from "react";
import "./modal.css";

function Login({ onSignUpClick, onLoginSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/bookingportals/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: "afznkxyf8vti",
          },
          body: JSON.stringify({ ...formData, appType: "bookingportals" }),
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Invalid credentials!");
      }

      const result = await response.json();
      localStorage.setItem("authToken", result.token);
      localStorage.setItem("username", result.data.user.name);
      onLoginSuccess(result.data.user.name);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="new-auth-container">
      <h2>Log In</h2>
      <form className="new-auth-form" onSubmit={handleLogin}>
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
        {error && <p className="new-error-text">Please type correct credentials</p>}
        <button type="submit" className="new-primary-btn" disabled={isLoading}>
          {isLoading ? "Logging In..." : "Log In"}
        </button>
      </form>
      <p className="new-toggle-text">
        Don’t have an account?{" "}
        <span onClick={onSignUpClick} className="new-toggle-link">Sign Up</span>
      </p>
    </div>
  );
}

export default Login;
