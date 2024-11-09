import React, { useState } from "react";
import { Link } from "react-router-dom";
import MapPage from "./MapPage";
import AnalyticsPage from "./AnalyticsPage";
import { useAuth } from "./AuthContext";
import "./MainMap.css";
const MainMap = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Correctly define isMenuOpen
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Correctly define toggleMenu
  };
  return (
    <div>
      <header class="navba">
        <div class="logo">DisasterHelp</div>
        <nav>
          <ul className="nav-link">
            <button className="cta-butto">
              <Link to="./analytics">Analytics</Link>
            </button>
            <li>
              <a href="./">Home</a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="main-map-container">
        <ul className="main-map-list">
          <li className="main-map-item">
            <MapPage />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainMap;
