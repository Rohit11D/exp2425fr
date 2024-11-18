import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useAuth } from "./AuthContext";

const Home = () => {
  const { isAuthenticated, logout } = useAuth();
  // Define state and toggle function
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Correctly define isMenuOpen
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Correctly define toggleMenu
  };
  const [isVolunteer, setIsVolunteer] = useState(false);

  useEffect(() => {
    // Check if volunteer data exists in local storage
    const volunteer = localStorage.getItem("volunteer");
    if (volunteer) {
      setIsVolunteer(true);
    }
  }, []);


  return (
    <div>
      <header class="navbar">
        <div class="logo">DisasterHelp</div>
        <nav>
          <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <button className="cta-button">
              <Link to="/mainMap">Events</Link>
            </button>
            <button className="cta-button">
              <Link to="/resMap">Resources</Link>
            </button>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            {!isAuthenticated && (
              <Link to="/login" className="navLink">
                Login
              </Link>
            )}
            {!isAuthenticated && (
              <Link to="/register" className="navLink">
                Sign Up
              </Link>
            )}
            {isAuthenticated && (
              <a href="#" onClick={logout} className="navLink">
                Logout
              </a>
            )}
                  <Link to="/join-us">
                  <button className="cta-button">Join Us</button>
      </Link> 
          </ul>
          <div className="hamburger" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </nav>
      </header>

      <section class="hero">
        <div class="hero-content">
          <h1>Disaster Management & Relief</h1>
          <p>Preparedness, response, and recovery for a safer world.</p>
          <button class="cta-button">Learn More</button>
          
        </div>
      </section>

      <section class="services">
        <div className="vol-dash">
      {isVolunteer && (
        <Link to="/volunteerDashboard" className="cta-button">
          Volunteer Dashboard
        </Link>
      )}
      </div>
        <h2>Our Services</h2>
        <div class="service-cards">
          <div class="card">
            <h3>Emergency Response</h3>
            <p>
              Immediate assistance in times of crisis to save lives and mitigate
              disaster impacts.
            </p>
          </div>
          <div class="card">
            <h3>Community Preparedness</h3>
            <p>
              Training and resources for communities to prepare for disasters.
            </p>
          </div>
          <div class="card">
            <h3>Recovery & Rehabilitation</h3>
            <p>
              Supporting communities in rebuilding after a disaster with
              sustainable solutions.
            </p>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="footer-content">
          <p>&copy; 2024 DisasterHelp | All Rights Reserved</p>
          <p>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
