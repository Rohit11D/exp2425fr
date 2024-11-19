import React, { useState } from "react";
import "./JoinUs.css";
import { useNavigate } from "react-router-dom";
const LoginVol = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Backend API for volunteer registration
    const apiUrl = "https://zqrxpn-5000.csb.app/loginAsVolunteer";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("login successful!");
        setFormData({email: "" });
        localStorage.setItem("volunteer", JSON.stringify(data.volunteer));
        navigate("/");
      } else {
        alert("Failed to login. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting :", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="join-us-container">
      <h2>Join Us as a Volunteer</h2>
      <form onSubmit={handleSubmit}>
      
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
       
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginVol;
