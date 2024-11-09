// src/pages/AnalyticsPage.js
import React from "react";
import DisasterAnalytics from "./DisasterAnalytics";
import { Link } from "react-router-dom";
const AnalyticsPage = () => {
  return (
    <div>
      <header class="navba">
        <div class="logo">DisasterHelp</div>
        <nav>
          <ul className="nav-link">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="main-map-container">
        <ul className="main-map-list">
          <li className="main-map-item">
            <DisasterAnalytics />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AnalyticsPage;
