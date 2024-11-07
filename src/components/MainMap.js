import React from "react";
import { Link } from "react-router-dom";
import MapPage from "./MapPage";
import AnalyticsPage from "./AnalyticsPage";

const MainMap = () => {
  return (
    <div>
      <ul>
        <li>
          <MapPage />
        </li>
        <li>
          <AnalyticsPage />
        </li>
      </ul>
    </div>
  );
};

export default MainMap;
