import React, { useState } from "react";
import "./JoinUs.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const JoinUs = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Backend API for volunteer registration
    const apiUrl = "http://localhost:5000/registerAsVolunteer";
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
        alert("Registration successful!");
        localStorage.setItem("volunteer", JSON.stringify(data.volunteer));
        setFormData({ name: "", email: "", phone: "", skills: "" });
        navigate("/");
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="join-us-container">
      <h2>Join Us as a Volunteer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
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
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="skills">Skills:</label>
          <textarea
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
        <div>
            <p>Already registered : </p>
            <Link to="/loginVol"><button type="submit">Login</button></Link>
        </div>
      </form>
    </div>
  );
};

export default JoinUs;
