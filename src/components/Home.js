import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useAuth } from "./AuthContext";
import { fetchIndianDisasters,DisasterList} from "./fetchIndianDisaster";
const Home = () => {
  const { isAuthenticated, logout } = useAuth();
  // Define state and toggle function
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Correctly define isMenuOpen
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Correctly define toggleMenu
  };
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [news, setDisasternews] = useState([]);

  useEffect(() => {
    
    
    async function fetchIndianDisasters() {
      try {
          const response = await fetch(
              'https://api.reliefweb.int/v1/disasters',
              {
                  method: 'POST', // Use POST for structured query
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      appname: 'vocabulary',
                      preset: 'external',
                      limit: 5, // Number of results to fetch
                      query: {
                          value: 'India', // Correct query format
                      },
                  }),
              }
          );
  
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const ndata = await response.json();
          const disasters = await ndata.data; // Extract relevant disaster data
          console.log(disasters);
          if (Array.isArray(disasters)) {
            setDisasternews(disasters);
            console.log("Data set successfully");
          } else {
            console.error("Expected an array but got:", disasters);
          }
         
          console.log("seted");
      } catch (error) {
          console.error('Error fetching Indian disaster news:', error);
      }
  }
   fetchIndianDisasters();   
    
  }, []);

  const disasterList = [];
for (let i = 0; i < news.length; i++) {
  const disaster = news[i];
  disasterList.push(
    <div key={disaster.id} className="disaster-card">
      <h3>{disaster.fields?.name || "Unknown Disaster"}</h3>
      <div className="disaster-info">
        {/* <p><span>GLIDE Number: </span>{disaster.fields?.glide || "N/A"}</p> */}
        <p><span>Status: </span><span className="disaster-status">{disaster.fields?.status || "N/A"}</span></p>
        {/* <p>
          Link:{" "}
          <a href={disaster.href} target="_blank" rel="noopener noreferrer">
            {disaster.href}
          </a>
        </p> */}
      </div>
    </div>
  );
}


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
            {/* <button className="cta-button">
              <Link to="/mainMap">Events</Link>
            </button>
            <button className="cta-button">
              <Link to="/resMap">Resources</Link>
            </button> */}
            <li><Link to="/mainMap">Events</Link></li>
            <li><Link to="/resMap">Resources</Link></li>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
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
             <button className="cta-button">
              <Link to="/join-us">Join Us</Link>
            </button>
 
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
        <section  class="news">
          <h1 className="news-head">Past And Active Events: </h1>
        <div className="news-container">
            {news.length > 0 ? (
                disasterList
            ) : (
                <p>Loading disaster updates...</p>
            )}
        </div>
        </section>
      <section id="services" class="services">
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
      <section id="about" className="about">
        <h2>About Us</h2>
        <p>
          DisasterHelp is committed to providing comprehensive disaster
          management solutions. Our mission is to ensure preparedness,
          effective response, and sustainable recovery for communities affected
          by disasters. We work with local and international partners to build
          resilience and save lives.
        </p>
      </section>
      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>
          Have questions or want to get involved? Reach out to us at{" "}
          <a href="mailto:contact@disasterhelp.org">contact@disasterhelp.org</a>{" "}
          or call us at <a href="tel:+1234567890">+1 234-567-890</a>.
        </p>
        <p>
          Follow us on social media:
          <a href="#">Facebook</a>, <a href="#">Twitter</a>, and{" "}
          <a href="#">LinkedIn</a>.
        </p>
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
